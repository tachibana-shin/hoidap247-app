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
        <!-- 
          <div class="px-6px">
            <v-btn color="app-green" rounded small dark>
              +1 câu hỏi mới nhất
            </v-btn>
          </div> -->
      </template>
    </v-app-bar>
    <v-container>
      <v-row dense>
        <v-col cols="12" v-for="(item, index) in posts" :key="index">
          <app-card-post :data="item" />
        </v-col>
        <v-col cols="12">
          <infinite-loading @infinite="fetchPosts" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
  import AppCardPost from "@/components/AppCardPost"
  import InfiniteLoading from "vue-infinite-loading"
  export default {
    components: {
      AppCardPost,
      InfiniteLoading
    },
    data: () => ({
      posts: [],
      newPost: 0,
      pagePost: 1
    }),
    sockets: {
      notifyNewPost() {
        this.newPost++
      },
      updatePost(newPost) {
        const { id } = newPost
        let postNowIndex = -1
        this.posts.forEach((item, index) => {
          if (item.id == id) {
            postNowIndex = index
          }
        })
        this.$set(this.posts, postNowIndex, newPost)
      }
    },
    methods: {
      async fetchPosts({ loaded, complete }) {
        const response = await this.$http("/posts", {
          params: {
            page: this.pagePost,
            firstPostId: this.posts[0] && this.posts[0].id
          }
        })
        this.pagePost++

        this.posts.push(...response.data.posts)
        if (response.data.posts.length < 20) {
          complete()
        } else {
          loaded()
        }
      }
    }
  }
</script>