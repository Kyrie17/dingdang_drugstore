<template>
  <div>
    <y-shelf title="我的订单">
      <div slot="content">
        <el-table :data="orderList" stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="orderSn" width="180px"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="总金额" prop="totalAmount"></el-table-column>
        <el-table-column label="付款金额" prop="payAmount"></el-table-column>
        <el-table-column label="订单状态" prop="status" :formatter="getStatus"></el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <!-- 查看按钮 -->
            <el-button type="primary" icon="el-icon-more" size="mini" @click="viewMore(scope.row.id, scope.row.status)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="5" :total="total"></el-pagination>
      </div>
      </div>
    </y-shelf>

    <!-- 展示订单详情的对话框 -->
    <el-dialog title="订单详情" :visible.sync="editDialogVisible" width="70%" @close="editDialogClosed">
      <el-table :data="itemList" stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
              <img :src="scope.row.productPic" width="50" height="50"/>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="productName"></el-table-column>
        <el-table-column label="商品品牌" prop="productBrand"></el-table-column>
        <el-table-column label="商品单价" prop="productPrice"></el-table-column>
        <el-table-column label="商品数量" prop="productQuantity"></el-table-column>
        <el-table-column label="商品总价" prop="realAmount"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" >
            <el-button type="primary" v-if="orderStatus === 1" @click="commentDialog(scope.row.productId)">确认收货</el-button>
            <el-button type="primary" v-if="orderStatus === 2" @click="commentDialog(scope.row.productId)">评价</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <!-- 订单评论的对话框 -->
    <el-dialog title="评价" :visible.sync="commentDialogVisible" width="50%" @close="commentDialogClosed">
      <el-form :model="commentForm" label-width="70px">
        <el-form-item label="商品评价">
          <el-rate v-model="commentForm.star"></el-rate>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="commentForm.comment" name="phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="commentDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="uploadComment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import YShelf from '../../common/Shelf'
  export default {
    data () {
      return {
        orderList: [],
        userId: '',
        loading: false,
         // 获取用户列表的参数对象
        queryInfo: {
          pageNum: 1,
        },
        total: 0,
        // 控制订单详情的显示与隐藏
        editDialogVisible: false,
        // 订单详情
        itemList: {},
        // 订单编号
        orderId: 0,
        // 订单状态
        orderStatus: 0,
        // 控制订单评价的显示与隐藏
        commentDialogVisible: false,
        commentForm: {},
      }
    },
    methods: {
      getStatus(row, column) {
        if (row.status === 0) {
          return '未付款'
        } else if (row.status === 1) {
          return '已付款'
        } else if (row.status === 2) {
          return '已完成'
        } else if (row.status === 3) {
          return '已关闭'
        } else if (row.status === 4) {
          return '无效订单'
        }
      },
      // 根据token获取用户id
      async getUserId() {
        const { data: res } = await this.$http.get('user/get_user_id', {params: {token: window.sessionStorage.getItem('token')}})
        if (res.status !== 'success') return this.$message.error('请登录')
        this.userId = res.data
        this.getOrderList()
      },
      async getOrderList() {
        const { data: res } = await this.$http.get('order/get_order_by_userid', {params: {userId: this.userId, pageNum: this.queryInfo.pageNum}})
        if (res.status !== 'success') return this.$message.error('获取订单信息失败')
        this.orderList = res.data.list
        this.getGoodList(this.orderList);
      },
      async getGoodList(orderList) {
        for (var i = 0; i < orderList.length; i++) {
          var id = orderList[i].id;
          const { data: res } = await this.$http.get('order/get_order_item', {params: {orderId: id}})
          if (res.status !== 'success') return this.$message.error('获取订单商品失败')
          orderList[i].goodsList = res.data
        }
      },
      // 监听页码值的改变
      handleCurrentChange(newPage) {
        this.queryInfo.pageNum = newPage
        this.getUserList()
      },
      handleSizeChange (val) {
        this.pageSize = val
        this._orderList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this._orderList()
      },
      orderDetail (orderId) {
        this.$router.push({
          path: 'orderDetail',
          query: {
            orderId: orderId
          }
        })
      },
      getOrderStatus (status) {
        if (status === '0') {
          return '未付款'
        } else if (status === '1') {
          return '已付款'
        } else if (status === '2') {
          return '已完成'
        } else if (status === '3') {
          return '已关闭'
        } else if (status === '4') {
          return '无效订单'
        }
      },
      // 查看订单详情
      async viewMore(id, status) {
        this.orderId = id
        this.orderStatus = status
        const { data: res } = await this.$http.get('order/get_order_item', {params: {orderId: id}})
        if (res.status !== "success") {
          return this.$message.error("查询订单详情失败！");
        }
        this.itemList = res.data
        this.editDialogVisible = true;
      },
      editDialogClosed() {
        this.editDialogVisible = false
      },
      commentDialog(id) {
        this.commentForm.orderId = this.orderId
        this.commentForm.productId = id
        this.commentForm.userId = this.userId
        this.commentDialogVisible = true;
      },
      commentDialogClosed() {
        this.commentDialogVisible = false
      },
      async uploadComment() {
        const { data: res } = await this.$http.post('comment/add_comment', this.commentForm)
        if (res.status !== "success") {
          return this.$message.error("添加订单失败！")
        }
        this.commentDialogVisible = false
        this.$message.success("添加订单成功")
      },
      async nextToComment(productId) {
        if (this.orderStatus === 2) {
          const { data: res } = await this.$http.get('comment/has_comment', {params: {productId: productId, orderId: this.orderId}})
          if (res.status !== "success") {
            return this.$message.error("获取评论信息失败！")
          }
          alert(res.data)
          return res.data
        }
        return false
      },
      // async isComment(productId) {
      //   const { data: res } = await this.$http.get('comment/has_comment', {params: {productId: productId}, orderId: this.orderId})
      //   if (res.status !== "success") {
      //     return this.$message.error("获取评论信息失败！")
      //   }
      //   return res.data
      // }
    },
    created () {
      this.getUserId()
    },
    components: {
      YShelf
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../../assets/style/mixin";
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 112px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }
  .bt {
    border-top: 1px solid #EFEFEF;
  }
  .date {
    padding-left: 0px;
  }
  .order-id {
    margin-left: 25px;
  }
  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 44px 0 24px;
    overflow: hidden;
    width: auto;
    &:hover {
      .del-order {
        display: block;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
        float: left;
      }
      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(80px);
      }
      .cart-l-r {
        padding: 0 50px 0 48px;
        display: flex;
        > div {
          text-align: center;
          width: 112px;
        }
        .type {
          padding: 0 0 0 10px ;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      width: 230px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }
  .c {
      width: 710px;
      float: left;
  }
  .prod-operation {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 265px;
    float: right;
    div {
      width: 100%;
      text-align: center;
    }
    div:last-child {
      padding-right: 24px;
    }
  }


</style>