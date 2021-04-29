<template>
  <el-row :gutter='20'>
    <el-col :span='4'>
      <el-tree
          :data='data'
          :props='defaultProps'
          :highlight-current='true'
          accordion
          @node-click='handleNodeClick'>
      </el-tree>
    </el-col>
    <el-col :span='20'>
      <div id='editor-main'>
        <mavon-editor
            :toolbars='toolbars'
            :subfield='subfield'
            :defaultOpen='defaultOpen'
            :editable='editable'
            :toolbarsFlag='toolbarsFlag'
            :tabSize='tabSize'
            :placeholder='placeholder'
            v-model='content'
            @change='change'
            @previewToggle='previewToggle'
            @save='save' />
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'ProjectDetail',
  data() {
    return {
      data: [],
      defaultProps: {
        label: 'name',
        children: 'items'
      },
      toolbars: {
        header: true, // 标题
        bold: true, // 粗体
        italic: true, // 斜体
        underline: true, // 下划线
        strikethrough: true, // 中划线
        ol: true, // 有序列表
        ul: true, // 无序列表
        code: true, // code
        table: true, // 表格
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        preview: true, // 预览
        fullscreen: true, // 全屏编辑
        readmodel: true // 沉浸式阅读
      },
      tabSize: 4, // tab转化为几个空格，默认为\t
      placeholder: '请选择接口查看文档',
      subfield: false, // true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)
      defaultOpen: 'preview', // edit：默认展示编辑区域,preview：默认展示预览区域
      editable: false, // 是否允许编辑
      toolbarsFlag: true, // 工具栏是否显示
      content: ''
    }
  },
  beforeMount() {
    if (this.$route.query.id) {
      this.$store.dispatch('project/projectDetail', this.$route.query.id).then(res => {
        this.data = res
      })
    }
  },
  methods: {
    handleNodeClick(data) {
      if (data.type === 'api') {
        // this.$router.push({ name: 'Markdown', query: { id: data.id } })
        this.$store.dispatch('project/apiDetail', data.id).then(res => {
          this.content = JSON.stringify(res)
          this.toolbars = {
            preview: true, // 预览
            fullscreen: true, // 全屏编辑
            readmodel: true // 沉浸式阅读
          }
        })
      }
    },
    change(value) {
      // console.log(value)
    },
    save(value) {
      console.log(value)
    },
    previewToggle(status, value) {

    }
  }
}
</script>

<style>
.el-row {
  margin-top: 30px;
}
</style>
