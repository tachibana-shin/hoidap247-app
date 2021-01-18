<template>
  <v-card flat color="F2" min-height="100%" class="poster">
    <v-app-bar fixed app color="white" flat dense>
      <v-btn icon @click="$router.back()">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title>
        Tạo bài viết
      </v-toolbar-title>
      <v-spacer />
      <v-btn text color="blue" class="text-uppercase"> Đăng </v-btn>
    </v-app-bar>
    <v-layout wrap column class="pa-3 pb-13 poster--input">
      <v-flex class="d-flex mb-4 header">
        <app-avatar size="45px" color="deep-purple accent-4" name="$auth.user().name" :avatar="$auth.user().avatar" />
        <div class="ml-3">
          <h4 class="font-weight-bold"> {{ $auth.user().name }} </h4>
          <small class="text--secondary text-truncate">
            {{ $auth.user().email }} </small>
        </div>
      </v-flex>
      <v-flex class="textarea--inner">
        <div class="textarea">
          <div class="content" contenteditable @input="handlerInput" v-html="content" />
          <div class="placeholder text--secondary"> Bạn đang nghĩ gì? </div>
        </div>
      </v-flex>
    </v-layout>
    <v-bottom-navigation fixed app class="justify-start" height="45">
      <v-btn icon>
        <v-icon> mdi-camera </v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-card>
</template>
<script>
  import AppAvatar from "@/components/AppAvatar"

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

  export default {
    components: {
      AppAvatar
    },
    data: () => ({
      content: "hello world"
    }),
    watch: {
      content(newVal) {
        console.log(newVal)
      }
    },
    methods: {
      handlerInput({ target }) {
        this.setLink(target)
        this.content = target.innerHTML 
        setCurrentCursorPosition(target, target.textContent.length - 1)
      },
      setLink(element) {
        
      }
    },
    mounted() {
        document.execCommand("defaultParagraphSeparator", false, "br")
      window.addEventListener("keyup", ({ target }) => {
        //document.execCommand("insertOrderedList", false)
        //document.execCommand('createLink', false, "#");
        //setCurrentCursorPosition(target, 5)

        //document.execCommand("bold", false, "su")
      }, {
        once: false
      })
    }
  }
</script>
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

        .textarea {
          position: absolute;
          font-size: 1.1rem;
          height: 100%;
          width: 100%;

          .content {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            outline: none;

            &:empty+.placeholder {
              display: block;
            }
          }

          .placeholder {
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none;
            display: none;
          }
        }
      }
    }
  }
</style>