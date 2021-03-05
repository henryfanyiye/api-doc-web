<template>
  <div class='hello'>
    <div v-if='show_menu_btn' id='header-right-btn'>
      <el-dropdown trigger='click' @command='handleCommand'>
        <span class='el-dropdown-link'>
          <i class='el-icon-caret-bottom el-icon--right'></i>
        </span>
        <el-dropdown-menu slot='dropdown'>
          <el-dropdown-item command='goback'>{{ $t('goback') }}</el-dropdown-item>
          <el-dropdown-item command='share'>{{ $t('share') }}</el-dropdown-item>
          <el-dropdown-item command='new_page'>{{ $t('new_page') }}</el-dropdown-item>
          <el-dropdown-item command='new_catalog'>{{ $t('new_catalog') }}</el-dropdown-item>
          <el-dropdown-item command='edit_page'>{{ $t('edit_page') }}</el-dropdown-item>
          <el-dropdown-item command='copy'>{{ $t('copy') }}</el-dropdown-item>
          <el-dropdown-item command='ShowHistoryVersion'>
            {{ $t('history_version') }}
          </el-dropdown-item>
          <el-dropdown-item command='export'>{{ $t('export') }}</el-dropdown-item>
          <el-dropdown-item command='delete_page'>
            {{ $t('delete_interface') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
        :title="$t('share_page')"
        :visible.sync='dialogVisible'
        width='600px'
        :close-on-click-modal='false'
    >
      <p>
        {{ $t('item_page_address') }} :
        <code>{{ share_page_link }}</code>
        <i class='el-icon-document-copy'
           v-clipboard:copy='share_page_link'
           v-clipboard:success='onCopy'
        ></i>
      </p>
      <p v-if='false' style='border-bottom: 1px solid #eee;'>
        <img id='qr-page-link' style='width:114px;height:114px;' :src='qr_page_link' />
      </p>

      <div v-show='item_info.ItemPermn'>
        <el-checkbox
            v-model='isCreateSiglePage'
            @change='checkCreateSiglePage'
        >{{ $t('create_sigle_page') }}
        </el-checkbox>

        <p v-if='isCreateSiglePage'>
          {{ $t('single_page_address') }} :
          <code>{{ share_single_link }}</code>
          <i
              class='el-icon-document-copy'
              v-clipboard:copy='share_single_link'
              v-clipboard:success='onCopy'
          ></i>
        </p>
        <p></p>
        <p>{{ $t('create_sigle_page_tips') }}</p>
      </div>

      <span slot='footer' class='dialog-footer'>
        <el-button type='primary' @click='dialogVisible = false'>{{ $t('confirm') }}</el-button>
      </span>
    </el-dialog>

    <!-- 历史版本 -->
    <HistoryVersion
        :page_id='page_id'
        :is_show_recover_btn='false'
        :is_modal='false'
        callback='insertValue'
        ref='HistoryVersion'
    ></HistoryVersion>
  </div>
</template>


<style scoped>
.op-bar {
  color: #333;
  position: fixed;
  top: 110px;
  margin-left: 840px;
  max-width: 250px;
}

.op-bar i {
  cursor: pointer;
  font-size: 16px;
  margin-right: 55px;
  margin-bottom: 30px;
}

.icon-folder {
  width: 15px;
  height: 12px;
  cursor: pointer;
  margin-right: 55px;
}

a {
  color: #333;
}

#header-right-btn {
  font-size: 20px;
  top: 15px;
  right: 5%;
  cursor: pointer;
  position: fixed;
}

.el-dropdown-link {
  color: #000;
  font-size: 18px;
  font-weight: bolder;
}

.el-icon-document-copy {
  cursor: pointer;
}
</style>

<script>
import HistoryVersion from '@/components/page/edit/HistoryVersion'

export default {
  props: {
    item_id: '',
    item_domain: '',
    page_id: '',
    item_info: '',
    page_info: {}
  },
  data() {
    return {
      menu: [],
      dialogVisible: false,
      qr_page_link: '#',
      qr_single_link: '#',
      share_page_link: '',
      share_single_link: '',
      copyText1: '',
      copyText2: '',
      isCreateSiglePage: false,
      showMore: false,
      lang: '',
      show_menu_btn: false
    }
  },
  components: {
    HistoryVersion
  },
  methods: {
    edit_page() {
      var page_id = this.page_id > 0 ? this.page_id : 0
      var url = '/page/edit/' + this.item_id + '/' + page_id
      this.$router.push({ path: url })
    },
    share_page() {
      var page_id = this.page_id > 0 ? this.page_id : 0
      let path = this.item_domain ? this.item_domain : this.item_id
      this.share_page_link =
          this.getRootPath() + '#/' + path + '?page_id=' + page_id
      // this.share_single_link= this.getRootPath()+"/page/"+page_id ;
      this.qr_page_link =
          DocConfig.server +
          '/api/common/qrcode&size=3&url=' +
          encodeURIComponent(this.share_page_link)
      // this.qr_single_link = DocConfig.server +'/api/common/qrcode&size=3&url='+encodeURIComponent(this.share_single_link);
      this.dialogVisible = true
      this.copyText1 =
          this.item_info.item_name +
          ' - ' +
          this.page_info.page_title +
          '\r\n' +
          this.share_page_link
      this.copyText2 =
          this.page_info.page_title + '\r\n' + this.share_single_link
    },
    dropdown_callback(data) {
      if (data) {
        data()
      }
    },
    show_page_info() {
      var html =
          '本页面由 ' +
          this.page_info.author_username +
          ' 于 ' +
          this.page_info.addtime +
          ' 更新'
      this.$alert(html)
    },

    // 展示历史版本
    ShowHistoryVersion() {
      let childRef = this.$refs.HistoryVersion // 获取子组件
      childRef.show()
    },

    delete_page() {
      var page_id = this.page_id > 0 ? this.page_id : 0
      var that = this
      var url = DocConfig.server + '/api/page/delete'

      this.$confirm(that.$t('comfirm_delete'), ' ', {
        confirmButtonText: that.$t('confirm'),
        cancelButtonText: that.$t('cancel'),
        type: 'warning'
      }).then(() => {
        var params = new URLSearchParams()
        params.append('page_id', page_id)
        that.axios.post(url, params).then(function(response) {
          if (response.data.error_code === 0) {
            window.location.reload()
          } else {
            that.$alert(response.data.error_message)
          }
        })
      })
    },
    onCopy() {
      this.$message(this.$t('copy_success'))
    },
    checkCreateSiglePage(newvalue) {
      if (newvalue) {
        this.CreateSiglePage()
      } else {
        this.$confirm(this.$t('cancelSingle'), ' ', {
          confirmButtonText: this.$t('cancelSingleYes'),
          cancelButtonText: this.$t('cancelSingleNo'),
          type: 'warning'
        }).then(() => {
          this.CreateSiglePage()
        }, () => {
          this.isCreateSiglePage = true
        })
      }
    },
    CreateSiglePage() {
      var page_id = this.page_id > 0 ? this.page_id : 0
      var that = this
      var url = DocConfig.server + '/api/page/createSinglePage'
      var params = new URLSearchParams()
      params.append('page_id', page_id)
      params.append('isCreateSiglePage', this.isCreateSiglePage)

      that.axios.post(url, params).then(function(response) {
        if (response.data.error_code === 0) {
          var unique_key = response.data.data.unique_key
          if (unique_key) {
            that.share_single_link = that.getRootPath() + '#/p/' + unique_key
          } else {
            that.share_single_link = ''
          }
        } else {
          that.$alert(response.data.error_message)
        }
      })
    },
    new_page() {
      var url = '/page/edit/' + this.item_info.item_id + '/0'
      this.$router.push({ path: url })
    },

    mamage_catalog() {
      var url = '/catalog/' + this.item_info.item_id
      this.$router.push({ path: url })
    },
    showMoreAction() {
      this.showMore = true
      var element = document
          .getElementById('page_md_content')
          .getElementsByClassName('open-list')
      element[0].style.top = '330px'
    },
    hideMoreAction() {
      this.showMore = false
      var element = document
          .getElementById('page_md_content')
          .getElementsByClassName('open-list')
      element[0].style.top = '230px'
    },
    handleCommand(command) {
      switch (command) {
        case 'goback':
          this.$router.push({ path: '/item/index' })
          break
        case 'share':
          this.share_page()
          break
        case 'new_page':
          this.new_page()
          break
        case 'new_catalog':
          this.mamage_catalog()
          break
        case 'edit_page':
          this.edit_page()
          break
        case 'ShowHistoryVersion':
          this.ShowHistoryVersion()
          break
        case 'copy':
          this.$router.push({
            path:
                '/page/edit/' +
                this.item_info.item_id +
                '/0?copy_page_id=' +
                this.page_id
          })
          break
        case 'export':
          this.$router.push({ path: '/item/export/' + this.item_info.item_id })
          break
        case 'delete_page':
          this.delete_page()
          break
      }
    }
  },
  mounted() {
    const that = this
    this.lang = DocConfig.lang
    if (this.page_info.unique_key) {
      this.isCreateSiglePage = true
      this.share_single_link =
          this.getRootPath() + '#/p/' + this.page_info.unique_key
    }
    document.onkeydown = function(e) {
      // 对整个页面文档监听 其键盘快捷键
      const keyNum = window.event ? e.keyCode : e.which // 获取被按下的键值
      if (keyNum == 69 && e.ctrlKey) {
        // Ctrl +e 为编辑
        that.edit_page()
        e.preventDefault()
      }

      if (keyNum == 46 && e.ctrlKey) {
        // Ctrl +del 为删除
        that.delete_page()
        e.preventDefault()
      }
    }
    if (this.isMobile() || window.innerWidth > 1300) {
      this.show_menu_btn = true
    }
  },
  watch: {
    page_info: function() {
      if (this.page_info.unique_key) {
        this.isCreateSiglePage = true
        this.share_single_link =
            this.getRootPath() + '#/p/' + this.page_info.unique_key
      } else {
        this.isCreateSiglePage = false
        this.share_single_link = ''
      }
    }
  },
  destroyed() {
    document.onkeydown = undefined
  }
}
</script>
