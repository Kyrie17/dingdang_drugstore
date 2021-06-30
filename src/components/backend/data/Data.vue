<template>
    <div id="statistics" class="statistics"></div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      mon: [],
      cou: [],
      amount: [],
      max: 10,
    }
  },
  mounted(){
    this.getCount()
    
  },
  created() {
    
  }, 
  methods: {
    async getCount() {
        const { data: res } = await this.$http.get("order/count");
        if (res.status !== "success") {
            return this.$message.error("获取统计数据失败");
        }
        let list = res.data
        for (var i = 0; i < list.length; i++) {
            this.mon.push(list[i].mon)
            this.cou.push(list[i].cou)
            this.amount.push(list[i].amount)
        }
        this.getMax()
        this.drawLine()
    },
    getMax() {
        var res = this.cou;
        var max = 10;
        for (var i = 0; i < res.length; i++) {
            if (res[i] > max) {
                max = res[i]
            }
        }
        this.max =  max + 10;
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('statistics'))
        // 绘制图表
        let cou = this.cou
        myChart.setOption({
            title: { text: '' },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#283b56'
                    }
                }
            },
            legend: {
                data:['订单数量', '成交金额']
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            dataZoom: {
                show: false,
                start: 0,
                end: 100
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    data: this.mon,
                },
                {
                    type: 'category',
                    boundaryGap: true,
                    // data: this.mon,
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    name: '成交金额',
                    // max: 1200,
                    // min: 0,
                    // boundaryGap: [0.2, 0.2]
                },
                {
                    type: 'value',
                    scale: true,
                    name: '订单数量',
                    max: this.max,
                    min: 0,
                    // boundaryGap: [0.2, 0.2]
                },
                
            ],
            series: [
                {
                    name: '成交金额',
                    type: 'line',
                    data: this.amount
                },
                {
                    name: '订单数量',
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: this.cou
                },
            ]
        });
    }
  }
}
</script>
<style scoped>
.statistics {
    width: 600px;
    height: 400px;
    margin: 50px auto;
}
</style>