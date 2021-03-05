<template>
  <div class='hello'>

    <!-- 展示常规项目 -->
    <ShowRegularItem
        :item_info='item_info'
        :search_item='search_item'
        :keyword='keyword'
    ></ShowRegularItem>

  </div>
</template>


<script>
import ShowRegularItem from '@/components/item/show/show_regular_item/Index'
import { projectAll } from '@/api/api'

export default {
  data() {
    return {
      item_info: '',
      keyword: ''
    }
  },
  components: {
    ShowRegularItem
  },
  methods: {
    // 获取菜单
    get_item_menu(keyword) {
      if (!keyword) {
        keyword = ''
      }
      const that = this
      let loading = that.$loading()
      const id = that.$route.params.item_id
      projectAll(id).then(res => {
        loading.close()
        that.item_info = res
        that.$store.dispatch('changeItemInfo', res)
        document.title = that.item_info.projectName
      }).catch(err => {
        loading.close()
        that.$alert(err.msg)
      })
    },
    search_item(keyword) {
      this.item_info = ''
      this.$store.dispatch('changeItemInfo', '')
      this.keyword = keyword
      this.get_item_menu(keyword)
    }
  },
  mounted() {
    this.get_item_menu()
  },
  beforeDestroy() {
    this.$message.closeAll()
    document.title = 'ShowDoc'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
