<template>
  <div class="comment d-flex mt-3">
    <app-avatar :name="data.name" :avatar="data.avatar" class="comment--avatar" size="40px" />
    <div class="comment--body ml-2">
      <div class="d-flex comment--contents">
        <div class="comment--text">
          <h5 class="font-weight-bold text-body-2 text-truncate"> {{ data.name }} </h5>
          <div class="pt-1 black--text text-body-2">
            <div v-html="data.contents" />
            <vue-lightbox :items="[data.url]" v-if="!!data.url" width="150px" height="228.6588px" />
            <vue-preview-link :small="linker.small" :large="linker.large" :href="linker.href" :image="linker.image" :url-name="linker.urlName" :name="linker.name" v-else-if="linker" />
          </div>
        </div>
        <div class="likes" v-show="likes > 0">
          <v-icon size="1em" color="pink"> mdi-heart </v-icon>
          <span class="text-secondary"> {{ likes }} </span>
        </div>
      </div>
      <div class="text-caption text-secondary mt-1">
        <span class="mx-2"> {{ $timeagojs(data.lastModifier, $i18n.locale) }} </span>
        <span class="mx-2 font-weight-medium" :class="{ 'blue--text': data.liked }" @click="toggleLike"> Thích </span>
        <span class="mx-2 font-weight-medium" @click="stateOpenCommer = true"> Bình luận </span>
        <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
             <span class="mx-2 font-weight-medium" v-bind="attrs" v-on="on"> Xem thêm </span>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon> mdi-information-outline </v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  Báo cáo
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon> mdi-pen </v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  Chỉnh sửa
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon> mdi-delete </v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  Xóa
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      </div>
      <div class="mt-2" v-if="!isChildren">
        <div class="d-flex align-center text-body-2" @click="stateOpenCommer = true" v-if="!stateOpenCommer && data.answer">
          <app-avatar :name="data.answer.name" :avatar="data.answer.avatar" size="25px" class="mr-1" />
          <span class="font-weight-bold mr-1"> {{ data.answer.name }} </span>
          <span class="mr-1"> đã trả lời </span>
          •
          <span class="text--secondary ml-1"> {{ data.answer.count }} phản hồi </span>
        </div>
        <div v-if="stateOpenCommer">
          <template v-if="moreAnswers">
            <p class="mb-0 text-body-2 font-weight-bold" @click="fetchAnswers" v-show="!loadingAnswers"> Xem thêm các bình luận... </p>
            <div class="text-center" v-show="loadingAnswers">
              <v-progress-circular indeterminate color="blue" slot="spinner" />
            </div>
          </template>
          <transition-group name="comment">
            <app-comment is-children v-for="item in answers" :key="item.id" :data="item" @update="updateData(item, $event[0], $event[1])" />
            <div class="text-center" v-show="sendingComment" key="loading">
              <v-progress-circular indeterminate color="blue" slot="spinner" />
            </div>
            <app-comment-action :contents.sync="input.contents" :photos.sync="input.photos" small @click:submit="sendAnswerComment" v-if="firstLoaded" key="action" />
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AppAvatar from "@/components/AppAvatar"
  import AppCommentAction from "@/components/AppCommentAction"
  import { VueLightbox } from "vue-lightbox2"
  import { getLinkerInContents, updateData } from "@/helper"

  export default {
    name: "app-comment",
    components: {
      AppAvatar,
      AppCommentAction,
      VueLightbox
    },
    props: {
      data: Object,
      isChildren: Boolean
    },
    data: () => ({
      linker: null,
      stateOpenCommer: false,
      answers: [],

      sendingComment: false,
      loadingAnswers: false,
      moreAnswers: true,
      firstLoaded: false,

      input: {
        contents: "",
        photos: []
      }
    }),
    computed: {
      likes() {
        return this.data.likes + (this.data.liked ? 1 : 0)
      }
    },
    watch: {
      "data.contents": {
        async handler(newVal) {
          this.linker = await getLinkerInContents(newVal)
        },
        immediate: true
      },
      stateOpenCommer: {
        handler(newVal) {
          if (newVal) {
            this.fetchAnswers()
          }
        },
        immediate: true
      }
    },
    sockets: {
      "like-comment__DONE"({
        isError,
        value,
        id
      }) {
        if (isError && id == this.data.id) {
          this.$emit("update", ["liked", !value])
        }
      },
      "answer-comment__DONE"({
        isError,
        message,
        id
      }) {
        if (id == this.data.id) {
          this.sendingComment = false
          if (isError) {
            this.$store.commit("snackbar/setMessage", {
              color: "error",
              text: message
            })
          } else {
            this.resetBox()
          }
        }
      },
      "SERVER__newAnswer-comment"(answer) {
        if (this.answers.every(item => item.id != answer.id)) {
          // !Waring
          this.answers.push(answer)
        }
      }
    },
    methods: {
      updateData,
      resetBox() {
        this.input.contents = ""
        this.input.photos = []
      },
      toggleLike() {
        if (this.$auth.check()) {
          this.$socket.client.emit("like-comment", {
            id: this.data.id,
            value: !this.data.liked
          })
          this.$emit("update", ["liked", !this.data.liked])
        } else {
          this.$store.commit("snackbar/setMessage", {
            color: "error",
            text: this.$t("labels.REQUIRED_LOGIN")
          })
        }
      },
      sendAnswerComment($) {
        this.sendingComment = true
        this.$socket.client.emit("answer-comment", {
          ...$,
          uuidComment: this.data.id
        })
      },
      async fetchAnswers() {
        // not use page! get by last id answers
        /*
          select * from commentsInComment where id < ? order by lastModifier desc limit 20
        */

        this.loadingAnswers = true

        const {
          data: {
            answers,
            existsMore
          }
        } = await this.$http.get("/answers-comment/get", {
          params: {
            firstId: this.answers[0] && this.answers[0].id,
            idComment: this.data.id
          }
        })

        this.loadingAnswers = false
        this.firstLoaded = true
        this.moreAnswers = existsMore

        this.answers.unshift(...answers)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .comment {

    .comment--body {
      flex-basis: 0;
      flex-grow: 1;
      max-width: 100%;

      .comment--contents {
        width: 100%;

        .comment--text {
          background-color: #ecedf1;
          border-radius: 20px;
          -webkit-box-direction: normal;
          -webkit-box-flex: 1;
          -webkit-box-orient: vertical;
          color: rgba(0, 0, 0, 0.87);
          line-height: 1.25rem;
          font-size: 1rem;
          max-width: 100%;
          min-height: 32px;
          outline-style: none;
          padding: 12px 14px;
          margin-top: -1px;
          flex-basis: 0;
          flex-grow: 1;
          max-width: 100%;
        }

        .likes {
          margin-left: -9.5px;
          margin-bottom: .5em;
          margin-top: auto;
          font-size: 14px;

          span {
            font-size: 12px;
          }

          margin-top: 16px;
          border-radius: 10px;
          background-color: #fff;
          border: 1px solid rgb(0, 0, 0, .1);
          word-wrap: nowrap;
          height: auto;
          align-self: flex-end;
          padding: 2px 4px 2px 2px;
          line-height: 1;
        }
      }
    }
  }
</style>
<style lang="scss">
  @include animate-comment($name: "comment", $type: "slideRightFadeIn");
</style>