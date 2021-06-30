<template>
  <div class="layout-container">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <div class="w">
      <div class="content">
        <div class="account-sidebar">
          <div class="avatar gray-box ">
            <div>
              <img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3717120934,3932520698&fm=26&gp=0.jpg"> <h5>
              Kyrie</h5></div>
            <div class="box-inner">
              <ul class="account-nav">
                <li v-for="(item,i) in nav" :key='i' :class="{current:item.name===title}"
                    @click="tab(item)">
                  <a href="javascript:;">{{item.name}}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="account-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <y-footer></y-footer>

  </div>

</template>
<script>
  import YFooter from '../common/Footer'
  import YHeader from '../common/Header'
//   import { mapState } from 'vuex'
  export default {
    data () {
      return {
        title: '我的订单',
        nav: [
          {name: '我的订单', path: 'orderList'},
          {name: '账户资料', path: 'information'},
          {name: '收货地址', path: 'addressList'}
        ],
        editAvatar: true
      }
    },
    // computed: {
    // //   ...mapState(['userInfo'])
    // },
    methods: {
      tab (e) {
        this.$router.push({path: '/user/' + e.path})
      }
    },
    created () {
      let path = this.$route.path.split('/')[2]
      this.nav.forEach(item => {
        if (item.path === path) {
          this.title = item.name
        }
      })
    },
    components: {
      'y-footer': YFooter,
      'y-header': YHeader
    },
    watch: {
      $route (to) {
        let path = to.path.split('/')[2]
        this.nav.forEach(item => {
          if (item.path === path) {
            this.title = item.name
          }
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/style/mixin";
  * {
      padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .main {
      background: #ededed;
  }
  .layout-container {
      min-height: 400px;
      background: #e6e6e6;
  }
  .w {
    padding-top: 40px;
    width: 1220px;
    margin: 0 auto;
  }
  .gray-box{
      overflow: hidden;
      background: #fff;
      border: 1px solid #dcdcdc;
      border-color: rgba(0,0,0,.14);
      box-shadow: 0 3px 8px -6px rgb(0 0 0 / 10%);
  }
  .content {
    display: flex;
    height: 100%;
  }
  .account-sidebar {
    width: 210px;
    border-radius: 6px;
    .avatar {
      padding-top: 20px;
      border-radius: 10px;
      text-align: center;
      img {
        width: 168px;
        height: 168px;
      }
      h5 {
        font-size: 18px;
        line-height: 48px;
        font-weight: 700;
      }
    }
    .account-nav {
      padding-top: 15px;
      li {
        position: relative;
        height: 48px;
        border-top: 1px solid #EBEBEB;
        line-height: 48px;
        list-style: none;
        &:hover {
          a {
            position: relative;
            z-index: 1;
            height: 50px;
            background-color: #98AFEE;
            line-height: 50px;
            color: #FFF;
          }
        }
        a {
          display: block;
          text-decoration: none;
          font-style: normal;
          color:#5079d9;
          cursor: pointer;
          transition: all .15s ease-out;
          font-size: 14px;
        }
        &.current {
          a {
            position: relative;
            z-index: 1;
            height: 50px;
            background-color: #98AFEE;
            line-height: 50px;
            color: #FFF;
          }
        }
      }
    }
  }
  .account-content {
    margin-left: 20px;
    flex: 1;
  }
</style>