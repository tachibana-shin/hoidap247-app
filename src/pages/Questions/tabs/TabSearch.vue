<template>
  <v-card flat min-height="100%" class="wrap">
    <div class="extension white">
      <v-card-title>
        <v-text-field dense clearable placeholder="Câu hỏi của bạn là gì?" background-color="F2" color="blue" outlined prepend-inner-icon="mdi-magnify" class="font-weight-regular" v-model.trim="search" hide-details :loading="loading" />
      </v-card-title>
    </div>
    <v-container fluid v-if="searching" class="contents">
      <v-row>
        <v-col cols="12" v-for="(item, index) in posts" :key="index">
          <!-- <v-card>
            <v-card-text class="text-body-1">
              1<b>h</b> 48phút = ....<b>b</b>
              <br>
              1<b>h</b> 48phút = ....<b>b</b>
              <br>
              1<b>h</b> 48phút = ....<b>b</b>
              <br>
              1<b>h</b> 48phút = ....<b>b</b>
              <br>
              1<b>h</b> 48phút = ....<b>b</b>
              <br>
            </v-card-text>
          </v-card> -->
          <app-card-post :data="item" />
        </v-col>
        <v-col cols="12">
          <infinite-loading ref="infinite" @infinite="fetchPosts" />
        </v-col>
      </v-row>
    </v-container>
    <v-card-text>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-fab-transition>
            <v-btn color="blue" fixed absolute fab dark bottom right id="fab" v-on="on" v-bind="attrs" to="/post">
              <v-icon> mdi-plus </v-icon>
            </v-btn>
          </v-fab-transition>
        </template>
        <p class="ma-0"> Không tìm thấy? </p>
        <p class="ma-0 font-weight-bold"> Đặt câu hỏi ngay </p>
      </v-tooltip>
    </v-card-text>
  </v-card>
</template>
<script>
  import AppCardPost from "@/components/AppCardPost"
  import InfiniteLoading from "vue-infinite-loading"
  let timeoutSearch
  export default {
    components: {
      AppCardPost,
      InfiniteLoading
    },
    data: () => ({
      posts: [],
      pagePost: 1,
      search: "",
      lazySearch: "",
      searching: false,
      loading: false
    }),
    watch: {
      search(newVal) {
        clearTimeout(timeoutSearch)
        timeoutSearch = setTimeout(() => {
          this.lazySearch = newVal
        }, 500)
        this.loading = !!newVal
      },
      lazySearch(newVal) {
        this.posts = []
        this.pagePost = 1
        this.$refs.infinite && this.$refs.infinite.stateChanger.reset()
        if (!newVal) {
          this.searching = false
        } else {
          this.searching = true
        }
      }
    },
    methods: {
      async fetchPosts({ loaded, complete }) {
        const response = await this.$http("/posts", {
          params: {
            page: this.pagePost,
            question: this.lazySearch
          }
        })
        this.pagePost++

        this.posts.push(...response.data.posts)
        if (response.data.posts.length < 20) {
          complete()
        } else {
          loaded()
        }
        this.loading = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  #fab {
    transform: translateY(-100%);
    bottom: 16px;
  }

  .extension {
    position: fixed;
    left: 0;
    width: 100%;
    top: 48px;
    z-index: 10;
  }

  .wrap {
    padding-top: 74px;
  }
</style>