<template>
<div>
  <quill-editor
    v-bind="$attrs"
    ref="myQuillEditor"
    :options="editorOption"
    @change="onEditorChange($event)"
  >
  </quill-editor>
  <app-upload
    @uploadSuccess="uploadSuccess"
    style="display: none;"
  >
    <el-button ref="imgUploadButton">上传</el-button>
  </app-upload>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
@Component({
  components: {
    quillEditor,
  },
})
export default class AppQuillEditor extends Vue {
  addRange: any;
  data() {
    return {
      // content: '',
      editorOption: {
        // some quill options
      },
    };
  }
  imgHandler(state: boolean) {
    const editor = this.getEditor();
    this.addRange = editor.quill.getSelection();
    if (state) {
      const fileInput = this.$refs.imgUploadButton as any;
      fileInput.$el.click();
    }
  }
  mounted() {
    const editor = this.getEditor();
    editor.quill.getModule('toolbar').addHandler('image', this.imgHandler);
  }
  uploadSuccess(imgUrl: string) {
    const editor = this.getEditor();
    this.addRange = editor.quill.getSelection();
    const value = imgUrl.indexOf('http') !== -1 ? imgUrl : 'http://' + imgUrl;
    editor.quill.insertEmbed(this.addRange == null ? 0 : this.addRange.index, 'image', value);
  }
  getEditor(): any {
    return this.$refs.myQuillEditor;
  }
  onEditorChange(content: any) {
    const { quill, html, text } = content;
    // this.$data.content = html;
    this.$emit('update:content', html);
  }
}
</script>

<style scoped lang="less">
</style>