<template>
  <div>
    <h3>申购记录</h3>
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left" style="height: 800px;">
      <el-tab-pane v-for="item in brokerObj.打新记录" :key="item.name"  :label="item.name" :name="item.name">
        <el-table
            :data="item.list"
            border
            :summary-method="getSummaries"
            show-summary
            :row-class-name="tableRowClassName"
            :default-sort="{prop: '打新手数', order: 'descending'}"
            max-height="800"
            style="width: 100%;">
          <el-table-column
              prop="券商"
              label="券商">
          </el-table-column>
          <el-table-column
              prop="打新手数"
              label="打新手数"
              sortable>
            <template slot-scope="scope">
              {{ scope.row.打新类型.split('打新')[0] + scope.row.打新手数 + '手' }}
            </template>
          </el-table-column>
          <el-table-column
              prop="申购金额"
              label="融资倍数">
            <template slot-scope="scope">
              {{ scope.row.融资比例 !== 1 ? (1 / (1 - scope.row.融资比例)).toFixed(0) + '倍' : '白嫖' }}
            </template>
          </el-table-column>
          <el-table-column
              sortable
              prop="中签数"
              label="中签数">
            <template slot-scope="scope">
              {{ scope.row.中签数 ? scope.row.中签数 + '手' : '' }}
            </template>
          </el-table-column>
          <el-table-column
              sortable
              prop="资金占用"
              label="资金占用">
            <template slot-scope="scope">
              {{scope.row.资金占用.toFixed(0) + '元'}}
            </template>
          </el-table-column>
          <el-table-column
              sortable
              prop="申购成本"
              label="申购成本">
            <template slot-scope="scope">
              {{scope.row.申购成本.toFixed(0) + '元'}}
            </template>
          </el-table-column>
          <el-table-column
              sortable
              prop="盈亏"
              label="盈亏">
            <template slot-scope="scope">
              {{scope.row.盈亏.toFixed(0) + '元'}}
            </template>
          </el-table-column>
          <el-table-column
              sortable
              prop="百分比收益"
              label="百分比收益">
            <template slot-scope="scope">
              {{ (scope.row.百分比收益 * 100).toFixed(2) + '%' }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <h3>申购合计</h3>
    <el-table
        :data="brokerObj.打新记录"
        :summary-method="getSummaries"
        show-summary
        border
        max-height="800"
        style="width: 100%;">
      <el-table-column
          prop="name"
          label="股票名称">
      </el-table-column>
      <el-table-column
          sortable
          prop="手数"
          label="打新手数">
        <template slot-scope="scope">
          {{ scope.row.手数 + '手' }}
        </template>
      </el-table-column>
      <el-table-column
          prop="申购金额"
          label="平均融资倍数">
        <template slot-scope="scope">
          {{ scope.row.融资倍数 !== Infinity ? scope.row.融资倍数.toFixed(0) + '倍' : '白嫖' }}
        </template>
      </el-table-column>
      <el-table-column
          sortable
          prop="中签数"
          label="中签数">
        <template slot-scope="scope">
          {{ scope.row.中签数 ? scope.row.中签数 + '手' : '' }}
        </template>
      </el-table-column>
      <el-table-column
          sortable
          prop="资金占用"
          label="资金占用">
        <template slot-scope="scope">
          {{ scope.row.资金占用.toFixed(0) + '元' }}
        </template>
      </el-table-column>
      <el-table-column
          sortable
          prop="申购成本"
          label="申购成本">
        <template slot-scope="scope">
          {{scope.row.申购成本.toFixed(0) + '元'}}
        </template>
      </el-table-column>
      <el-table-column
          sortable
          prop="盈亏"
          label="盈亏">
        <template slot-scope="scope">
          {{ scope.row.盈亏.toFixed(0) + '元' }}
        </template>
      </el-table-column>
      <el-table-column
          sortable
          prop="百分比收益"
          label="百分比收益">
        <template slot-scope="scope">
          {{ (scope.row.百分比收益 * 100).toFixed(2) + '%' }}
        </template>
      </el-table-column>
      <el-table-column
          sortable
          prop="申购金额"
          label="申购金额">
        <template slot-scope="scope">
          {{ scope.row.申购金额.toFixed(0) + '元'}}
        </template>
      </el-table-column>
      <el-table-column
          prop="上市日期"
          label="上市日期">
      </el-table-column>
    </el-table>

    <h3>历史收益曲线</h3>
    <p>股票未中签或股票出售后才记录收益</p>
    <div id="main" style="width: 100%;height:400px;"></div>
  </div>
</template>

<script>
// 打新记录数据
import data from '../assets/stockList';
// 券商数据
import CreateBroker from "@/assets/CreateBroker";
import echarts from "echarts";

const brokerObj = new CreateBroker(data);
console.log(brokerObj);

// 冒泡排序
function bubbleSort (arr) {
  var max = arr.length - 1;
  for (var j = 0; j < max; j++) {
    // 声明一个变量，作为标志位
    var done = true;
    for (var i = 0; i < max - j; i++) {
      if (new Date(arr[i].日期) > new Date(arr[i + 1].日期)) {
        var temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        done = false;
      }
    }
    if (done) {
      break;
    }
  }
  return arr;
}



export default {
  name: "list.vue",
  data() {
    return {
      brokerObj: brokerObj,
      activeName: brokerObj.打新记录[0].name,
    }
  },
  filters: {

  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 中签行变色
    tableRowClassName({row, rowIndex}) {
      if (row.中签数 > 0) {
        return 'success-row';
      }
      return '';
    },

    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (index === 4 || index === 5 || index === 6 || index === 8) {
            sums[index] = sums[index].toFixed(0) + '元';
          } else if(index === 1 || index === 3) {
            sums[index] = sums[index] + '手';
          }
        }
      });
      // 总百分比收益
      if(sums[6] && sums[4]) {
        sums[7] = (sums[6].split('元')[0] / sums[4].split('元')[0] * 100).toFixed(2) + '%';
      }
      // 总融资倍数
      if(sums[2] && sums[4] && sums[5]) {
        sums[2] = ((sums[2] - sums[5].split('元')[0]) / (sums[4].split('元')[0] - sums[5].split('元')[0])).toFixed(2) + '倍';
      }
      return sums;
    },

    // 创建折线图
    createChart(domId, xAxis, series) {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById(domId));
      // echarts配置
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
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
            data: xAxis,
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
            name: '收益',
            type: 'line',
            barWidth: '60%',
            data: series,
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    // 历史收益曲线计算
    calc() {
      // 历史收益曲线 目前打新利润 = 中签后已经出售的股票,如果股票未出售不计算,因为利润并未确定,不包含打未公布的新股费用
      // todo 每个股票打新费用 总中签率和实际中签率 资金占用
      let 收益对象 = {};
      this.brokerObj.打新记录.forEach((element) => {
        element.list.forEach((ele) => {
          const {中签数, 出售日期} = ele;
          let 结算日;
          if (中签数 === 0) {
            try {
              let dateTime = new Date(element.上市日期);
              // 未中签暗盘结算
              if(dateTime.getDay() === 0) {
                dateTime.setDate(dateTime.getDate() - 3)
              } else {
                dateTime.setDate(dateTime.getDate() - 1)
              }
              结算日 = `${dateTime.getFullYear()}/${dateTime.getMonth() + 1}/${dateTime.getDate()}`;
            } catch(e) {
              console.log(e)
            }

          } else if(出售日期) {
            结算日 = ele.出售日期;
          }
          if(中签数 === 0 || 出售日期) {
            if (!收益对象[结算日]) {
              收益对象[结算日] = ele.盈亏;
            } else {
              收益对象[结算日] += ele.盈亏;
            }
          }
        });
      });
      let 收益日期 = [], 收益利润 = [], 收益数组对象 = [], 总收益 = 0;
      // 排序
      for (const key in 收益对象) {
        收益数组对象.push({
          日期: key,
          利润: 收益对象[key],
        })
      }
      // 第一次申购新股
      收益数组对象.unshift({
        日期: '2020/4/14',
        利润: 0,
      });
      // 冒泡排序
      bubbleSort(收益数组对象);

      收益数组对象.forEach((ele) => {
        收益日期.push(ele.日期);
        收益利润.push((总收益 += ele.利润).toFixed(2) - 0);
      });
      this.createChart('main', 收益日期, 收益利润, 'line', '收益');
    }
  },
  mounted() {
    console.log(this.brokerObj);
    let 正收益数组 = [], 负收益数组 = [];
    this.brokerObj["打新记录"].forEach(ele => {
      if (new Date(ele.上市日期) < Date.now()) {
        if (ele.盈亏 > 0) {
          正收益数组.push(ele)
        } else {
          负收益数组.push(ele)
        }
      }
    });
    console.log(正收益数组, 负收益数组)
    this.calc();
  }
}
</script>

<style>
.el-table .success-row {
  background: #f0f9eb;
}
</style>
