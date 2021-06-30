<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>营销</el-breadcrumb-item>
        <el-breadcrumb-item>药品推荐</el-breadcrumb-item>
        </el-breadcrumb>


        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-select v-model="homeClassifyId" placeholder="请选择">
                        <el-option v-for="item in homeClassifyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-input placeholder="请输入商品id" icon="el-icon-goods" circle></el-input>
                </el-col>
                <el-col :span="4">
                <el-button type="primary" @click="submit">添加</el-button>
                </el-col>
            </el-row>

        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            homeClassifyList: [],
            homeClassifyId: '清热解毒',
            productId: 0,
        }
    },
    methods: {
        async gethomeClassifyList() {
            const { data: res } = await this.$http.get("home/get_home_classify");
            if (res.status !== "success") {
                return this.$message.error("获取首页商品分类列表失败！");
            }
            this.homeClassifyList = res.data;
        },
        submit() {

        }
    },
    created() {
        this.gethomeClassifyList()
    }, 
}
</script>

<style lang="less">

</style>