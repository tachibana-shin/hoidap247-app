<template>
  <v-card flat color="F2" min-height="100%" class="poster" :loading="getting">
    <template slot="progress">
      <v-progress-linear color="blue" height="10" indeterminate />
    </template>
    <v-app-bar fixed app color="white" flat dense>
      <v-btn icon @click="$router.back()">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title>
        Tạo bài viết
      </v-toolbar-title>
      <v-spacer />
      <v-btn text color="blue" class="text-uppercase" :disabled="!ready" @click="submitPost"> Đăng </v-btn>
    </v-app-bar>
    <v-layout wrap column class="pa-3 pb-13 poster--input">
      <v-flex class="d-flex flex-wrap mb-4 header">
        <app-avatar size="45px" color="deep-purple accent-4" name="$auth.user().name" :avatar="$auth.user().avatar" />
        <div class="ml-3">
          <h4 class="font-weight-bold text-body-1"> {{ $auth.user().name }} </h4>
          <small class="text--secondary">
            {{ input.subject }} • {{ input.point }}đ • Lớp {{ input.class }}
          </small>
        </div>
      </v-flex>
      <v-flex class="textarea--inner" @click="$refs.textarea.focus()">
        <div class="textarea">
          <div class="content" contenteditable @input="handlerInput" ref="textarea" />
          <div class="placeholder text--secondary"> Bạn đang nghĩ gì? </div>
        </div>
        <div class="mt-3" @click.stop>
          <v-dialog v-model="dialogEditphotos" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on">
                <vue-lightbox :items="photosUrlBase64.map(item => item.url)" hide-popup />
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
                      <v-btn icon class="close" absolute style="top: 0; right: 0" @click="input.photos.splice(index, 1)">
                        <v-icon> mdi-close </v-icon>
                      </v-btn>
                    </div>
                  </v-col>
                </transition-group>
                <v-row>
                  <v-col cols="12">
                    <v-btn color="blue" outlined block tile @click="$refs.inputFile.click()" class="mt-5">
                      <v-icon> mdi-plus </v-icon> Thêm ảnh / video
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-dialog>
          <vue-preview-link :small="linker.small" :large="linker.large" :href="linker.href" :image="linker.image" :url-name="linker.urlName" :name="linker.name" v-if="linker && input.photos.length == 0" />
        </div>
      </v-flex>
    </v-layout>
    <v-bottom-navigation fixed app class="justify-start" height="45">
      <v-btn icon @click="$refs.inputFile.click()">
        <v-icon> mdi-camera </v-icon>
      </v-btn>
      <input type="file" multiple ref="inputFile" @change="input.photos.push(...$event.target.files)" accept="image/*" hidden />
      <v-dialog max-width="300px" v-model="stateDialogTune">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon> mdi-tune </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title> Điều chỉnh </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container fluid class="px-0">
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-select :items="classes" menu-props="auto" label="Lớp" outlined prepend-inner-icon="mdi-city" v-model="input.class" item-text="label" dense color="blue" hide-details />
                  <small> Chọn cấp độ lớp học </small>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select :items="points" menu-props="auto" label="Điểm" outlined prepend-inner-icon="mdi-shape-plus" dense color="blue" v-model="input.point" hide-details :disabled="editMode" />
                  <small> Số điểm bạn đề cử cho câu hỏi này </small>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select :items="subjects" menu-props="auto" label="Môn học" outlined prepend-inner-icon="mdi-school" dense color="blue" v-model="input.subject" item-text="label" hide-details />
                  <small> Thể loại của câu hỏi </small>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider />
          <v-card-actions class="justify-end">
            <v-btn color="blue darken-1" text @click="stateDialogTune = false">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-bottom-navigation>
    <v-dialog v-model="posting" hide-overlay persistent width="300">
      <v-card color="blue" dark>
        <v-card-text>
          {{ $t("labels.POSTING") }}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
  import AppAvatar from "@/components/AppAvatar"
  import { VuePreviewLink } from "vue-preview-link"
  import { VueLightbox } from "vue-lightbox2"

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
          range = createRange(node.childNodes[lp], offset, range)

          if (offset === 0) {
            break;
          }
        }
      }
    }

    return range;
  }

  function setCurrentCursorPosition(element, offset) {
    if (offset >= 0) {
      const selection = window.getSelection();

      const range = createRange(element, offset);

      if (range) {
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
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
    let caretPos = 0,
      sel, range;
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
      textNode = (matchedTextNode.length > matchLength) ?
        matchedTextNode.splitText(matchLength) : null;
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
      let node, foundStart = false,
        stop = false;

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
      AppAvatar,
      VuePreviewLink,
      VueLightbox
    },
    data: () => ({
      input: {
        class: 1,
        point: 10,
        subject: "LITERATURE",
        contents: "",
        photos: []
      },
      /* ^ data main */
      dialogEditphotos: false,
      photosUrlBase64: [],
      linker: null,

      dataChanged: false,
      configTuneChanged: false,
      posting: false,
      getting: false,
      stateDialogTune: false,
      /* ^ states */
      classes: [
        { label: "Lớp 1", value: 1 },
        { label: "Lớp 2", value: 2 },
        { label: "Lớp 3", value: 3 },
        { label: "Lớp 4", value: 4 },
        { label: "Lớp 5", value: 5 },
        { label: "Lớp 6", value: 6 },
        { label: "Lớp 7", value: 7 },
        { label: "Lớp 8", value: 8 },
        { label: "Lớp 9", value: 9 },
        { label: "Lớp 10", value: 10 },
        { label: "Lớp 11", value: 11 },
        { label: "Lớp 12", value: 12 }
      ],
      points: [
        10,
        20,
        30,
        40,
        50,
        60,
        70,
        80,
        90,
        100
      ],
      subjects: [
        { label: "Ngữ văn", value: "LITERATURE" },
        { label: "Tin học", value: "IT" },
        { label: "Toán học", value: "MATH" },
        { label: "Sinh học", value: "BIOLOGICAL" },
        { label: "Công nghệ", value: "TECHNOLOGY" },
        { label: "Vật lý", value: "PHYSICAL" },
        { label: "Lịch sử", value: "HISTORY" },
        { label: "Nhạc họa", value: "MUSIC_ART" },
        { label: "Hóa học", value: "CHEMISTRY" },
        { label: "Địa lý", value: "GEOGRAPHY" },
        { label: "Tiếng anh", value: "ENGLISH" },
        { label: "GDCD", value: "CIVIC_EDUCATION" },
        { label: "Khác", value: "OTHER" }
      ]
    }),
    watch: {
      async "input.photos"() {
        this.dataChanged = true
        const keyMax = Array.from(this.input.photos).reduce((keyMax, { key }) => keyMax > key ? keyMax : key, 0) || 0

        this.photosUrlBase64 = await Promise.all(Array.from(this.input.photos).map((item, key) => new Promise((resolve, reject) => {
          if (item instanceof File) {
            const reader = new FileReader

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
      async "input.contents"() {
        this.dataChanged = true
        const div = document.createElement("div")
        div.innerHTML = this.content

        const a = div.querySelector("a")
        if (a) {
          const url = a.getAttribute("href")
          try {
            const { data } = await this.$http.get("/utilities/og-meta", {
              params: {
                url
              }
            })
            this.linker = data
          } catch (e) {
            this.linker = null
          }
        } else {
          this.linker = null
        }
      },
      "input.class"() {
        this.configTuneChanged = true
      },
      "input.point"() {
        this.configTuneChanged = true
      },
      "input.subject"() {
        this.configTuneChanged = true
      },
      stateDialogTune(value) {
        if (value) {
          this.configTuneChanged = true
        }
      },
      dataChanged: {
        handler(newVal) {
          if (newVal) {
            window.addEventListener("beforeunload", this.confirmLeavePage)
            window.addEventListener("unload", this.confirmLeavePage)
          } else {
            window.removeEventListener("beforeunload", this.confirmLeavePage)
            window.removeEventListener("unload", this.confirmLeavePage)
          }
        },
        immediate: true
      },
      "$route": {
        async handler() {
          if (this.editMode) {
            this.getting = true
            try {
              const { data } = await this.$http.get(`/posts/post`, {
                params: {
                  id: this.$route.params.uid
                }
              });

              this.input = {
                class: data.class,
                subject: data.subject,
                point: data.point,
                contents: data.contents,
                photos: data.photos
              }
              this.dataChanged = false
            } catch (e) {
              this.$store.commit("snackbar/setMessage", {
                color: "error",
                text: this.$t("labels.ERRORED")
              })
              this.$router.push("/")
            }
            this.getting = false
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
        const urlRegex = /https?:\/\/(?:[\w\d-\.]+)?[\w\d-\\.]+\.{1}[\w]{1,4}(?:\/{1})?(?:[a-zA-Z0-9&-@_\+.*&#8203;~#?\/=]*)?/gi


        if (keyTimer) {
          window.clearTimeout(keyTimer)
        }
        keyTimer = window.setTimeout(() => {
          const savedSelection = saveSelection(element)
          surroundInElement(element, urlRegex, createLink, shouldLinkifyContents)
          restoreSelection(element, savedSelection)
          keyTimer = null
          this.input.contents = element.innerHTML
        }, 500)
      },
      confirmLeavePage(e) {
        window.removeEventListener("beforeunload", this.confirmLeavePage)
        window.removeEventListener("unload", this.confirmLeavePage)
        if (this.dataChanged) {
          e.preventDefault()
          return e.returnValue = this.$t("confirms.LEAVE_PAGE_NOT_SAVE_DATA")
        }
      },
      async submitPost() {
        if (this.configTuneChanged) {
          this.posting = true
          try {
            const form = new FormData
            form.append("contents", this.input.contents)
            form.append("class", this.input.class)
            form.append("point", this.input.point)
            form.append("subject", this.input.subject)
            if (this.editMode) {
              form.append("uid", this.$route.params.uid)
            }
            this.input.photos.forEach(item => {
              if (item instanceof File) {
                form.append("photos[]", item)
              } else {
                form.append("photos_not_remove[]", item.key)
              }
            })
            const { message } = (await this.$http.post("/posts/post", form)).data
            this.$store.commit("snackbar/setMessage", {
              color: "success",
              text: message
            })
            this.dataChanged = false
            this.$router.push("/")
          } catch ({ data: { message } }) {
            this.$store.commit("snackbar/setMessage", {
              color: "error",
              text: message
            })
          }
          this.posting = false
        } else {
          this.stateDialogTune = true
        }
      }
    },
    computed: {
      ready() {
        return !!this.input.contents || this.input.photos.length > 0
      },
      editMode() {
        return "uid" in this.$route.params
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.dataChanged) {
        const answer = window.confirm(this.$t("confirms.LEAVE_PAGE_NOT_SAVE_DATA"))
        if (answer) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    },
    beforeDestroy() {
      this.dataChanged = false
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
  .poster {
    display: flex;
    flex-direction: column;
    position: relative;

    .poster--input {
      position: relative;
      width: 100%;
      height: 100%;

      .header {
        flex: 0 0 0;
      }

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
    }
  }
</style>