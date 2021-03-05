<template>
  <div>
    <template v-if='catalogs.length'>
      <el-submenu v-for='catalog in catalogs' :index='catalog.pcid.toString()' :key='catalog.pcid'>
        <template slot='title'>
          <img src='static/images/folder.png' />
          {{ catalog.catalogName }}
        </template>

        <!--三级目录的页面-->
        <template v-if='catalog.items'>
          <el-menu-item v-for='item in catalog.items' :index='item.id.toString()' :key='item.id'>
            <i class='el-icon-document'></i>
            <span :title='item.name' :id="'left_page_'+item.id">{{ item.name }}</span>
          </el-menu-item>
        </template>

        <!-- 子目录 -->
        <LeftMenuSub v-if='catalog.catalogs && catalog.catalogs.length' :catalogs='catalog.catalogs'></LeftMenuSub>
      </el-submenu>
    </template>
  </div>
</template>


<script>
export default {
  name: 'LeftMenuSub',
  props: {
    catalogs: {}
  },
  data() {
    return {}
  },
  components: {},
  methods: {},
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon-folder {
  width: 18px;
  height: 15px;
  cursor: pointer;
}

.menu-icon-folder {
  margin-right: 5px;
  margin-top: -5px;
}

.el-menu-item,
.el-submenu__title {
  height: 46px;
  line-height: 46px;
}

.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}

.el-menu-item {
  line-height: 40px;
  height: 40px;
  font-size: 12px;
}

.el-menu-item [class^='el-icon-'] {
  font-size: 17px;
  margin-bottom: 4px;
}

.el-submenu__title img {
  width: 14px;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 10px;
  margin-bottom: 4px;
}
</style>
