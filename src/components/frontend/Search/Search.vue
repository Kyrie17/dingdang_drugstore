<template>
  <div class="goods">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <div class="nav-subs">
      <div class="nav-sub-bgs"></div>
      <div class="nav-sub-wrappers">
        <div class="w">
          <ul class="nav-lists">
            <li>
              <router-link to="/">
                <a>首页</a>
              </router-link>
            </li>
            <li>
              <a class="active">搜索结果</a>
            </li>
            <li>
              <!-- <a v-if="searching === true">拼命搜索中...</a> -->
              <a>共为您找到 {{total}} 款商品信息</a>
            </li>
          </ul>
          <div></div>
        </div>
      </div>
    </div>
    
    <div v-loading="loading" element-loading-text="加载中..." style="min-height: 35vw;">
      <div  class="img-item" v-if="!noResult" >
        <!--商品-->
        <div class="goods-box w">
          <mall-goods v-for="(item,i) in goods" :key="i" :msg="item"></mall-goods>
        </div>
      </div>
      <div class="no-info" v-if="noResult" >
        <div class="no-data">
          <img src="/static/images/no-search.png">
          <br> 抱歉！没有为您找到相关的商品
        </div>
      </div>
    </div>
    <y-footer></y-footer>
  </div>
</template>
<script>
  import mallGoods from '../common/MallGoods'
  import YButton from '../common/Button'
  import YShelf from '../common/Shelf'
  import YHeader from '../common/Header'
  import YFooter from '../common/Footer'
  export default {
    data () {
      return {
        goods: [
            {productId:13,type:0,productName: '清热解毒片(盘龙)',salePrice:8.00,subTitle:'清热解毒。用于治疗流感，上呼吸道感染及各种发热性疾病。',productImageBig: "https://image.jianke.com/upload/prodimage/201606wm/2016629104713919.jpg"},
        ],
        key: '',
        noResult: false,
        error: false,
        loading: false,
        // currentPage: 1
        pageSize: 20, // 页数
        total: 0, // 总结果数
      }
    },
    methods: {
      handleSizeChange (val) {
        this.pageSize = val
        this._getSearch()
        this.loading = true
      },
      async getSearch() {
        var params = new URLSearchParams()
        params.append('query', this.key);
        const { data: res } = await this.$http.post("product/get_product_by_query", params);
        this.goods = res.data
        this.total = this.goods.length
        if (this.total === 0) {
            this.noResult = true
        }
      }
    },
    created () {
        this.key = this.$route.query.key
        this.getSearch()
    },
    mounted () {
    },
    components: {
      'y-shelf': YShelf,
      'mall-goods': mallGoods,
      'y-header': YHeader,
      'y-footer': YFooter,
      'y-button': YButton,
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../assets/style/mixin.scss";
  @import "../../../assets/style/theme.scss";
  .nav {
    height: 60px;
    line-height: 60px;
    > div {
      display: flex;
      align-items: center;
      a {
        padding: 0 15px;
        height: 100%;
        @extend %block-center;
        font-size: 12px;
        color: #999;
        &.active {
          color: #5683EA;
        }
        &:hover {
          color: #5683EA;
        }
      }
      input {
        @include wh(80px, 30px);
        border: 1px solid #ccc;
      }
      input + input {
        margin-left: 10px;
      }
    }
    .price-interval {
      padding: 0 15px;
      @extend %block-center;
      input[type=number] {
        border: 1px solid #ccc;
        text-align: center;
        background: none;
        border-radius: 5px;
      }
    }
  }
  .goods-box {
    > div {
      float: left;
      border: 1px solid #efefef;
    }
  }
  .nav-subs {
    position: relative;
    margin-top: 0px;
    z-index: 20;
    height: 90px;
    background: #f7f7f7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .04);
    .nav-sub-wrappers {
      padding: 20px 0;
      height: 90px;
      position: relative;
    }
    .w {
      display: flex;
      justify-content: space-between;
    }
    .nav-lists {
      height: 28px;
      line-height: 28px;
      display: flex;
      align-items: center;
      height: 100%;
      li:first-child {
        padding-left: 0;
        a {
          padding-left: 10px;
        }
      }
      li {
        position: relative;
        float: left;
        padding-left: 2px;
        list-style: none;
        a {
          display: block;
          // cursor: default;
          padding: 0 10px;
          color: #666;
          &.active {
            font-weight: bold;
          }
        }
        a:hover {
          color: #5683EA;
        }
      }
      li:before {
        content: ' ';
        position: absolute;
        left: 0;
        top: 13px;
        width: 2px;
        height: 2px;
        background: #bdbdbd;
      }
    }
  }
  .no-info {
    padding: 100px 0;
    text-align: center;
    font-size: 30px;
    display: flex;
    flex-direction: column;
    .no-data{
      align-self: center;
    }
  }
  .section {
    padding-top: 8vw;
    margin-bottom: -5vw;
    width: 1218px;
    align-self: center;
  }
  @media (min-width: 1px) {
    .nav-subs .nav-sub-wrappers:after {
      display: block;
    }
  }
  .recommend {
    display: flex;
    > div {
      flex: 1;
      width: 25%;
    }
  }
  .img-item{
    display: flex;
    flex-direction: column;
  }
  .el-pagination{
    align-self: flex-end;
    margin: 3vw 10vw 2vw;
  }
</style>