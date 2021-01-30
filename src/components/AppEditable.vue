<template>
  <div class="textarea--inner" @click="$refs.textarea.focus()">
    <div class="textarea" :class="{ 'textarea--small': small }">
      <div class="content" contenteditable @input="handlerInput" ref="textarea" />
      <div class="placeholder text--secondary"> {{ placeholder }} </div>
    </div>
    <div class="mt-3" @click.stop v-if="photosUrlBase64.length || linker">
      <v-dialog v-model="dialogEditphotos" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on">
            <vue-lightbox :items="photosUrlBase64.map(item => item.url)" hide-popup :width="widthLightbox" :height="heightLightbox" />
          </div>
        </template>
        <v-card color="F2">
          <v-app-bar app fixed color="white">
            <v-btn icon @click="dialogEditphotos = false">
              <v-icon>mdi-close</v-icon>
              <div></div>
            </v-btn>
            <v-toolbar-title> Chỉnh sửa </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn color="blue" text @click="dialogEditphotos = false">
                Xong
              </v-btn>
            </v-toolbar-items>
          </v-app-bar>
          <v-container fluid class="pt-16">
            <transition-group name="photos-edit" tag="v-row">
              <v-col cols="12" sm="6" md="4" lg="3" v-for="(item, index) in photosUrlBase64" :key="item.key">
                <div class="white" style="position: relative">
                  <v-img :src="item.url" />
                  <v-btn icon class="close" absolute style="top: 0; right: 0" @click="$emit('click:remove-photos', index)">
                    <v-icon> mdi-close </v-icon>
                  </v-btn>
                </div>
              </v-col>
            </transition-group>
            <v-row>
              <v-col cols="12">
                <v-btn color="blue" outlined block tile @click="$emit('click:add-photos')" class="mt-5">
                  <v-icon> mdi-plus </v-icon> Thêm ảnh / video
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
      <vue-preview-link :small="linker.small" :large="linker.large" :href="linker.href" :image="linker.image" :url-name="linker.urlName" :name="linker.name" v-if="linker && photos.length == 0" />
    </div>
  </div>
