<template>
  <v-card flat color="F2" class="wrapper fill-height">
    <v-app-bar fixed app color="white" dense flat tile>
      <v-img :max-width="`${160 / 360 * 100}%`" class="logo" :src="require('@/assets/logo.png')" />
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-row justify="space-between" class="flex-nowrap">
          <v-col class="pl-6px">
            <div class="text-left">
              <v-btn text small class="text-inherit px-0">
                <v-icon size="1.3em" class="pr-5px"> mdi-filter-variant </v-icon>
                {{ $t("labels.FILTER_QUESTIONS") }}
              </v-btn>
            </div>
          </v-col>
          <v-col class="pr-6px">
            <div class="text-right">
              <v-btn text small class="text-inherit px-0">
                {{ $t("labels.MEMBER_ETHUSIASTIC") }}
                <v-icon size="1.3em" class="pl-5px"> mdi-trophy </v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <div class="px-6px newPost app-green white--text" v-if="newPost > 0 && pageYOffset > 35" v-ripple @click="loadNewPost">
          <p class="mb-0" v-if="!loadingNewPost">
            {{ $t("labels.NEW_POSTER", { count: newPost }) }}
          </p>
          <p class="mb-0 d-flex align-center justify-center" v-else>
            <v-progress-circular indeterminate color="white" size="20" width="3" />
            <span class="ml-2"> {{ $t("labels.LOADING_NEW_POSTER") }} </span>
          </p>
        </div>
      </template>
    </v-app-bar>
    <v-container>
      <v-row dense>
        <v-col cols="12" v-for="(item, index) in posts" :key="index">
          <app-card-post :data="item" @update="updateData(item, $event[0], $event[1])" />
        </v-col>
        <v-col cols="12">
          <infinite-loading @infinite="fetchPosts">
            <v-progress-circular indeterminate color="blue" slot="spinner" />
          </infinite-loading>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  import AppCardPost from "@/components/AppCardPost"
  import InfiniteLoading from "vue-infinite-loading"
  import { updateData } from "@/helper"
  let onScroll
  export default {
    components: {
      AppCardPost,
      InfiniteLoading
    },
    data: () => ({
      posts: [],
      newPost: 0,
      loadingNewPost: false,
      pagePost: 1,

      pageYOffset
    }),
    sockets: {
      newPost() {
        this.newPost++
      }
    },
    methods: {
      async fetchPosts({ loaded, complete }) {
        const response = await this.$http.get("/posts/get", {
          params: {
            page: this.pagePost,
            firstPostId: this.posts[0] && this.posts[0].id
          }
        })
        this.pagePost++

        this.posts.push(...response.data)
        if (response.data.length < 20) {
          complete()
        } else {
          loaded()
        }
      },
      updateData,
      async loadNewPost() {
        this.loadingNewPost = true
        const { data = [] } = await this.$http.get("/posts/get", {
          params: {
            from: -1,
            to: this.posts[0].id
          }
        })

        this.posts.unshift(...data)
        this.newPost = 0
        this.loadingNewPost = false
        this.$vuetify.goTo(0)
      }
    },
    created() {
      window.addEventListener("scroll", onScroll = () => {
        this.pageYOffset = pageYOffset
      })
    },
    beforeDestroy() {
      window.removeEventListener("scroll", onScroll)
    }
  }
</script>
<style lang="scss" scoped>
  .newPost {
    position: absolute;
    width: 100%;
    left: 0;
    top: 100%;
    text-align: center;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>