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
        <app-comment v-for="(item, index) in comments" :key="index" :data="item" @update="updateData(item, $event[0], $event[1])" />
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

      pageComments: 1,
      comments: [],
      comment: {
        photos: [],
        name: "Nguyễn Thành",
        contents: "Xin chào thế giới!",
        answer: {
          name: "Nguyễn Thành",
          count: 5
        },
        lastModifier: new Date("01/01/2021"),
        likes: 100,
        liked: true
      }
    }),
    computed: {
      labelLikes() {
        if (this.data.liked) {
          if (this.data.likes - 1 > 0) {
            return this.$tc("injects.LIKES", 2, { likes: this.data.likes - 1 })
          } else {
            return this.$tc("injects.LIKES", 0)
          }
        } else {
          return this.$tc("injects.LIKES", 1, { likes: this.data.likes })
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
      sendCommentDone({ id, message, isError }) {
        if (isError) {
          this.$store.commit("snackbar/setMessage", {
            color: "danger",
            text: message
          })
        } else {
          this.$store.commit("snackbar/setMessage", {
            color: "success",
            text: message
          })
          this.input.contents = ""
          this.input.photos = []
        }
      }
    },
    methods: {
      updateData,
      async sendComment() {
        this.$socket.client.emit("sendComment", {
          ...this.input,
          uuidPoster: this.data.id
        })
      },
      async fetchComment({ loaded, complete }) {
        const { data } = await this.$http("/api/comments/get", {
          params: {
            id: this.data.id,
            page: this.pageComments
          }
        })
        this.pageComments++
        this.comments.push(...data)
        if (data.length < 20) {
          complete()
        } else {
          loaded()
        }
      }
    }
  }
</script>