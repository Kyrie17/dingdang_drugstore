<!--商品详情-->
<template>
  
  <div class="main">
      <y-header>
          <div slot="nav"></div>
      </y-header>
      <div class="w store-content">
        <div class="gray-box">
        <div class="gallery-wrapper">
            <div class="gallery">
            <div class="thumbnail">
                <ul>
                  <li v-for="(item,i) in small" :key="i" :class="{on:big===item}" @click="big=item">
                      <img :src="item" :alt="product.productName">
                  </li>
                </ul>
            </div>
            <div class="thumb">
                <div class="big">
                <img :src="big" :alt="product.productName">
                </div>
            </div>
            </div>
        </div>
        <!--右边-->
        <div class="banner">
            <div class="sku-custom-title">
            <h4>{{product.name}}</h4>
            <h6>
                <span>{{product.subTitle}}</span>
                <span class="price">
                <em>¥</em><i>{{product.price}}</i></span>
            </h6>
            </div>
            <div class="num">
              <span class="params-name">数量</span>
              <buy-num @edit-num="editNum" :limit="Number(product.limitNum)"></buy-num>
            </div>
            <div class="buy" v-if="showBuy">
              <y-button text="加入购物车" @btnClick="addCart" classStyle="main-btn" style="width: 145px;height: 50px;line-height: 48px"></y-button>
              <!-- <y-button text="现在购买" @btnClick="checkout()" style="width: 145px;height: 50px;line-height: 48px;margin-left: 10px"></y-button> -->
            </div>
            <div class="buy" v-if="!showBuy">
              <y-button text="提交处方单" @btnClick="showEditDialog" classStyle="main-btn" style="width: 145px;height: 50px;line-height: 48px"></y-button>
              <y-button text="刷新处方单审核状态" @btnClick="checkBuy" style="width: 145px;height: 50px;line-height: 48px;margin-left: 10px"></y-button>
            </div>
        </div>
        </div>
        <!--产品信息-->
        <div class="item-info">
        <y-shelf>
            <div slot="content" class="content">
              <div class="recommend">
              <div class="goods-box w">
                <mall-goods v-for="(item,i) in recommendGoods" :key="i" :msg="item"></mall-goods>
              </div>
              </div>
              <div class="img-item" v-if="productMsg">
                  <el-tabs type="border-card" @tab-click="handleClick" v-model="editableTabsValue">
                    <el-tab-pane label="说明书" name="first">
                        <table class="productDetail">
                          <tr><th class="th1">商品编号</th><th class="th2">{{productDetail.productSn}}</th></tr>
                          <tr><th class="th1">常见名称</th><th class="th2">{{productDetail.commonName}}</th></tr>
                          <tr><th class="th1">药品名称</th><th class="th2">{{productDetail.productName}}</th></tr>
                          <tr><th class="th1">成分</th><th class="th2">{{productDetail.ingredients}}</th></tr>
                          <tr><th class="th1">禁忌</th><th class="th2">{{productDetail.taboo}}</th></tr>
                          <tr><th class="th1">功能主治</th><th class="th2">{{productDetail.indication}}</th></tr>
                          <tr><th class="th1">用法用量</th><th class="th2">{{productDetail.dosage}}</th></tr>
                          <tr><th class="th1">药品性状</th><th class="th2">{{productDetail.properties}}</th></tr>
                          <tr><th class="th1">包装规格</th><th class="th2">{{productDetail.packingSpecification}}</th></tr>
                          <tr><th class="th1">不良反应</th><th class="th2">{{productDetail.adverseReations}}</th></tr>
                          <tr><th class="th1">贮藏条件</th><th class="th2">{{productDetail.storageCondition}}</th></tr>
                          <tr><th class="th1">有效期</th><th class="th2">{{productDetail.vaildPeriod}}</th></tr>
                          <tr><th class="th1">注意事项</th><th class="th2">{{productDetail.percautions}}</th></tr>
                          <tr><th class="th1">孕妇提醒</th><th class="th2">{{productDetail.pregnantReminder}}</th></tr>
                          <tr><th class="th1">儿童提醒</th><th class="th2">{{productDetail.youngReminder}}</th></tr>
                          <tr><th class="th1">老人提醒</th><th class="th2">{{productDetail.oldReminder}}</th></tr>
                          <tr><th class="th1">互相作用</th><th class="th2">{{productDetail.interaction}}</th></tr>
                          <tr><th class="th1">批准文号</th><th class="th2">{{productDetail.approvalNumber}}</th></tr>
                          <tr><th class="th1">生产厂商</th><th class="th2">{{productDetail.manufacturer}}</th></tr>
                        </table>
                    </el-tab-pane>
                    <el-tab-pane label="评价" name="second">
                      <el-container v-for="(item) in commentList" :key="item.label" class="boder-bootm">
                        <el-aside width="200px">
                          <div class="user-img">
                            <img src="/static/images/headpic.png">
                          </div>
                          <span class='item-username'>{{ item.userName }}</span>
                        </el-aside>
                        <el-main>
                          <p>
                            <el-rate v-model="item.star" :colors="colors" disabled="false"></el-rate>
                          </p>
                          <p class="comment">{{ item.comment }}</p>
                          <p class='text-right'>{{ item.date }}</p>
                        </el-main>
                      </el-container>
                      
                      <!-- 分页区域 -->
                      <div class="block">
                        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="5" :total="total"></el-pagination>
                      </div>

                      
                    </el-tab-pane>
                  </el-tabs>
              </div>
            </div>
        </y-shelf>
        </div>
        <!-- 提交处方单的对话框 -->
        <el-dialog title="提交处方单" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
          <el-form label-width="70px">
            <el-form-item label="疾病">
              <el-input v-model="editForm.disease" name="disease"></el-input>
            </el-form-item>
            <el-form-item label="处方单">
            <el-upload
              action="http://localhost:8090/ordonnance/upload_pic"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              name="pic"
              :limit="1">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addOrdonnance">确 定</el-button>
          </span>
        </el-dialog>
    </div>
    <y-footer></y-footer>
  </div>
