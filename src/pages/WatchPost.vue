<template>
  <v-card flat min-height="100%" color="white">
    <template v-if="!loading">
      <v-app-bar fixed app color="white">
        <v-btn icon @click="$router.back()">
          <v-icon> mdi-arrow-left </v-icon>
        </v-btn>
        <v-toolbar-title>
          {{ data.name }} - {{ data.contents }}
        </v-toolbar-title>
      </v-app-bar>
      <app-card-post :data="data" @update="updateData(data, $event[0], $event[1])" hide-status-bar flat no-router-in-comment @click:comment="$refs.textareaComment.focus()" />
      <v-divider />
      <v-layout class="body-2 text-caption text--secondary py-2 px-3">
        <v-flex>
          <v-icon size="1.2em" color="pink"> mdi-heart </v-icon>
          {{ labelLikes }}
        </v-flex>
        <v-flex class="text-right">
          {{ $t("injects.COMMENTS", { count: data.comments }) }}
        </v-flex>
      </v-layout>
      <v-divider />
      <!-- /comment actions -->
      <app-comment-action :contents.sync="input.contents" :photos.sync="input.photos" @click:submit="sendComment" />
      <!-- //comment actions -->
      <v-divider />
      <div class="pa-3">
        <!-- /comment -->
        <div class="text-center" v-show="sendingComment">
          <v-progress-circular indeterminate color="blue" slot="spinner" />
        </div>
        <transition-group name="comment-showing" tag="div">
          <app-comment v-for="item in comments" :key="item.id" :data="item" @update="updateData(item, $event[0], $event[1])" />
        </transition-group>
        <infinite-loading @infinite="fetchComment">
          <v-progress-circular indeterminate color="blue" slot="spinner" />
        </infinite-loading>
        <!-- //comment -->
      </div>
    </template>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="32" color="blue" />
    </v-overlay>
  </v-card>
</template>
<script>
  import AppCardPost from "@/components/AppCardPost"
  import AppComment from "@/components/AppComment"
  import AppCommentAction from "@/components/AppCommentAction"
  import InfiniteLoading from "vue-infinite-loading"
  import { updateData } from "@/helper"

  export default {
    components: {
      AppCardPost,
      AppComment,
      AppCommentAction,
      InfiniteLoading
    },
    data: () => ({
      data: null,
      loading: false,

      input: {
        contents: "",
        photos: []
      },

      comments: [],
      sendingComment: false
    }),
    computed: {
      likes() {
        return this.data.likes + (this.data.liked ? 1 : 0)
      },
      labelLikes() {
        if (this.data.liked) {
          if (this.likes - 1 > 0) {
            return this.$tc("injects.LIKES", 2, { likes: this.likes - 1 })
          } else {
            return this.$tc("injects.LIKES", 0)
          }
        } else {
          return this.$tc("injects.LIKES", 1, { likes: this.likes })
        }
      }
    },
    watch: {
      "$route": {
        async handler($route) {
          this.loading = true
          try {
            const { data } = await this.$http.get("/posts/get", {
              params: {
                id: $route.params.id || -1
              }
            })
            this.data = data
          } catch ({ data: { message } }) {
            this.$store.commit("snackbar/setMessage", {
              color: "error",
              text: message
            })
            this.$router.push("/")
          }
          this.loading = false
        },
        immediate: true
      }
    },
    sockets: {
      SERVER__newComment(comment) {
        if (!this.comments.find(item => item.id == comment.id)) {
          this.comments.unshift(comment)
        }
        this.sendingComment = false
      },
      comment__DONE({ id, message, isError }) {
        if (isError) {
          this.$store.commit("snackbar/setMessage", {
            color: "error",
            text: message
          })
        } else {
          this.$store.commit("snackbar/setMessage", {
            color: "success",
            text: message
          })
          this.resetCommentBox()
        }
      }
    },
    methods: {
      updateData,
      fileToBuffer(file) {
        return {
          originalname: file.name,
          buffer: file
        }
      },
      async sendComment() {
        this.sendingComment = true
        this.$socket.client.emit("comment", {
          contents: this.input.contents,
          photo: this.input.photos[0] && this.fileToBuffer(this.input.photos[0]),
          uuidPoster: this.data.id
        })
      },
      async fetchComment({ loaded, complete }) {
        const lastCommentId = this.comments[this.comments.length - 1]
        const { data } = await this.$http("/comments/get", {
          params: {
            id: this.data.id,
            lastCommentId: lastCommentId && lastCommentId.id
          }
        })
        this.comments.push(...data)
        if (data.length < 20) {
          complete()
        } else {
          loaded()
        }
      },
      resetCommentBox() {
        this.input.contents = ""
        this.input.photos = []
      }
    }
  }
</script>
<style lang="scss">
  .comment-showing {
    &-move {
      transition: transform .3s ease;
    }

    &-enter-active {
      animation: slideYFadeIn .3s ease;
    }

    &-leave-active {
      animation: slideYFadeIn .3s ease reverse;
      position: absolute;
    }

    @keyframes slideYFadeIn {
      from {
        transform: translateY(-30px);
        opacity: 0;
      }

      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
</style>