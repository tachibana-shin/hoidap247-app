<template>
  <v-card color="white" v-if="data" :flat="flat">
    <v-card-title class="body-2">
      <v-layout>
        <v-flex>
          <v-layout wrap>
            <v-flex class="d-flex mb-4">
              <app-avatar size="40px" color="deep-purple accent-4" name="data.name" :avatar="data.avatar" />
              <div class="ml-3">
                <h4 class="font-weight-bold"> {{ data.name }} </h4>
                <small class="text--secondary">
                  {{ $timeagojs(data.lastModifier, $i18n.locale) }} </small>
              </div>
            </v-flex>
            <v-flex>
              <div class="text-right">
                <v-bottom-sheet inset v-model="bottomSheetMenuState">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon> mdi-dots-horizontal </v-icon>
                    </v-btn>
                  </template>
                  <v-sheet height="300px" class="overflow-y-auto">
                    <v-list>
                      <v-list-item v-for="(item, index) in menuItems" @click="item.handler(item); bottomSheetMenuState = false" :key="index" v-if="!item.rules || item.rules(item)">
                        <v-list-item-avatar class="mr-1">
                          <v-icon size="25px"> {{ item.icon }} </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title> {{ item.title }} </v-list-item-title>
                          <v-list-item-subtitle> {{ item.subtitle }} </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-sheet>
                </v-bottom-sheet>
              </div>
            </v-flex>
          </v-layout>
          <v-layout align-center justify-space-between wrap grow>
            <v-flex>
              <span class="text-subtitle-2">
                {{ data.subject }} • {{ $t("injects.CLASSES", { classes: data.class }) }} • {{ $t("injects.POINTS", { points: data.point }) }}
              </span>
            </v-flex>
            <v-flex class="text-right">
              <v-chip color="deep-purple accent-4" outlined x-small v-if="data.firstPost"> {{ $t("labels.FIRST_QUESTION") }} </v-chip>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-subtitle class="pt-2 contents black--text text-body-2" v-html="data.contents" />
    <v-card-text>
      <vue-lightbox :items="data.photos.map(item => item.url)" v-if="data.photos && data.photos.length" />
      <vue-preview-link :small="linker.small" :large="linker.large" :href="linker.href" :image="linker.image" :url-name="linker.urlName" :name="linker.name" v-else-if="linker" />
    </v-card-text>
    <v-card-actions>
      <v-layout column>
        <v-flex v-if="!hideStatusBar">
          <v-layout class="body-2 text-caption text--secondary px-2 pb-2">
            <v-flex>
              <v-icon size="1.2em" color="pink"> mdi-heart </v-icon>
              {{ labelLikes }}
            </v-flex>
            <v-flex class="text-right">
              {{ $t("injects.COMMENTS", { count: data.comments }) }}
            </v-flex>
          </v-layout>
          <div class="pb-2">
            <v-divider />
          </div>
        </v-flex>
        <v-flex v-else>
          <div class="pb-2 mx-2">
            <v-divider />
          </div>
        </v-flex>
        <v-flex>
          <v-layout align="center" class="text-center">
            <v-flex>
              <v-btn icon :ripple="false" :color="data.liked ? 'pink' : undefined" @click="toggleLike">
                <v-icon size="1.3rem"> {{ data.liked ? "mdi-heart" : "mdi-heart-outline" }} </v-icon>
                <span class="text-normal"> {{ $t(data.liked ? "labels.LIKED" : "labels.LIKE") }} </span>
              </v-btn>
            </v-flex>
            <v-flex>
              <v-btn icon :ripple="false" :to="noRouterInComment ? undefined : `/watch-post/${data.id}`" @click="$emit('click:comment')">
                <v-icon size="1.3rem"> mdi-comment-outline </v-icon>
                <span class="text-normal"> {{ $t("labels.COMMENT") }} </span>
              </v-btn>
            </v-flex>
            <v-flex>
              <v-bottom-sheet v-model="bottomSheetShareState">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon :ripple="false" v-on="on" v-bind="attrs">
                    <v-icon size="1.3rem"> mdi-share-outline </v-icon>
                    <span class="text-normal"> {{ $t("labels.SHARE") }} </span>
                  </v-btn>
                </template>
                <v-sheet height="300px" class="overflow-y-auto">
                  <v-list>
                    <v-subheader> {{ $t("labels.OPEN_IN") }} </v-subheader>
                    <v-list-item v-for="tile in sharedItems" :key="tile.title" @click="bottomSheetShareState = false">
                      <v-list-item-avatar>
                        <v-avatar size="32px" tile>
                          <img :src="`https://cdn.vuetifyjs.com/photos/bottom-sheets/${tile.img}`" :alt="tile.title">
                        </v-avatar>
                      </v-list-item-avatar>
                      <v-list-item-title>{{ tile.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-sheet>
              </v-bottom-sheet>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>
<script>
  import { VueLightbox } from "vue-lightbox2"
  import { VuePreviewLink } from "vue-preview-link"
  import AppAvatar from "@/components/AppAvatar"
  import { getLinkerInContents } from "@/helper"

  export default {
    components: {
      VueLightbox,
      VuePreviewLink,
      AppAvatar
    },
    props: {
      data: {
        type: Object,
        required: true
      },
      hideStatusBar: Boolean,
      flat: Boolean,
      noRouterInComment: Boolean
    },
    data: () => ({
      bottomSheetMenuState: false,
      bottomSheetShareState: false,
      sharedItems: [
        { img: "keep.png", title: "Keep" },
        { img: "inbox.png", title: "Inbox" },
        { img: "hangouts.png", title: "Hangouts" },
        { img: "messenger.png", title: "Messenger" },
        { img: "google.png", title: "Google+" }
      ],
      linker: null
    }),
    watch: {
      "data.contents": {
        async handler(value) {
          this.linker = await getLinkerInContents(value)
        },
        immediate: true
      }
    },
    computed: {
      menuItems() {
        return [
          {
            icon: "mdi-bookmark-outline",
            title: this.$t("menuPoster.SAVE_POST.title"),
            subtitle: this.$t("menuPoster.SAVE_POST.des"),
            handler(item) {

            }
        },
          {
            icon: "mdi-star-outline",
            title: this.$t("menuPoster.ADD_WRITER_TO_FIRSTVIEW.title", { name: this.data.displayName }),
            subtitle: this.$t("menuPoster.ADD_WRITER_TO_FIRSTVIEW.des"),
            handler(item) {

            }
        },
          {
            icon: "mdi-minus-circle-outline",
            title: this.$t("menuPoster.HIDE_POST.title"),
            subtitle: this.$t("menuPoster.HIDE_POST.des"),
            handler(item) {

            }
        },
          {
            icon: "mdi-clock-outline",
            title: this.$t("menuPoster.HIDE_WRITER_IN_30DAYS.title", { name: this.data.displayName }),
            subtitle: this.$t("menuPoster.HIDE_WRITER_IN_30DAYS.des"),
            handler(item) {

            }
        },
          {
            icon: "mdi-minus-circle-outline",
            title: this.$t("menuPoster.CANCEL_WATCH_WRITER.title"),
            subtitle: this.$t("menuPoster.CANCEL_WATCH_WRITER.des"),
            handler(item) {

            }
        },
          {
            icon: "mdi-comment-alert-outline",
            title: this.$t("menuPoster.REPORT_POST.title"),
            subtitle: this.$t("menuPoster.REPORT_POST.des"),
            handler(item) {

            }
        },
          {
            icon: "mdi-bell-outline",
            title: this.$t("menuPoster.ENABLE_NOTIFY_POST"),
            handler(item) {

            }
        },
          {
            icon: "mdi-link-variant",
            title: this.$t("menuPoster.SHARE_LINK"),
            handler(item) {

            }
        }
      ]
      },
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
    sockets: {
      SERVER__updateLikes({ id, value }) {
        if (id == this.data.id) {
          this.$emit("update", ["likes", value])
        }
      },
      SERVER__updateComments({ id, value }) {
        if (id == this.data.id) {
          this.$emit("update", ["comments", value])
        }
      },
      like__DONE({ isError, value, id }) {
        if (isError && id == this.data.id) {
          this.$emit("update", ["liked", !value])
        }
      }
    },
    methods: {
      toggleLike() {
        if (this.$auth.check()) {
          this.$socket.client.emit("like", {
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
      }
    }
  }
</script>
<style lang="scss" scoped>
  .contents {

    &>>>a {

      &,
      &:active,
      &:hover {
        color: rgb(33, 150, 243);
      }
    }
  }
</style>