</template>
<script>
  import YFooter from '../common/Footer'
  import YHeader from '../common/Header'
  import YShelf from '../common/Shelf'
  import BuyNum from '../common/BuyNum'
  import YButton from '../common/Button'
  import mallGoods from '../common/MallGoods'
  export default {
    data () {
      return {
        productId: 0,
        showBuy: false, // 是否显示加入购物车/立即购买的按钮
        productMsg: {},
        small: [], // 5个附图
        big: "", // 主图
        product: {}, // 当前详情页显示的商品
        productNum: 1, // 选择商品的数量
        userId: '', // 用户的id
        activeName: 'second',
        productDetail: {},
        commentList: [],
        pageNum: 1,
        total: 0,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
        editableTabsValue: "first",
        // 控制修改用户信息对话框的显示与隐藏
        editDialogVisible: false,
        // 查询到的用户信息对象
        editForm: {},
        dialogVisible: false,
        dialogImageUrl: '',
        recommendGoods: [] // 推荐商品
      }
    },

    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      // 根据token获取用户id
      async getUserId() {
        const { data: res } = await this.$http.get('user/get_user_id', {params: {token: window.sessionStorage.getItem('token')}})
        if (res.status !== 'success') return this.$message.error('请登录')
        this.userId = res.data
      },
      showEditDialog() {
        this.editDialogVisible = true;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(response, file, fileList) {
        this.editForm.ordonnance = response.data;
      },
      async checkBuy() {
        const { data: res } = await this.$http.get("ordonnance/check_buy", {params: {userId: this.userId,productId: this.productId}})
        if (res.status !== "success") {
          return this.$message.error("操作失败！");
        }
        if (res.data == false) {
          return this.$message.error("请耐心等待审核！");
        }
        this.showBuy = true
      },
      // 获取商品信息
      async getProductInfo (id) {
        const { data: res } = await this.$http.get("product/get_product_by_id", {params: {productId: id}})
        if (res.status !== "success") {
          return this.$message.error("获取商品信息失败！");
        }
        this.product = res.data
        this.showBuy = res.data.type === 1? false: true;
        var pics = res.data.albumPics.split(",")
        for (var i = 0; i < pics.length; i++) {
          this.small.push(pics[i])
        }
        this.big = this.small[0]
      },
      // 获取商品详情
      async getProductDetail(id) {
        const { data: res } = await this.$http.get("product/get_product_detail", {params: {productId: id}})
        if (res.status !== "success") {
          return this.$message.error("获取商品详情失败！");
        }
        this.productDetail = res.data
      },
      // 获取商品评论
      async getProductComment(id) {
        const { data: res } = await this.$http.get("comment/get_comment", {params: {productId: id, pageNum: this.pageNum}})
        if (res.status !== "success") {
          return this.$message.error("获取商品评论失败！");
        }
        this.commentList = res.data.list
        this.total = res.data.total
      },
      async addCart () {
        console.log(this.product)
        var params = new URLSearchParams()
        params.append('productId', this.product.id);
        params.append('memberId', this.userId);
        params.append('quantity', this.productNum);
        params.append('price', this.product.price);
        params.append('productPic', this.product.pic);
        params.append('productName', this.product.name);
        params.append('productBrand', this.product.brandName);
        params.append('productSubTitle', this.product.subTitle);
        params.append('productCategoryId', this.product.productCategoryId);
        const { data: res } = await this.$http.post('cart/add_item', params)
        if (res.status !== 'success') return this.$message.error('加入购物车失败')
        return this.$message.success('加入购物车成功')
      },
      async addOrdonnance () {
        console.log(this.editForm)
        var params = new URLSearchParams()
        params.append('userId', this.userId);
        params.append('productId', this.productId);
        params.append('disease', this.editForm.disease);
        params.append('ordonnance', this.editForm.ordonnance);
        const { data: res } = await this.$http.post('ordonnance/add_ordonnance', params)
        if (res.status !== 'success') return this.$message.error('上传处方单失败')
        this.editDialogVisible = false
        return this.$message.success('上传处方单成功')
      },
      editNum (num) {
        this.productNum = num
      },
      // 监听页码值的改变
      handleCurrentChange(newPage) {
        this.pageNum = newPage
        this.getProductComment(id)
      },
    },
    components: {
      'y-footer': YFooter,
      'y-header': YHeader,
      'y-shelf': YShelf,
      'buy-num': BuyNum,
      'y-button': YButton,
      'mall-goods': mallGoods,
    },
    created () {
      let id = this.$route.query.productId
      this.productId = id
      this.getProductInfo(id)
      this.getProductDetail(id)
      this.getProductComment(id)
      this.getUserId()
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
  .main {
    min-height: calc(100vh - 454px);
    background: #ededed;
    overflow: hidden;
    width: 100%;
  }
  .w {
    width: 1220px;
    margin: 0 auto;
  }
  .store-content {
    clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
  }
  .gray-box {
    display: flex;
    padding: 60px;
    margin: 20px 0;
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0,0,0,.14);
    box-shadow: 0 3px 8px -6px rgb(0 0 0 / 10%);
    .gallery-wrapper {
      .gallery {
        display: flex;
        width: 540px;
        .thumbnail {
          li:first-child {
            margin-top: 0px;
          }
          li {
            @include wh(80px);
            margin-top: 10px;
            padding: 12px;
            border: 1px solid #f0f0f0;
            border: 1px solid rgba(0, 0, 0, .06);
            border-radius: 5px;
            list-style-type: none;
            cursor: pointer;
            &.on {
              padding: 10px;
              border: 3px solid #ccc;
              border: 3px solid rgba(0, 0, 0, .2);
            }
            img {
              display: block;
              @include wh(100%);
            }
          }
        }
        .thumb {
          .big {
            margin-left: 20px;
          }
          img {
            display: block;
            @include wh(440px)
          }
        }
      }
    }
    // 右边
    .banner {
      width: 450px;
      margin-left: 10px;
      h4 {
        font-size: 24px;
        line-height: 1.25;
        color: #000;
        margin-bottom: 13px;
      }
      h6 {
        font-size: 14px;
        line-height: 1.5;
        color: #bdbdbd;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .sku-custom-title {
        overflow: hidden;
        padding: 8px 8px 18px 10px;
        position: relative;
      }
      .params-name {
        padding-right: 20px;
        font-size: 14px;
        color: #8d8d8d;
        line-height: 36px;
      }
      .num {
        padding: 29px 0 8px 10px;
        border-top: 1px solid #ebebeb;
        display: flex;
        align-items: center;
      }
      .buy {
        position: relative;
        border-top: 1px solid #ebebeb;
        padding: 30px 0 0 10px;
      }
    }
  }
  .item-info {
    height: 850px;
    .gray-box {
      padding: 0;
      display: block;
    }
    .img-item {
      width: 940px;
      text-align: center;
      float: left;
    }
  .recommend {
    width: 278px;
    float: left;
  }
  }

  .no-info {
    padding: 200px 0;
    text-align: center;
    font-size: 30px;
  }
  .price {
    display: block;
    color: #d44d44;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    i {
      padding-left: 2px;
      font-size: 24px;
    }
  }
  .productDetail {
    font-family: verdana,arial,sans-serif;
    font-size:15px;
    color:#333333;
    border-style: solid;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
    width: 900px;

  }
  .productDetail .th1 {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
    width: 100px;
  }
  .productDetail .th2 {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
    text-align: left;
    width: 800px;
  }
  .user-img {
    float: left;
    height: 50px;
    width: 50px;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .boder-bootm{
    border-bottom: solid;
    border-bottom-color: rgb(248, 237, 237);
    border-bottom-width: 3px;
    margin-bottom: 5px;
  }
  .text-right{
    text-align: right;
  }
  .item-username{
    margin-left: -80px;
    padding-top: 80px;
    line-height: 60px;
  }
  .comment {
    text-align: left;
  }
  .content {
    height: 100%;
  }
</style>