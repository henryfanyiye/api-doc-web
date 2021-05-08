<template>
  <div class='preview-container'>
    <div id='preview' />
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default {
  name: 'ProjectShow',
  data() {
    return {}
  },
  props: ['content'],
  watch: {
    content() {
      if (this.content) {
        Vditor.preview(document.getElementById('preview'), this.content)
      }
    }
  }
}
</script>

<style>
.preview-container {
  background-color: #fff;
  width: 100%;
}

#preview {
  width: 94%;
  margin: auto;
}
</style>
