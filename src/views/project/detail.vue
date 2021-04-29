<template>
  <el-row :gutter='20'>
    <el-col :span='4'>
      <el-tree
          class='filter-tree'
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
            v-show='show'
            :defaultOpen='defaultOpen'
            :toolbarsFlag='toolbarsFlag'
            :subfield='subfield'
            :codeStyle='codeStyle'
            v-model='content' />

        <mavon-editor
            v-show='!show'
            :toolbars='toolbars'
            :toolbarsFlag='toolbarsFlag'
            :tabSize='tabSize'
            v-model='content'
            @save='save' />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { apiDetail, projectDetail } from '@/api/project'

export default {
  name: 'ProjectDetail',
  data() {
    return {
      show: true,
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
        subfield: true, // true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)
        fullscreen: true, // 全屏编辑
        readmodel: true // 沉浸式阅读
      },
      tabSize: 4, // tab转化为几个空格，默认为\t
      subfield: false, // true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)
      defaultOpen: 'preview', // edit：默认展示编辑区域,preview：默认展示预览区域
      toolbarsFlag: false, // 工具栏是否显示
      codeStyle: 'codeStyle',
      content: ''
    }
  },
  beforeMount() {
    if (this.$route.query.id) {
      projectDetail(this.$route.query.id).then(res => {
        this.data = res.data
      })
    }
  },
  methods: {
    handleNodeClick(data) {
      if (data.type === 'api') {
        apiDetail(data.id).then(res => {
          let { title, method, url, header, path, query, body_type, body } = res.data
          let req = '|Name|Type|Data Type|Description|Required|\n' +
              '|--|--|--|--|--|--|\n'

          header = JSON.parse(header)
          for (const i in header) {
            req += `|${header[i].key}|header|string|${header[i].value}|Y|\n`
          }

          path = JSON.parse(path)
          for (const i in path) {
            req += `|${path[i].key}|path|string|${path[i].value}|Y|\n`
          }

          query = JSON.parse(query)
          for (const i in query) {
            req += `|${query[i].key}|query|string|${query[i].value}|Y|\n`
          }

          this.content = `# ${title}\n` +
              `**Method：** \`${method}\`\n` +
              `**Path：** \`${url}\`\n` +
              `**Description：**\n` +
              `**Request Parameters：**\n${req}`

          if (body) {
            this.content += '**Request Body：**\n' +
                '```\n' +
                `${body}\n` +
                '```\n'
          }
          // this.show = false
        })
      }
    },
    save(value) {
      console.log(value)
    }
  }
}
</script>

<style>
.el-row {
  padding: 30px;
}
</style>
