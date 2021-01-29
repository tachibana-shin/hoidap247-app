<template>
  <v-card flat color="F2" min-height="100%" class="poster" :loading="getting">
    <template slot="progress">
      <v-progress-linear color="blue" height="10" indeterminate />
    </template>
    <v-app-bar fixed app color="white" flat dense>
      <v-btn icon @click="$router.back()">
        <v-icon> mdi-arrow-left </v-icon>
      </v-btn>
      <v-toolbar-title>
        Tạo bài viết
      </v-toolbar-title>
      <v-spacer />
      <v-btn text color="blue" class="text-uppercase" :disabled="!ready" @click="submitPost"> Đăng </v-btn>
    </v-app-bar>
    <v-layout wrap column class="pa-3 pb-13 poster--input">
      <v-flex class="d-flex flex-wrap mb-4 header">
        <app-avatar size="45px" color="deep-purple accent-4" name="$auth.user().name" :avatar="$auth.user().avatar" />
        <div class="ml-3">
          <h4 class="font-weight-bold text-body-1"> {{ $auth.user().name }} </h4>
          <small class="text--secondary">
            {{ input.subject }} • {{ input.point }}đ • Lớp {{ input.class }}
          </small>
        </div>
      </v-flex>
      <v-flex>
        <app-editable v-model="input.contents" :photos="input.photos" @click:add-photos="$refs.inputFile.click()" @click:remove-photos="input.photos.splice($event, 1)" placeholder="Bạn đang nghĩ gì?" />
      </v-flex>
    </v-layout>
    <v-bottom-navigation fixed app class="justify-start" height="45">
      <v-btn icon @click="$refs.inputFile.click()">
        <v-icon> mdi-camera </v-icon>
      </v-btn>
      <input type="file" multiple ref="inputFile" @change="input.photos.push(...$event.target.files)" accept="image/*" hidden />
      <v-dialog max-width="300px" v-model="stateDialogTune">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon> mdi-tune </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title> Điều chỉnh </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container fluid class="px-0">
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-select :items="classes" menu-props="auto" label="Lớp" outlined prepend-inner-icon="mdi-city" v-model="input.class" item-text="label" dense color="blue" hide-details />
                  <small> Chọn cấp độ lớp học </small>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select :items="points" menu-props="auto" label="Điểm" outlined prepend-inner-icon="mdi-shape-plus" dense color="blue" v-model="input.point" hide-details :disabled="editMode" />
                  <small> Số điểm bạn đề cử cho câu hỏi này </small>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select :items="subjects" menu-props="auto" label="Môn học" outlined prepend-inner-icon="mdi-school" dense color="blue" v-model="input.subject" item-text="label" hide-details />
                  <small> Thể loại của câu hỏi </small>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider />
          <v-card-actions class="justify-end">
            <v-btn color="blue darken-1" text @click="stateDialogTune = false">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-bottom-navigation>
    <v-dialog v-model="posting" hide-overlay persistent width="300">
      <v-card color="blue" dark>
        <v-card-text>
          {{ $t("labels.POSTING") }}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
  import AppAvatar from "@/components/AppAvatar"
  import AppEditable from "@/components/AppEditable"

  export default {
    components: {
      AppAvatar,
      AppEditable
    },
    data: () => ({
      input: {
        class: 1,
        point: 10,
        subject: "LITERATURE",
        contents: "",
        photos: []
      },
      /* ^ data main */

      dataChanged: false,
      configTuneChanged: false,
      posting: false,
      getting: false,
      stateDialogTune: false,
      /* ^ states */
      classes: [
        { label: "Lớp 1", value: 1 },
        { label: "Lớp 2", value: 2 },
        { label: "Lớp 3", value: 3 },
        { label: "Lớp 4", value: 4 },
        { label: "Lớp 5", value: 5 },
        { label: "Lớp 6", value: 6 },
        { label: "Lớp 7", value: 7 },
        { label: "Lớp 8", value: 8 },
        { label: "Lớp 9", value: 9 },
        { label: "Lớp 10", value: 10 },
        { label: "Lớp 11", value: 11 },
        { label: "Lớp 12", value: 12 }
      ],
      points: [
        10,
        20,
        30,
        40,
        50,
        60,
        70,
        80,
        90,
        100
      ],
      subjects: [
        { label: "Ngữ văn", value: "LITERATURE" },
        { label: "Tin học", value: "IT" },
        { label: "Toán học", value: "MATH" },
        { label: "Sinh học", value: "BIOLOGICAL" },
        { label: "Công nghệ", value: "TECHNOLOGY" },
        { label: "Vật lý", value: "PHYSICAL" },
        { label: "Lịch sử", value: "HISTORY" },
        { label: "Nhạc họa", value: "MUSIC_ART" },
        { label: "Hóa học", value: "CHEMISTRY" },
        { label: "Địa lý", value: "GEOGRAPHY" },
        { label: "Tiếng anh", value: "ENGLISH" },
        { label: "GDCD", value: "CIVIC_EDUCATION" },
        { label: "Khác", value: "OTHER" }
      ]
    }),
    watch: {
      "input.contents"() {
        this.dataChanged = true
      },
      "input.photos"() {
        this.dataChanged = true
      },
      "input.class"() {
        this.configTuneChanged = true
      },
      "input.point"() {
        this.configTuneChanged = true
      },
      "input.subject"() {
        this.configTuneChanged = true
      },
      stateDialogTune(value) {
        if (value) {
          this.configTuneChanged = true
        }
      },
      dataChanged: {
        handler(newVal) {
          if (newVal) {
            window.addEventListener("beforeunload", this.confirmLeavePage)
            window.addEventListener("unload", this.confirmLeavePage)
          } else {
            window.removeEventListener("beforeunload", this.confirmLeavePage)
            window.removeEventListener("unload", this.confirmLeavePage)
          }
        },
        immediate: true
      },
      "$route": {
        async handler() {
          if (this.editMode) {
            this.getting = true
            try {
              const { data } = await this.$http.get("/posts/post", {
                params: {
                  id: this.$route.params.uid
                }
              });

              this.input = {
                class: data.class,
                subject: data.subject,
                point: data.point,
                contents: data.contents,
                photos: data.photos
              }
              this.dataChanged = false
            } catch (e) {
              this.$store.commit("snackbar/setMessage", {
                color: "error",
                text: this.$t("labels.ERRORED")
              })
              this.$router.push("/")
            }
            this.getting = false
          }
        },
        immediate: true
      }
    },
    methods: {
      confirmLeavePage(e) {
        window.removeEventListener("beforeunload", this.confirmLeavePage)
        window.removeEventListener("unload", this.confirmLeavePage)
        if (this.dataChanged) {
          e.preventDefault()
          /* eslint no-trailing-spaces: "off" */
          /* eslint no-return-assign: "off" */
          return e.returnValue = this.$t("confirms.LEAVE_PAGE_NOT_SAVE_DATA")
        }
      },
      async submitPost() {
        if (this.configTuneChanged) {
          this.posting = true
          try {
            const form = new FormData()
            form.append("contents", this.input.contents)
            form.append("class", this.input.class)
            form.append("point", this.input.point)
            form.append("subject", this.input.subject)
            if (this.editMode) {
              form.append("uid", this.$route.params.uid)
            }
            this.input.photos.forEach(item => {
              if (item instanceof File) {
                form.append("photos[]", item)
              } else {
                form.append("photos_not_remove[]", item.key)
              }
            })
            const { message } = (await this.$http.post("/posts/post", form)).data
            this.$store.commit("snackbar/setMessage", {
              color: "success",
              text: message
            })
            this.dataChanged = false
            this.$router.push("/")
          } catch ({ data: { message } }) {
            this.$store.commit("snackbar/setMessage", {
              color: "error",
              text: message
            })
          }
          this.posting = false
        } else {
          this.stateDialogTune = true
        }
      }
    },
    computed: {
      ready() {
        return !!this.input.contents || this.input.photos.length > 0
      },
      editMode() {
        return "uid" in this.$route.params
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.dataChanged) {
        const answer = window.confirm(this.$t("confirms.LEAVE_PAGE_NOT_SAVE_DATA"))
        if (answer) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    },
    beforeDestroy() {
      this.dataChanged = false
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
    }
  }
</style>