</template>
<script>
  import { VuePreviewLink } from "vue-preview-link"
  import { VueLightbox } from "vue-lightbox2"
  import { getLinkerInContents } from "@/helper"

  function createRange(node, offset, range) {
    if (!range) {
      range = document.createRange()
      range.selectNode(node);
      range.setStart(node, 0);
    }
    if (offset === 0) {
      range.setEnd(node, offset);
    } else if (node && offset > 0) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.length < offset) {
          offset -= node.textContent.length;
        } else {
          range.setEnd(node, offset);
          offset = 0;
        }
      } else {
        for (let lp = 0; lp < node.childNodes.length; lp++) {
          /* eslint no-unused-vars: "off" */
          range = createRange(node.childNodes[lp], offset, range)

          if (offset === 0) {
            break;
          }
        }
      }
    }

    return range;
  }

  function selectCurrentPosition(target, from, to) {
    const range = document.createRange()
    const sel = window.getSelection()
    range.selectNode(target)
    range.setStart(target, from)
    range.setEnd(target, to)
    range.selectNodeContents(target)

    sel.removeAllRanges()
    sel.addRange(range)
  }

  function getCaretPosition(editableDiv) {
    let caretPos = 0;
    let sel;
    let range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode == editableDiv) {
          caretPos = range.endOffset
        }
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      if (range.parentElement() == editableDiv) {
        const tempEl = document.createElement("span")
        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        const tempRange = range.duplicate();
        tempRange.moveToElementText(tempEl);
        tempRange.setEndPoint("EndToEnd", range);
        caretPos = tempRange.text.length;
      }
    }
    return caretPos
  }

  function createLink(matchedTextNode) {
    var el = document.createElement("a");
    el.href = matchedTextNode.data;
    el.target = "_blank";
    el.appendChild(matchedTextNode);
    return el;
  }

  function shouldLinkifyContents(el) {
    return el.tagName != "A";
  }

  function surroundInElement(el, regex, surrounderCreateFunc, shouldSurroundFunc) {
    var child = el.lastChild;
    while (child) {
      if (child.nodeType == 1 && shouldSurroundFunc(el)) {
        surroundInElement(child, regex, createLink, shouldSurroundFunc);
      } else if (child.nodeType == 3) {
        surroundMatchingText(child, regex, surrounderCreateFunc);
      }
      child = child.previousSibling;
    }
  }

  function surroundMatchingText(textNode, regex, surrounderCreateFunc) {
    var parent = textNode.parentNode;
    var result, surroundingNode, matchedTextNode, matchLength, matchedText;
    while (textNode && (result = regex.exec(textNode.data))) {
      matchedTextNode = textNode.splitText(result.index);
      matchedText = result[0];
      matchLength = matchedText.length;
      textNode = (matchedTextNode.length > matchLength) ? matchedTextNode.splitText(matchLength) : null;
      surroundingNode = surrounderCreateFunc(matchedTextNode.cloneNode(true));
      parent.insertBefore(surroundingNode, matchedTextNode);
      parent.removeChild(matchedTextNode);
    }
  }

  let saveSelection, restoreSelection
  if (window.getSelection && document.createRange) {
    saveSelection = function(containerEl) {
      const range = window.getSelection().getRangeAt(0);
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(containerEl);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      const start = preSelectionRange.toString().length;

      return {
        start: start,
        end: start + range.toString().length
      }
    };

    restoreSelection = function(containerEl, savedSel) {
      let charIndex = 0
      const range = document.createRange();
      range.setStart(containerEl, 0);
      range.collapse(true);
      const nodeStack = [containerEl]
      let node;
      let foundStart = false;
      let stop = false;

      while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType == 3) {
          const nextCharIndex = charIndex + node.length;
          if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
            range.setStart(node, savedSel.start - charIndex);
            foundStart = true;
          }
          if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
            range.setEnd(node, savedSel.end - charIndex);
            stop = true;
          }
          charIndex = nextCharIndex;
        } else {
          let i = node.childNodes.length;
          while (i--) {
            nodeStack.push(node.childNodes[i]);
          }
        }
      }

      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  } else if (document.selection) {
    saveSelection = function(containerEl) {
      const selectedTextRange = document.selection.createRange();
      const preSelectionTextRange = document.body.createTextRange();
      preSelectionTextRange.moveToElementText(containerEl);
      preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
      const start = preSelectionTextRange.text.length;

      return {
        start: start,
        end: start + selectedTextRange.text.length
      }
    };

    restoreSelection = function(containerEl, savedSel) {
      const textRange = document.body.createTextRange();
      textRange.moveToElementText(containerEl);
      textRange.collapse(true);
      textRange.moveEnd("character", savedSel.end);
      textRange.moveStart("character", savedSel.start);
      textRange.select();
    };
  }

  document.execCommand("defaultParagraphSeparator", false, "br")
  let keyTimer = null

  export default {
    components: {
      VueLightbox,
      VuePreviewLink
    },
    model: {
      prop: "contents"
    },
    props: {
      contents: String,
      photos: Array,
      placeholder: String,
      widthLightbox: String,
      heightLightbox: String,
      small: Boolean
    },
    data: () => ({
      dialogEditphotos: false,
      photosUrlBase64: [],
      linker: null
    }),
    watch: {
      "photos": {
        async handler() {
          const keyMax = Array.from(this.photos).reduce((keyMax, { key }) => keyMax > key ? keyMax : key, 0) || 0

          this.photosUrlBase64 = await Promise.all(Array.from(this.photos).map((item, key) => new Promise((resolve, reject) => {
            if (item instanceof File) {
              const reader = new FileReader()

              reader.addEventListener("load", ({ target }) => {
                resolve({
                  key: key + keyMax,
                  url: target.result
                })
              }, {
                once: true
              })
              reader.addEventListener("error", reject)

              reader.readAsDataURL(item)
            } else {
              resolve(item)
            }
          })))
        },
        immediate: true
      },
      "contents": {
        async handler(newVal = "") {
          this.linker = await getLinkerInContents(newVal)
          if (this.$refs.textarea) {
            if (newVal != this.$refs.textarea.innerHTML) {
              this.$refs.textarea.innerHTML = newVal
            }
          }
        },
        immediate: true
      }
    },
    methods: {
      handlerInput({ target }) {
        this.setLink(target)
      },
      setLink(element) {
        const urlRegex = /https?:\/\/(?:[\w\d-.]+)?[\w\d-\\.]+\.{1}[\w]{1,4}(?:\/{1})?(?:[a-zA-Z0-9&-@_+.*&#8203;~#?/=]*)?/gi

        if (keyTimer) {
          window.clearTimeout(keyTimer)
        }
        keyTimer = window.setTimeout(() => {
          const savedSelection = saveSelection(element)
          surroundInElement(element, urlRegex, createLink, shouldLinkifyContents)
          restoreSelection(element, savedSelection)
          keyTimer = null
          this.$emit("input", element.innerHTML)
        }, 500)
      }
    }
  }
</script>
<style lang="scss">
  .photos-edit {

    &-enter-active,
    &-leave-active {
      transition: transform .3s ease;
    }

    &-leave-active {
      position: absolute;
    }

    &-move {
      transition: transform .3s ease;
    }

    &-enter,
    &-leave-to {
      transform: scale(0);
    }
  }
</style>
<style lang="scss" scoped>
  .textarea--inner {
    display: flex;
    position: relative;
    flex-direction: column;

    .textarea {
      font-size: 1.1rem;
      height: 100%;
      width: 100%;
      min-height: 1.5em;
      position: relative;

      &.textarea--small {
        font-size: (14rem / 16);
        min-height: (14rem / 16 + 14 / 16 / 5 * 2);
      }

      .content {
        width: 100%;
        min-height: 1.5em;
        top: 0;
        left: 0;
        outline: none;

        &>>>a {

          &,
          &:active,
          &:hover {
            color: rgb(33, 150, 243);
          }
        }

        &:empty+.placeholder {
          display: block;
        }
      }

      .placeholder {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        user-select: none;
        display: none;
      }

      &>>>img {
        max-width: 100%;
      }
    }
  }
</style>