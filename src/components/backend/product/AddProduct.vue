<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>药品</el-breadcrumb-item>
            <el-breadcrumb-item>添加药品</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <!-- 步骤条 -->
            <el-steps :active="activeStep" align-center space="60%">
                <el-step title="填写药品信息"></el-step>
                <el-step title="填写商品详情"></el-step>
                <el-step title="添加相关商品"></el-step>
            </el-steps>

            <!-- 商品信息表 -->
            <el-form ref="productFormRef" label-width="80px" 
                class="productForm" label-position="right" :model="productForm"
                v-if='showWhichOne == 1 ? true : false' >
                <el-form-item label="商品编号">
                    <el-input v-model="productForm.productSn"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="productForm.name"></el-input>
                </el-form-item>
                <el-form-item label="处方药">
                    <el-switch v-model="productForm.type" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="品牌">
                    <el-select placeholder="请选择品牌" v-model="productForm.brandId">
                        <el-option v-for="(item,index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select placeholder="请选择分类" v-model="productForm.productCatogoryId">
                        <el-option v-for="(item,index) in productCatogoryList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="副标题">
                    <el-input v-model="productForm.subTitle"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="productForm.desscription"></el-input>
                </el-form-item>

                <el-form-item label="封面图片">
                    <el-upload action="http://localhost:8090/product/upload_pic" 
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

                <el-form-item label="价格">
                    <el-input v-model="productForm.price"></el-input>
                </el-form-item>
                <el-form-item label="原价">
                    <el-input v-model="productForm.originalPrice"></el-input>
                </el-form-item>
                <el-form-item label="库存">
                    <el-input v-model="productForm.stock"></el-input>
                </el-form-item>
                <el-form-item label="发布状态">
                    <el-switch v-model="productForm.publishStatus" active-value="true" inactive-value="false"></el-switch>
                </el-form-item>
                <el-form-item label="关键词">
                    <el-input v-model="productForm.keywords"></el-input>
                </el-form-item>

                <el-form-item label="图片组">
                    <el-upload action="http://localhost:8090/product/upload_pic" 
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="handleSuccessPictures"
                        name="pic"
                        :limit="5">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                

                <el-form-item class="btns">
                    <el-button type="primary" @click="nextStepToPage2">提交商品信息，且进入下一步</el-button>
                </el-form-item>
            </el-form>


            <!-- 商品详情表 -->
            <el-form ref="productDetailFormRef" class="productDetailForm" label-width="80px" label-position="right" :model="productDetailForm"
                v-if='showWhichOne == 2 ? true : false' >
                <el-form-item label="通用名称">
                    <el-input v-model="productDetailForm.commonName"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="productDetailForm.productName"></el-input>
                </el-form-item>
                <el-form-item label="成分">
                    <el-input v-model="productDetailForm.ingredients"></el-input>
                </el-form-item>
                <el-form-item label="禁忌">
                    <el-input v-model="productDetailForm.taboo"></el-input>
                </el-form-item>
                <el-form-item label="功能主治">
                    <el-input v-model="productDetailForm.indication"></el-input>
                </el-form-item>
                <el-form-item label="用法用量">
                    <el-input v-model="productDetailForm.dosage"></el-input>
                </el-form-item>
                <el-form-item label="药品性状">
                    <el-input v-model="productDetailForm.properties"></el-input>
                </el-form-item>
                <el-form-item label="包装规格">
                    <el-input v-model="productDetailForm.packingSpecification"></el-input>
                </el-form-item>
                <el-form-item label="不良反应">
                    <el-input v-model="productDetailForm.adverseReactions"></el-input>
                </el-form-item>
                <el-form-item label="贮藏条件">
                    <el-input v-model="productDetailForm.storageCondition"></el-input>
                </el-form-item>
                <el-form-item label="有效期">
                    <el-input v-model="productDetailForm.vaildPeriod"></el-input>
                </el-form-item>
                <el-form-item label="注意事项">
                    <el-input v-model="productDetailForm.percautions"></el-input>
                </el-form-item>
                <el-form-item label="孕妇提醒">
                    <el-input v-model="productDetailForm.pregnantReminder"></el-input>
                </el-form-item>
                <el-form-item label="儿童提醒">
                    <el-input v-model="productDetailForm.youngReminder"></el-input>
                </el-form-item>
                <el-form-item label="老人提醒">
                    <el-input v-model="productDetailForm.oldReminder"></el-input>
                </el-form-item>
                <el-form-item label="相互作用">
                    <el-input v-model="productDetailForm.interaction"></el-input>
                </el-form-item>
                <el-form-item label="批准文号">
                    <el-input v-model="productDetailForm.approvalNumber"></el-input>
                </el-form-item>
                <el-form-item label="生产厂商">
                    <el-input v-model="productDetailForm.manufacturer"></el-input>
                </el-form-item>

                <el-form-item class="btns">
                    <el-button type="primary" @click="nextStepToPage3">提交商品详情，且进入下一步</el-button>
                </el-form-item>
            </el-form>



            <!-- 商品详情表 -->
            <el-form ref="productRelatedFormRef" label-width="80px" 
                class="productRelatedForm" label-position="right" :model="productRelatedForm"
                v-if='showWhichOne == 3 ? true : false' >
                <el-form-item label="通用名称">
                    <el-input v-model="productDetailForm.commonName"></el-input>
                </el-form-item>

                <el-form-item class="btns">
                    <el-button type="primary" @click="nextStepToPage3">下一步</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeStep: 0,
            showWhichOne: 1,
            brandList: [],
            productCatogoryList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            productForm: {
                productSn: '',
                name: '',
                type: '',
                brandId: '',
                productCategoryId: '',
                subTitle: '',
                desscription: '',
                pic: '',
                price: '',
                originalPrice: '',
                stock: '',
                publishStatus: '',
                keywords: '',
                albumPic: ''
            },
            productDetailForm: {
                productId: '',
                commonName: '',
                productName: '',
                ingredients: '',
                taboo: '',
                indication: '',
                dosage: '',
                properties: '',
                packingSpecification: '',
                adverseReations: '',
                storageCondition: '',
                vaildPeriod: '',
                percautions: '',
                pregnantReminder: '',
                youngReminder: '',
                oldReminder: '',
                interaction: '',
                approvalNumber: '',
                manufacturer: ''
            }
        };
    },
    created() {
        this.getBrandList()
        this.getProductCatogoryList()
    }, 
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(response, file, fileList) {
        this.productForm.pic = response.data;
      },
      handleSuccessPictures(response, file, fileList) {
        if (this.productForm.albumPic == null || this.productForm.albumPic.length == 0) {
            this.productForm.albumPic = response.data
        } else {
            this.productForm.albumPic = this.productForm.albumPic + ',' + response.data
        }
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
      async getProductCatogoryList() {
        const { data: res } = await this.$http.get("product_category/get_product_catogory");
        if (res.status !== "success") {
            return this.$message.error("获取商品分类列表失败！");
        }
        this.productCatogoryList = res.data;
      },
      // 第一步到第二步
      async nextStepToPage2() {
        const { data: res } = await this.$http.post("product/add_product", JSON.stringify(this.productForm), {headers: {'Content-Type': 'application/json'}});
        if (res.status !== "success") {
            return this.$message.error("添加商品失败！")
        }
        this.$message.success("添加商品成功！");
        this.productDetailForm.productId = res.data
        this.showWhichOne = 2
        this.activeStep = 1
      },
      // 第二步到第三步
      async nextStepToPage3() {
        const { data: res } = await this.$http.post("product/add_product_detail", JSON.stringify(this.productDetailForm), {headers: {'Content-Type': 'application/json'}});
        if (res.status !== "success") {
            return this.$message.error("添加商品详情失败！")
        }
        this.$message.success("添加商品详情成功！");
        this.showWhichOne = 3
        activeStep = 2
      }
    }
}
</script>

<style lang="less" scoped>
.el-steps {
    margin-bottom: 30px;
}

.productForm, .productRelatedForm, .productDetailForm {
    width: 60%;
    padding-left: 110px;
}

.btns {
  display: flex;
  justify-content: center;
}
</style>