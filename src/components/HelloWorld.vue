<template>
    <div class="hello">
        <div id="main0" style="width: 1900px;height:400px;"></div>
        <div id="main1" style="width: 1900px;height:400px;"></div>
        <div id="main2" style="width: 1900px;height:400px;"></div>
        <div id="main3" style="width: 1900px;height:400px;"></div>
        <div id="main4" style="width: 1900px;height:400px;"></div>
        <div id="main5" style="width: 1900px;height:400px;"></div>
    </div>
</template>

<script>
// 配售数据
import data from '../assets/配售数据';
// 券商数据
import brokerList from '../assets/brokerList';
// 打新记录数据
import stockList from '../assets/stockList';
// 创建配售对象
import CreateData from '../assets/CreateData';
// 创建券商对象
import CreateBroker from "../assets/CreateBroker";
import echarts from 'echarts';

const 配售对象 = [];
const 券商对象 = {};
data.forEach((ele) => {
    配售对象.push(new CreateData(ele));
})
brokerList.forEach((ele) => {
    券商对象[ele.name] = new CreateBroker(ele);
});
stockList.forEach((ele) => {
    const 股票名称 = ele.name;
    ele.打新记录.forEach((element) => {
        券商对象[element.券商].添加港股打新记录(element)
    });
    ele.中签记录.forEach((element) => {
        券商对象[element.券商].港股中签(element)
    });
    ele.出售记录.forEach((element) => {
        券商对象[element.券商].出售中签股票(element)
    })
})

console.log(配售对象, 券商对象)

export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            配售对象,
        }
    },
    methods: {
        // 创建折线图
        createChart(domId, data) {
            // 基于准备好的dom，初始化echarts实例
            const myChart = echarts.init(document.getElementById(domId));
            // echarts配置
            const option = {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: data.甲组总中签率(),
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '总中签率',
                        type: 'line',
                        barWidth: '60%',
                        data: data.甲组中签手数(),
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
    },
    mounted() {
        this.配售对象.forEach((ele, index) => {
            this.createChart('main' + index, ele);
        });

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
