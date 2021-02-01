<template>
  <div class="pa-3" v-if="$auth.check()">
    <v-layout>
      <app-avatar :name="$auth.user().name" :avatar="$auth.user().avatar" :size="small ? '30px' : '40px'" class="mr-2" />
      <app-editable class="mr-2 textarea" :contents="contents" @input="$emit('update:contents', $event)" :photos="photos" placeholder="Viết bình luận" @click:add-photos="$refs.inputFile.click()" @click:remove-photos="$emit('update:photos', [])" width-lightbox="100px" height-lightbox="152.43902px" small />
      <!-- @s1guza -->
      <v-btn color="blue" :dark="validate" shaped :disabled="!validate" @click="$emit('click:submit', formData)"> Đăng </v-btn>
    </v-layout>
    <div class="mt-2">
      <v-btn icon @click="$refs.inputFile.click()">
        <v-icon> mdi-camera </v-icon>
      </v-btn>
      <input type="file" ref="inputFile" @change="$emit('update:photos', photos.concat(...$event.target.files))" accept="image/*" hidden />
    </div>
  </div>
  <div v-else>
    required login
  </div>
</template>
<script>
  import AppAvatar from "@/components/AppAvatar"
  import AppEditable from "@/components/AppEditable"

  export default {
    components: {
      AppAvatar,
      AppEditable
    },
    props: {
      contents: String,
      photos: Array,
      small: Boolean
    },
    methods: {
      fileToBuffer(file) {
        return {
          originalname: file.name,
          buffer: file
        }
      }
    },
    computed: {
      validate() {
        return !!this.contents || this.photos.length > 0
      },
      formData() {
        return {
          contents: this.contents,
          photo: this.photos[0] && this.fileToBuffer(this.photos[0])
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .textarea {
    background-color: rgba(0, 0, 0, 0.06);
    border-radius: 28px;
    border: 1px solid rgba(0, 0, 0, 0.38);
    -webkit-box-direction: normal;
    -webkit-box-flex: 1;
    -webkit-box-orient: vertical;
    color: rgba(0, 0, 0, 0.87);
    line-height: 1.75rem;
    font-size: 1rem;
    max-width: 100%;
    min-height: 32px;
    outline-style: none;
    width: 100%;
    -webkit-box-flex: 1;
    padding: 6px 12px;
    margin-top: -1px;
    max-height: (1.75rem * 10);
    overflow-y: auto;

    &:focus {
      border: 2px solid rgb(33, 150, 243);
    }
  }
</style>