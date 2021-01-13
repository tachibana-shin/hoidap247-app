<template>
  <v-card color="white" v-if="data">
    <v-card-title class="body-2">
      <v-layout wrap>
        <v-flex class="d-flex mb-4">
          <v-avatar size="40px" color="deep-purple accent-4">
            <v-img lazy-src="writer.photoURL" v-if="writer.photoURL" />
            <span class="white--text" v-else> {{ writer.displayName.split(" ").slice(0, 2).map(item => item[0]).join("") }} </span>
          </v-avatar>
          <div class="ml-3">
            <h4 class="font-weight-bold"> {{ writer.displayName }} </h4>
            <small class="text--secondary">
              {{ $t("spacer", timeAgo(poster.lastTimeModifier)) }} </small>
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
          <span>
            {{ poster.subject }} • {{ $t("injects.CLASSES", { classes: poster.classes }) }} • {{ $t("injects.POINTS", { points: poster.point }) }}
          </span>
        </v-flex>
        <v-flex class="text-right">
          <v-chip color="deep-purple accent-4" outlined x-small v-if="poster.firstPost"> {{ $t("labels.FIRST_QUESTION") }} </v-chip>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-subtitle class="pt-2" v-html="poster.contents"></v-card-subtitle>
    <v-card-text>
      <vue-lightbox :items="poster.images" v-if="poster.images && poster.images.length" />
      <vue-preview-link :small="poster.linker.small" :large="poster.linker.large" :href="poster.linker.href" :image="poster.linker.image" :url-name="poster.linker.urlName" :name="poster.linker.name" v-else-if="poster" />
    </v-card-text>
    <v-card-actions>
      <v-layout column>
        <v-flex>
          <v-layout class="body-2 text-caption text--secondary px-2 pb-2">
            <v-flex>
              <v-icon size="1.2em" color="pink"> mdi-heart </v-icon> {{ poster.likes }}
            </v-flex>
            <v-flex class="text-right">
              {{ $t("injects.COMMENTS", { count: poster.comments }) }}
            </v-flex>
          </v-layout>
          <div class="pb-2">
            <v-divider />
          </div>
        </v-flex>
        <v-flex>
          <v-layout align="center" class="text-center">
            <v-flex>
              <v-btn icon :ripple="false" :color="poster.liked ? 'pink' : undefined" @click="toggleLike">
                <v-icon size="1.3rem"> mdi-heart-outline </v-icon>
                <span class="text-normal"> {{ $t(poster.liked ? "labels.LIKED" : "labels.LIKE") }} </span>
              </v-btn>
            </v-flex>
            <v-flex>
              <v-btn icon :ripple="false">
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
                          <img :src="`https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`" :alt="tile.title">
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

  export default {
    components: {
      VueLightbox,
      VuePreviewLink
    },
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    data: () => ({
      bottomSheetMenuState: false,
      bottomSheetShareState: false,
      sharedItems: [
        { img: 'keep.png', title: 'Keep' },
        { img: 'inbox.png', title: 'Inbox' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'google.png', title: 'Google+' },
      ],
    }),
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
            title: this.$t("menuPoster.ADD_WRITER_TO_FIRSTVIEW.title", { name: this.writer.displayName }),
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
            title: this.$t("menuPoster.HIDE_WRITER_IN_30DAYS.title", { name: this.writer.displayName }),
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
      writer() {
        return this.data.writer
      },
      poster() {
        return this.data.poster
      }
    },
    methods: {
      checkPermission(permission, action, name, callback) {
        if (this.$auth.check()) {
          if (this.$auth.check({
              permission
            })) {
            callback()
          } else {
            this.$notify({
              color: "danger",
              text: this.$t("errors.YOU_DO_NOT_HAVE_ACTION", {
                action: this.$t(action),
                name: this.$t(name)
              })
            })
          }
        }
        else {
          this.$notify({
            color: "warning",
            text: this.$t("errors.YOU_NEED_LOGIN_TO_USE_FUNCTION")
          })
        }
      },
      toggleLike() {
        this.$socket.emit("sendProto", true)
        return
        this.checkPermission({
          poster: { like: true }
        }, "labels.LIKE", "labels.POST", async () => {
          await this.$http("/poster", {
            params: {
              actions: this.poster.liked ? "UNLIKE" : "LIKE"
            }
          })
          this.$emit("update", ["poster/liked", !this.poster.liked])
        })
      },
      timeAgo(value) {
        const tmp = new Date
        const timeNow = new Date(tmp.getTime() + tmp.getTimezoneOffset() * 60000)

        let detail = (timeNow.getTime() - value) / 1000

        if (detail < 60) {
          return {
            value: Math.round(detail),
            key: this.$t("time.SECONDS")
          }
        } else {
          detail /= 60
          if (detail < 60) {
            return {
              value: ~~detail,
              key: this.$t("time.MINUTES")
            }
          } else {
            detail /= 60
            if (detail < 24) {
              return {
                value: ~~detail,
                key: this.$t("time.HOURS")
              }
            } else {
              detail /= 24
              if (detail < 30) {
                if (detail < 7) {
                  return {
                    value: ~~detail,
                    key: this.$t("time.DATE")
                  }
                } else {
                  return {
                    value: ~~(detail / 7),
                    key: this.$t("time.WEEK")
                  }
                }
              } else {
                detail /= 30
                if (detail < 12) {
                  return {
                    value: ~~detail,
                    key: this.$t("time.MONTH")
                  }
                } else {
                  detail /= 12
                  return {
                    value: ~~detail,
                    key: this.$t("time.YEAR")
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</script>