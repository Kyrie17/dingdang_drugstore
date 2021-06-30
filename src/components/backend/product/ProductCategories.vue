<template>
    <div>
         <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>药品</el-breadcrumb-item>
            <el-breadcrumb-item>药品分类</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <el-button type="primary" @click="addProductCategory">添加药品分类</el-button>

            <!-- 用户列表区域 -->
            <el-table :data="productCategoryList" stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="分类名称" prop="name"></el-table-column>
                <el-table-column label="展示状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.showStatus" @change="(productCategoryStatusChanged(scope.row))"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="140px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeProductCategoryById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <div class="block">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="5" :total="total"></el-pagination>
            </div>
        </el-card>


        <!-- 修改商品分类信息的对话框 -->
        <el-dialog title="修改商品分类信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
        <el-form ref="editFormRef" :model="editForm" label-width="70px">
            <el-form-item label="名称" prop="name">
                <el-input v-model="editForm.name" name="name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editProductCategoryInfo">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            productCategoryList: [],
            pageNum: 1,
            total: 0,
            // 查询到的商品分类信息对象
            editForm: {},
            // 控制修改商品分类信息对话框的显示与隐藏
            editDialogVisible: false,
        }
    },
    created() {
        this.getProductCategoryList()
    }, 
    methods: {
        // 异步获取商品列表
        async getProductCategoryList() {
            const { data: res } = await this.$http.get("product_category/get_product_category_list", {
                params: {pageNum: this.pageNum},
            });
            if (res.status !== "success") {
                return this.$message.error("获取药品分类列表失败！");
            }
            this.productCategoryList = res.data.list;
            this.total = res.data.total;
        },
        // 监听页码值的改变
        handleCurrentChange(newPage) {
            this.pageNum = newPage
            this.getProductCategoryList()
        },
        // 改变展示状态
        async productCategoryStatusChanged(productCategoryInfo) {
            var params = new URLSearchParams()
            params.append('productCategoryId', productCategoryInfo.id);
            params.append('productCategoryStatus', productCategoryInfo.showStatus);
            const {data: res} = await this.$http.post('product_category/update_product_category_status', params)
            if (res.status !== "success") {
                productInfo.status = !productInfo.status
                return this.$message.error("更新商品状态失败！");
            }
            this.$message.success('更新商品状态成功！')
        },
        // 删除商品分类
        async removeProductCategoryById(id) {
            // 弹框询问用户是否删除
            const confirmResult = await this.$confirm('此操作将永久删除该药品分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)

            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除')
            }
            var params = new URLSearchParams()
            params.append('productCategoryId', id);
            const { data: res } = await this.$http.post('product_category/delete_product_category_by_id', params)
            if (res.status !== "success") {
                return this.$message.error("删除药品分类失败！");
            }
            this.$message.success("删除药品分类成功！");
            this.getProductCategoryList()
        },
        // 展示编辑用户信息的对话框
        async showEditDialog(id) {
            const { data: res } = await this.$http.get('product_category/get_product_category_by_id', {params: {productCategoryId: id}})
            if (res.status !== "success") {
                return this.$message.error("查询商品分类信息失败！");
            }
            this.editForm = res.data
            this.editDialogVisible = true;
        },
        // 监听修改用户信息对话框的关闭事件
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        // 修改商品分类信息
        async editProductCategoryInfo() {
                // 发起修改商品分类信息的请求
                const { data: res } = await this.$http.post('product_category/update_product_category', JSON.stringify(this.editForm), {headers: {'Content-Type': 'application/json'}})
                if (res.status !== "success") {
                return this.$message.error("更新药品信息失败！");
            }

            // 关闭对话框
            this.editDialogVisible = false
            // 刷新数据列表
            this.getProductCategoryList()
            // 提示修改成功
            this.$message.success('更新药品信息成功！')
        },
        addProductCategory() {
            
        }
    }
}
</script>

<style lang="less" scoped>

</style>