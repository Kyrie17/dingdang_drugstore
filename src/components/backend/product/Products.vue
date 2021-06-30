<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>药品</el-breadcrumb-item>
            <el-breadcrumb-item>药品列表</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-select v-model="queryInfo.type" placeholder="请选择药品类型">
                        <el-option label="处方药" value="1"></el-option>
                        <el-option label="非处方药" value="0"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select placeholder="请选择分类" v-model="queryInfo.productCategoryId">
                        <el-option v-for="(item,index) in productCategoryList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select placeholder="请选择品牌" v-model="queryInfo.brandId">
                        <el-option v-for="(item,index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-input placeholder="请输入药品名称" v-model="queryInfo.name" clearable @clear="getProductList"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="getProductList">查询</el-button>
                </el-col>
            </el-row>


            <!-- 用户列表区域 -->
            <el-table :data="productList" stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.pic" width="50" height="50"/>
                    </template>
                </el-table-column>
                <el-table-column label="药品名称" prop="name"></el-table-column>
                <el-table-column label="类型" prop="type" :formatter="getType"></el-table-column>
                <el-table-column label="分类" prop="productCategoryName"></el-table-column>
                <el-table-column label="品牌" prop="brandName"></el-table-column>
                <el-table-column label="销量" prop="sale"></el-table-column>
                <el-table-column label="库存" prop="stock" ></el-table-column>
                <el-table-column label="发布状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.publishStatus" @change="(productPublishStatusChanged(scope.row))"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="140px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeProductById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <div class="block">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="5" :total="total"></el-pagination>
            </div>
        </el-card>

        <!-- 修改商品信息的对话框 -->
        <el-dialog title="修改商品信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
        <el-form ref="editFormRef" :model="editForm" label-width="70px">
            <el-form-item label="名称" prop="name">
                <el-input v-model="editForm.name" name="name"></el-input>
            </el-form-item>
            <el-form-item label="副标题" prop="subTitle">
                <el-input v-model="editForm.subTitle" name="subTitle"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input v-model="editForm.description" name="description"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="editForm.price" name="price"></el-input>
            </el-form-item>
            <el-form-item label="原价" prop="originalPrice">
                <el-input v-model="editForm.originalPrice" name="originalPrice"></el-input>
            </el-form-item>
            <el-form-item label="库存" prop="stock">
                <el-input v-model="editForm.stock" name="stock"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editProductInfo">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            productList: [],
            // 获取用户列表的参数对象
            queryInfo: {
                type: '',
                brandId: '',
                productCategoryId: '',
                name: '',
                pageNum: 1
            },
            total: 0,
            productCategoryList: [],
            brandList: [],
            // 查询到的商品信息对象
            editForm: {},
            // 控制修改商品信息对话框的显示与隐藏
            editDialogVisible: false,
        }
    },
    created() {
        this.queryInfo.type = null
        this.queryInfo.brandId = null
        this.queryInfo.productCategoryId = null
        this.queryInfo.name = null
        this.getProductList()
        this.getBrandList()
        this.getProductCategoryList()
    }, 
    methods: {
        getType(row, column) {
            return row.type == 1 ? '处方药' : '非处方药'
        },
        // 异步获取商品列表
        async getProductList() {
            const { data: res } = await this.$http.get("product/get_product", {
                params: this.queryInfo,
            });
            if (res.status !== "success") {
                return this.$message.error("获取药品列表失败！");
            }
            this.productList = res.data.list;
            this.total = res.data.total;
        },
        // 监听页码值的改变
        handleCurrentChange(newPage) {
            this.queryInfo.pageNum = newPage
            this.getProductList()
        },
        // 改变产品发布状态
        async productPublishStatusChanged(productInfo) {
            var params = new URLSearchParams()
            params.append('productId', productInfo.id);
            params.append('productPublishStatus', productInfo.publishStatus);
            const {data: res} = await this.$http.post('product/update_product_status', params)
            if (res.status !== "success") {
                productInfo.status = !productInfo.status
                return this.$message.error("更新商品状态失败！");
            }
            this.$message.success('更新商品状态成功！')
        },
        // 获取品牌列表
        async getBrandList() {
            const { data: res } = await this.$http.get("brand/get_brand");
            if (res.status !== "success") {
                return this.$message.error("获取品牌列表失败！");
            }
            this.brandList = res.data;
        },
        // 获取药品分类列表
        async getProductCategoryList() {
            const { data: res } = await this.$http.get("product_category/get_product_category");
            if (res.status !== "success") {
                return this.$message.error("获取商品分类列表失败！");
            }
            this.productCategoryList = res.data;
        },
        // 展示编辑用户信息的对话框
        async showEditDialog(id) {
            const { data: res } = await this.$http.get('product/get_product_by_id', {params: {productId: id}})
            if (res.status !== "success") {
                return this.$message.error("查询商品信息失败！");
            }
            this.editForm = res.data
            this.editDialogVisible = true;
        },
        // 监听修改用户信息对话框的关闭事件
        editDialogClosed() {
            this.$refs.editFormRef.resetFields();
        },
        // 删除商品
        async removeProductById(id) {
            // 弹框询问用户是否删除
            const confirmResult = await this.$confirm('此操作将永久删除该药品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)

            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除')
            }
            var params = new URLSearchParams()
            params.append('productId', id);
            const { data: res } = await this.$http.post('product/delete_product_by_id', params)
            if (res.status !== "success") {
                return this.$message.error("删除药品失败！");
            }
            this.$message.success("删除药品成功！");
            this.getUserList()
        },
        async editProductInfo() {
                // 发起修改商品信息的请求
                const { data: res } = await this.$http.post('product/update_product', JSON.stringify(this.editForm), {headers: {'Content-Type': 'application/json'}})
                if (res.status !== "success") {
                return this.$message.error("更新药品信息失败！");
            }

            // 关闭对话框
            this.editDialogVisible = false
            // 刷新数据列表
            this.getProductList()
            // 提示修改成功
            this.$message.success('更新药品信息成功！')
        }
    }
}
</script>

<style lang="less" scoped>

</style>