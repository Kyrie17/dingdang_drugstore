<template>
  <div class="checkout">
    <div class="w" style="padding-top: 40px;">
      <!-- 收货地址 -->
      <y-shelf title="个人信息">
        <div slot="content" class="user">
          <el-form label-width="80px" v-model="user">
            <el-form-item label="用户名称">
                <el-input v-model="user.username"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
                <el-input v-model="user.phone"></el-input>
            </el-form-item>
            <el-form-item label="城市">
                <el-input v-model="user.city"></el-input>
            </el-form-item>
            <el-form-item label="工作">
                <el-input v-model="user.job"></el-input>
            </el-form-item>
            <el-form-item label="身份证">
                <el-input v-model="user.idCard"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">修改</el-button>
                <!-- <el-button>取消</el-button> -->
            </el-form-item>
            </el-form>
        </div>
      </y-shelf>
    </div>
  </div>
</template>


<script>
  import YFooter from '../../common/Footer'
  import YHeader from '../../common/Header'
  import YShelf from '../../common/Shelf'
  import YButton from '../../common/Button'
  import YPopup from '../../common/Popup'

  export default {
    data () {
      return {
        userId: '',
        user: {},
      }
    },
    computed: {
    },
    methods: {
      // 根据token获取用户id
      async getUserId() {
        const { data: res } = await this.$http.get('user/get_user_id', {params: {token: window.sessionStorage.getItem('token')}})
        if (res.status !== 'success') return this.$message.error('请登录')
        this.userId = res.data
        this.getUser()
      },
      async getUser() {
        const { data: res } = await this.$http.get('user/get_user_by_id', {params: {userId: this.userId}})
        if (res.status !== 'success') return this.$message.error('请登录')
        this.user = res.data
      },
      async onSubmit() {
        const { data: res } = await this.$http.post("user/update_user", this.user);
        if (res.status !== "success") {
            return this.$message.error("更新用户失败！");
        }
        this.$message.success('修改成功')
      }
    },
    created () {
      this.getUserId()
    },
    components: {
      YShelf,
      YButton,
      YPopup,
      YHeader,
      YFooter
    }
  }
</script>

<style lang="less" scoped>
.user {
    width: 500px;
    margin-top: 10px;
}
</style>