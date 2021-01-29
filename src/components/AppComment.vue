<template>
  <div class="comment d-flex mt-3">
    <app-avatar :name="data.name" :avatar="data.avatar" class="comment--avatar" size="40px" />
    <div class="comment--body ml-2">
      <div class="d-flex comment--contents">
        <div class="comment--text">
          <h5 class="font-weight-bold text-body-2 text-truncate"> {{ data.name }} </h5>
          <div class="pt-1 black--text text-body-2">
            <div v-html="data.contents" />
            <vue-lightbox :items="[data.url]" v-if="!!data.url" />
            <vue-preview-link :small="linker.small" :large="linker.large" :href="linker.href" :image="linker.image" :url-name="linker.urlName" :name="linker.name" v-else-if="linker" />
          </div>
        </div>
        <div class="likes" v-show="data.liked || data.likes">
          <v-icon size="1em" color="pink"> mdi-heart </v-icon>
          <span class="text-secondary"> {{ data.likes }} </span>
        </div>
      </div>
      <div class="text-caption text-secondary mt-1">
        <span class="mx-2"> {{ $timeagojs(data.lastModifier, $i18n.locale) }} </span>
        <span class="mx-2 font-weight-medium" :class="{ 'blue--text': data.likes }" @click="setLike(!data.liked)"> Thích </span>
        <span class="mx-2 font-weight-medium" @click="stateOpenCommer = true"> Bình luận </span>
        <span class="mx-2 font-weight-medium"> Xem thêm </span>
      </div>
      <div class="comment--report mt-2" v-if="!isChildren">
        <div class="comment--report__demo d-flex align-center text-body-2" @click="stateOpenCommer = true" v-if="!stateOpenCommer && data.answer">
          <app-avatar :name="data.answer.name" :avatar="data.answer.avatar" size="25px" class="mr-1" />
          <span class="font-weight-bold mr-1"> {{ data.answer.name }} </span>
          <span class="mr-1"> đã trả lời </span>
          •
          <span class="text--secondary ml-1"> {{ data.answer.count }} phản hồi </span>
        </div>
        <div v-if="stateOpenCommer">
          <app-comment is-children v-for="(item, index) in answers" :key="index" :data="item" />
          <app-comment-action :contents.sync="input.contents" :photos.sync="input.photos" small @click:submit="sendComment" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AppAvatar from "@/components/AppAvatar"
  import AppCommentAction from "@/components/AppCommentAction"
  import { getLinkerInContents } from "@/helper"

  export default {
    name: "app-comment",
    components: {
      AppAvatar,
      AppCommentAction
    },
    props: {
      data: Object,
      isChildren: Boolean
    },
    data: () => ({
      linker: null,
      stateOpenCommer: false,
      answers: null,

      input: {
        contents: "",
        photos: []
      }
    }),
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
            // ajax called get comments
            this.answers = [
              this.data,
              this.data
            ]
          }
        },
        immediate: true
      }
    },
    sockets: {
      "setLikeComment"({ id, value }) {
        if (this.data.id == id) {
          this.$emit("update", [
            "liked",
            value
          ])
        }
      },
      "updateLikes"({ id, value }) {
        if (this.data.id == id) {
          this.$emit("update", [
            "likes",
            value
          ])
        }
      },
      "addComment"({ forCommentId, value }) {

      }
    },
    methods: {
      sendComment() {

      },
      setLike(value) {
        if (this.$auth.check()) {
          this.$socket.client.emit("setLikeComment", {
            id: this.data.id,
            value
          })
        } else {
          this.$store.commit("snackbar/setMessage", {
            color: "error",
            text: this.$t("labels.REQUIRED_LOGIN")
          })
        }
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