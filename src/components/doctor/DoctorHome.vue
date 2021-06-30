<template>
    <div>
        <!-- <y-header>
            <div slot="nav"></div>
        </y-header> -->

        <!-- 卡片视图 -->
        <el-card class="box-card">
            <el-table :data="ordonnanceList" stripe>
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column label="用户姓名" prop="userName"></el-table-column>
                <el-table-column label="商品编号" prop="productSn"></el-table-column>
                <el-table-column label="商品名称" prop="productName"></el-table-column>
                <el-table-column label="疾病" prop="disease"></el-table-column>
                <el-table-column label="图片" :formatter="a">
                    <template slot-scope="scope">
                        <img :src="scope.row.ordonnance" width="50" height="50"/>
                    </template>
                </el-table-column>
                <el-table-column label="审核状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.status" @change="(statusChanged(scope.row))"></el-switch>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <div class="block">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="5" :total="total"></el-pagination>
            </div>
        </el-card>
        <!-- <y-footer></y-footer> -->
    </div>
</template>

<script>
import YHeader from '../frontend/common/Header'
import YFooter from '../frontend/common/Footer'
export default {
    data () {
      return {
        ordonnanceList: [],
        pageNum: 1, // 购物车中商品的数量
        total: 0,
      }
    },
    methods: {
        a(row, column) {
            alert(row.ordonnance)
        },
        async getOrdonnance() {
            const { data: res } = await this.$http.get("ordonnance/get_ordonnance", {params: {pageNum: this.pageNum}});
            if (res.status !== "success") {
                return this.$message.error("获取购物车商品失败！");
            }
            this.ordonnanceList = res.data.list
            this.total = res.data.total
        },
            // 监听页码值的改变
        handleCurrentChange(newPage) {
        this.pageNum = newPage
        this.getOrdonnance()
        },
        async statusChanged(ordonnanceInfo) {
            var params = new URLSearchParams()
            params.append('ordonnanceId', ordonnanceInfo.id);
            params.append('status', ordonnanceInfo.status);
            const {data: res} = await this.$http.post('ordonnance/update_ordonnance_status', params)
            if (res.status !== "success") {
                ordonnanceInfo.status = !ordonnanceInfo.status
                return this.$message.error("审核失败！");
            }
            this.$message.success('审核成功！')
        }

    },
    created() {
        this.getOrdonnance()
    }, 
    components: {
      'y-header': YHeader,
      'y-footer': YFooter,
    }
}
</script>