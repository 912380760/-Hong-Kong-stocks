<template>
    <div class="hello">
<!--        <div id="main0" style="width: 1900px;height:400px;"></div>-->
<!--        <div id="main1" style="width: 1900px;height:400px;"></div>-->
<!--        <div id="main2" style="width: 1900px;height:400px;"></div>-->
<!--        <div id="main3" style="width: 1900px;height:400px;"></div>-->
<!--        <div id="main4" style="width: 1900px;height:400px;"></div>-->
<!--        <div id="main5" style="width: 1900px;height:400px;"></div>-->

        <el-table :data="tableData" style="width: 100%" stripe border height="500px">
            <el-table-column prop="股票名称/券商" label="股票/券商" width="120" fixed></el-table-column>
            <el-table-column v-for="i in tableKeyList" :key="i" :prop="i" :label="i" width="145"></el-table-column>
        </el-table>
    </div>
</template>

<script>
// 配售数据
import data from '../assets/配售数据';
// 券商数据
import brokerList from '../assets/brokerList';
// 打新记录数据
import tempData from '../assets/stockList';
let {stockList, 股票对象集合} = tempData;
// 创建配售对象
import CreateData from '../assets/CreateData';
// 创建券商对象
import CreateBroker from "../assets/CreateBroker";
import echarts from 'echarts';

console.log(股票对象集合, stockList)

const 配售对象 = {};
const 券商对象 = {};
data.forEach((ele) => {
    配售对象[ele.name] = new CreateData(ele);
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


console.log(配售对象)
console.log(券商对象)
// console.log(配售对象.康方生物.甲组总申购金额)
// console.log(配售对象.建业新生活.甲组总申购金额 + 配售对象.沛佳医疗.甲组总申购金额)
// console.log(配售对象.网易.甲组总申购金额)
// console.log(配售对象.京东.甲组总申购金额)
console.log(配售对象.海吉亚医疗.甲组总申购金额 + 配售对象.康基医疗.甲组总申购金额)

let num0 = 0;
for (const key in 券商对象) {
    let ele = 券商对象[key];
    num0 += ele.余额;
}
console.log(num0)


let 海普瑞 = 66030 * 20.6 * 500 / 0.097,
    弘阳服务 = 20000 * 4.3 * 1000 / 0.0756;
let 预估甲组总申购金额 = (配售对象.海吉亚医疗.甲组总申购金额 + 配售对象.康基医疗.甲组总申购金额) * 1.3 - 海普瑞 - 弘阳服务;
console.log(预估甲组总申购金额);

let 股票发售信息 = {
    欧康维视生物: {
        "股价": 14.66,
        "总股数": 105000000,
        "每手股数": 500,
        "公开发售配额": 0.5,
    },
    永泰生物: {
        "股价": 11,
        "总股数": 105000000,
        "每手股数": 1000,
        "公开发售配额": 0.5,
    },
    正荣服务: {
        "股价": 4.7,
        "总股数": 250000000,
        "每手股数": 1000,
        "公开发售配额": 0.5,
    },
    思摩尔: {
        "股价": 12.4,
        "总股数": 574366666,
        "每手股数": 1000,
        "公开发售配额": 0.37,
    },
    // 绿城管理: {
    //     "股价": 3,
    //     "总股数": 477560000,
    //     "每手股数": 1000,
    //     "公开发售配额": 0.3,
    // }
};


// let 分配策略 = {
//     欧康维视生物: 7 / 11.5,
//     永泰生物: 1.5 / 11.5,
//     正荣服务: 1 / 11.5,
//     思摩尔: 2 / 11.5,
// }
// let arr = [];
// for (const 分配策略Key in 分配策略) {
//     const temp = 分配策略[分配策略Key]
//     arr.push(temp * 预估甲组总申购金额)
// }
// console.log(arr)

export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            配售对象,
            券商对象,
            tableData: [],
            tableKeyList: [],
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
        // 添加申购内容
        for (const key in 股票对象集合) {
            let obj ={
                '股票名称/券商': key,
            }
            for (const brokerKey in this.券商对象) {
                this.券商对象[brokerKey].打新记录.forEach((ele) => {
                    if (ele.name === key) {
                        if (ele.净利润) {
                            obj[brokerKey] = `${ele.打新类型.substring(0, 2)}${ele.打新手数}手/中签${ele.中签手数}手`;
                        } else {
                            obj[brokerKey] = `${ele.打新类型.substring(0, 2)}${ele.打新手数}手`;
                        }
                    }
                });

                // 处理未申购情况
                if(!obj[brokerKey]) {
                    obj[brokerKey] = '未申购';
                }
            }
            this.tableData.push(obj);
        };

        for (const brokerKey in this.券商对象) {
            this.tableKeyList.push(brokerKey);
        }
        console.log(this.tableKeyList)


        console.log(this.tableData);

        // let index = -1;
        // for (const key in 配售对象) {
        //     index ++;
        //     const ele = 配售对象[key]
        //     this.createChart('main' + index, ele);
        // }
        // this.配售对象.forEach((ele, index) => {
        //     this.createChart('main' + index, ele);
        // });

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
