<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限</el-breadcrumb-item>
      <el-breadcrumb-item>坐诊医生列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input placeholder="请输入医生姓名" prefix-icon="el-icon-s-order" v-model="queryInfo.doctorName" clearable @clear="getDoctorList"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getDoctorList">查询</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="doctorList" stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="医生姓名" prop="name"></el-table-column>
        <el-table-column label="描述" prop="des"></el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="5" :total="total"></el-pagination>
      </div>
    </el-card>

    <!-- 修改用户信息的对话框 -->
    <!-- <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" name="username"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="editForm.phone" name="phone"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idCard">
          <el-input v-model="editForm.idCard" name="idCard"></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="integration">
          <el-input v-model="editForm.integration" name="integration"></el-input>
        </el-form-item>
        <el-form-item label="历史积分" prop="historyIntegration" label-width="80px">
          <el-input v-model="editForm.historyIntegration" name="historyIntegration"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    // 校验手机号的规则
        // 自定义手机号规则
    // var checkPhone = (rule, value, callback) => {
    //   const regPhone = /^1[34578]\d{9}$/
    //   if (regPhone.test(value)) {
    //     return callback()
    //   }
    //   // 返回一个错误提示
    //   callback(new Error('请输入合法的手机号码'))
    // }


    // // 校验身份证号的规则
    // var checkIdCard = (rule, value, callback) => {
    //   const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    //   if (regIdCard.test(value)) {
    //     return callback()
    //   }
    //   callback(new Error('请输入合法的身份证号'))
    // }

    // // 校验积分的规则
    // var checkIntegration = (rule, value, callback) => {
    //   const regIntegration = /^[+]{0,1}(\d+)$/
    //   if (regIntegration.test(value)) {
    //     return callback()
    //   }
    //   callback(new Error('请输入合法的积分值'))
    // }

    return {
      // 获取用户列表的参数对象
      queryInfo: {
        doctorName: '',
        pageNum: 1,
      },
      doctorList: [],
      total: 0,
      // 控制修改用户信息对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      editForm: {},
      // 修改表单的验证规则对象
      // editFormRules: {
      //   phone: [
      //     { required: true, message: '请输入用户手机号码', trigger: 'blur' },
      //     { validator: checkPhone, trigger: 'blur' }
      //   ], 
      //   idCard: [
      //     { required: true, message: '请输入用户身份证号码', trigger: 'blur' },
      //     { validator: checkIdCard, trigger: 'blur' }
      //   ], 
      //   integration: [
      //     { required: true, message: '请输入用户积分', trigger: 'blur' },
      //     { validator: checkIntegration, trigger: 'blur' }
      //   ], 
      //   historyIntegration: [
      //     { required: true, message: '请输入用户历史积分', trigger: 'blur' },
      //     { validator: checkIntegration, trigger: 'blur' }
      //   ]
      // },
      // a: {
      //   "city": "广州",
      //   "gender": 1,
      //   "historyIntegration": 100,
      //   "icon": "",
      //   "id": 2,
      //   "idCard": "445221199810065957",
      //   "integration": 100,
      //   "job": "程序员",
      //   "password": "4QrcOUm6Wau+VuBX8g+IPg==",
      //   "phone": "13500000001",
      //   "status": false,
      //   "username": "张三"
      // }
    };
  },
  created() {
    this.queryInfo.doctorName = null
    this.getDoctorList();
  }, 
  methods: {
    // 异步获取用户列表
    async getDoctorList() {
      const { data: res } = await this.$http.get("doctor/get_doctor", {
        params: this.queryInfo,
      });
      if (res.status !== "success") {
        return this.$message.error("获取医生列表失败！");
      }
      this.doctorList = res.data.list;
      this.total = res.data.total;
    },
    // 监听页码值的改变
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getOrderList()
    },
    // 展示编辑用户信息的对话框
    async showEditDialog(id) {
        const { data: res } = await this.$http.get('user/get_user_by_id', {params: {userId: id}})
        if (res.status !== "success") {
          return this.$message.error("查询医生信息失败！");
        }
        this.editForm = res.data
        this.editDialogVisible = true;
    },
    // 监听修改用户信息对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并提交
    // editUserInfo() {
    //   this.$refs.editFormRef.validate(async valid => {
    //     if (!valid) return
    //     // 发起修改用户信息的请求
    //     const { data: res } = await this.$http.post('user/update_user', JSON.stringify(this.editForm), {headers: {'Content-Type': 'application/json'}})
    //     if (res.status !== "success") {
    //       return this.$message.error("修改用户信息失败！");
    //     }

    //     // 关闭对话框
    //     this.editDialogVisible = false
    //     // 刷新数据列表
    //     this.getUserList()
    //     // 提示修改成功
    //     this.$message.success('更新用户信息成功！')
    //   })
    // }, 
    // 根据id删除用户
    // async removeUserById(id) {
    //   // 弹框询问用户是否删除
    //   const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).catch(err => err)

    //   if (confirmResult !== 'confirm') {
    //     return this.$message.info('已取消删除')
    //   }
    //   var params = new URLSearchParams()
    //   params.append('userId', id);
    //   const { data: res } = await this.$http.post('user/delete_user_by_id', params)
    //   if (res.status !== "success") {
    //     return this.$message.error("删除用户失败！");
    //   }
    //   this.$message.success("删除用户成功！");
    //   this.getUserList()
    // }
  },
};
</script>

<style lang="less" scoped>
</style>