<template>
  <div class='hello'>

    <el-container class='container-narrow'>

      <el-row class='masthead'>

        <div class='logo-title'>
          <h2 class='muted'>
            <img src='static/logo/b_64.png' style='width:50px;height:50px;margin-bottom:-10px;' alt />ShowDoc
          </h2>
        </div>

        <div class='header-btn-group pull-right'>

          <el-tooltip class='item' effect='dark' :content="$t('team_mamage')" placement='top'>
            <router-link to='/team/index'>
              <i class='el-icon-s-flag'></i>
            </router-link>
          </el-tooltip>

          <el-tooltip
              v-if='isAdmin'
              class='item'
              effect='dark'
              :content="$t('background')"
              placement='top'
          >
            <router-link to='/admin/index'>
              <i class='el-icon-s-tools'></i>
            </router-link>
          </el-tooltip>

          <el-tooltip class='item' effect='dark' :content="$t('more')" placement='top'>
            <el-dropdown @command='dropdown_callback' trigger='click'>
              <span class='el-dropdown-link'>
                <i class='el-icon-caret-bottom el-icon--right'></i>
              </span>
              <el-dropdown-menu slot='dropdown'>
                <el-dropdown-item>
                  <router-link to='/user/setting'>{{ $t('Logged') }}:{{ username }}</router-link>
                </el-dropdown-item>
                <el-dropdown-item :command='logout'>{{ $t('logout') }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-tooltip>

        </div>

      </el-row>

    </el-container>

    <el-container class='container-narrow'>

      <div class='container-thumbnails'>

        <div class='search-box-div' v-if='itemList.length > 9'>
          <div class='search-box el-input el-input--prefix'>
            <input autocomplete='off' type='text' rows='2' validateevent='true' class='el-input__inner'
                   v-model='keyword' />
            <span class='el-input__prefix'>
              <i class='el-input__icon el-icon-search'></i>
            </span>
          </div>
        </div>

        <ul class='thumbnails' id='item-list' v-if='itemList'>
          <draggable v-model='itemList' tag='span' group='item' @end='endMove' ghostClass='sortable-chosen'>
            <li class='text-center' v-for='item in itemList' :key='item.projectId'>
              <router-link class='thumbnail item-thumbnail'
                           :to="'/' +  (item.item_domain ? item.item_domain:item.projectId )" title>

                <!-- 自己创建的话显示项目设置按钮 -->
                <span class='item-setting' @click.prevent='click_item_setting(item.projectId)'
                      :title="$t('item_setting')" v-if='item.creator'>
                                <i class='el-icon-setting'></i>
                              </span>

                <!-- 如果是加入的项目的话，这里显示退出按钮 -->
                <span class='item-exit' @click.prevent='click_item_exit(item.projectId)'
                      :title="$t('item_exit')"
                      v-if='! item.creator'>
                                <i class='el-icon-close'></i>
                              </span>
                <p class='my-item'>{{ item.projectName }}</p>

                <!-- 如果是加密项目的话，这里显示一个加密图标 -->
                <span class='item-private' v-if='item.is_private'>
                                <el-tooltip class='item' effect='dark' :content="$t('private_tips')" placement='right'>
                                  <i class='el-icon-lock'></i>
                                </el-tooltip>
                              </span>
              </router-link>
            </li>
          </draggable>
          <li class='text-center'>
            <router-link class='thumbnail item-thumbnail' to='/item/add' title>
              <p class='my-item'>
                {{ $t('new_item') }}
                <i class='el-icon-plus'></i>
              </p>
            </router-link>
          </li>
        </ul>

      </div>

    </el-container>

  </div>
</template>

<style scoped>
.container-narrow {
  margin: 0 auto;
  max-width: 930px;
}

.masthead {
  width: 100%;
  margin-top: 30px;
}

.header-btn-group {
  margin-top: -38px;
  font-size: 18px;
}

.header-btn-group a {
  color: #333;
  margin-left: 25px;
}

.el-dropdown {
  font-size: 18px;
}

.el-dropdown-link,
a {
  color: #333;
}

.logo-title {
  margin-left: 0px;
}

.container-thumbnails {
  margin-top: 30px;
  max-width: 1000px;
}

.my-item {
  margin: 40px 5px;
}

.thumbnails li {
  float: left;
  margin-bottom: 20px;
  margin-left: 20px;
}

.thumbnails li a {
  color: #444;
  font-weight: bold;
  height: 100px;
  width: 180px;
}

.thumbnails li a:hover,
.thumbnails li a:focus {
  border-color: #f2f5e9;
  -webkit-box-shadow: none;
  box-shadow: none;
  text-decoration: none;
  background-color: #f2f5e9;
}

.thumbnail {
  display: block;
  padding: 4px;
  line-height: 20px;
  border: 1px solid #ddd;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  list-style: none;
  background-color: #ffffff;
}

.item-setting {
  float: right;
  margin-right: 15px;
  margin-top: 5px;
  display: none;
}

.item-exit {
  float: right;
  margin-right: 5px;
  margin-top: 5px;
  display: none;
}

.item-private {
  float: right;
  margin-right: 15px;
  margin-top: -20px;
  display: none;
  cursor: default;
}

.thumbnails li a i {
  color: #777;
  font-weight: bold;
  margin-left: 5px;
}

.item-thumbnail:hover .item-setting {
  display: block;
}

.item-thumbnail:hover .item-exit {
  display: block;
}

.item-thumbnail:hover .item-private {
  display: block;
}

.search-box-div {
  width: 190px;
  margin-left: 60px;
}

.sortable-chosen .item-thumbnail {
  color: #ffffff;
  background-color: #ffffff;
}
</style>

<script>
import draggable from 'vuedraggable'
import { detail, projectList } from '@/api/api'

export default {
  components: {
    draggable
  },
  data() {
    return {
      currentDate: new Date(),
      itemList: [],
      isAdmin: false,
      keyword: '',
      lang: '',
      username: ''
    }
  },
  methods: {
    get_item_list() {
      projectList().then(res => {
        this.itemList = res
      })
    },
    // 进入项目设置页
    click_item_setting(projectId) {
      this.$router.push({ path: '/item/setting/' + projectId })
    },
    click_item_exit(projectId) {
      const that = this
      this.$confirm(that.$t('confirm_exit_item'), ' ', {
        confirmButtonText: that.$t('confirm'),
        cancelButtonText: that.$t('cancel'),
        type: 'warning'
      }).then(() => {
        const url = DocConfig.server + '/api/item/exitItem'
        let params = new URLSearchParams()
        params.append('projectId', projectId)
        that.axios.post(url, params).then(function(response) {
          if (response.data.code === 0) {
            window.location.reload()
          } else {
            that.$alert(response.data.msg)
          }
        })
      })
    },
    logout() {
      localStorage.clear()
      this.$router.replace({
        path: '/user/login'
      })
    },
    dropdown_callback(data) {
      if (data) {
        data()
      }
    },
    exchangeArray(data, oldIndex, newIndex) {
      let tmp = data[oldIndex]
      data.splice(oldIndex, 1)
      data.splice(newIndex, 0, tmp)
      return data
    },
    endMove(evt) {
      let data = {}
      let list = this.exchangeArray(
          this.itemList,
          evt['oldIndex'],
          evt['newIndex']
      )
      this.itemList = []
      this.$nextTick(() => {
        this.itemList = list
      })
      for (let i = 0; i < list.length; i++) {
        let key = list[i]['projectId']
        data[key] = i + 1
      }
    }
  },
  mounted() {
    this.get_item_list()
    this.lang = DocConfig.lang
    detail().then(res => {
      this.username = res.username
      this.isAdmin = res.admin
    })
  },
  beforeDestroy() {
    this.$message.closeAll()
  }
}
</script>
