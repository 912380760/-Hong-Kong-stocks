<template>
  <div class="hello" style="margin: 0 10px;">
    <h3>配售基础资料</h3>
    <p>模糊匹配,支持股票代码,可以搜索多个,用逗号隔开</p>
    <div class="box">
      <div class="box-left">
        <el-input  placeholder="请输入股票名称" clearable v-model="input" @keyup.enter.native="clickSerech(input)">
          <el-button @click="clickSerech(input)" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>

    <el-table :data="tableData2" style="width: 100%;" border height="700px" id="tableData2">
      <el-table-column prop="name" label="股票/资料" width="160" fixed></el-table-column>
      <el-table-column sortable v-for="(i,index) in tableKeyList2" :key="index" :prop="i" :label="i" width="130">
        <template slot-scope="scope">
          {{scope.row[i] | filterA(i)}}
        </template>
      </el-table-column>
    </el-table>

    <h3>一手占比趋势</h3>
    <p>受限于甲组申购倍数影响,超过50倍以后会严重影响一手占比分配,(因为过多的一手分配策略会让融资申购太吃亏,影响融资申购热情,这是港交所不愿意看到的)</p>
    <p>ps:甲组申购倍数为回拨之后的申购倍数,甲组能超购到50倍,公开申购肯定已经超购过百倍回拨50%了</p>
    <h4>甲组申购超过50倍,乙组申购超过100倍的平均一手占比: {{this.甲30倍以上一手平均占比 | filterA('一手中签率') }}</h4>
    <div id="main2" style="width: 100%;height:400px;"></div>
    <h4>甲组申购小于50倍的平均一手占比: {{this.甲30倍以下一手平均占比 | filterA('一手中签率') }}</h4>
    <div id="main3" style="width: 100%;height:400px;"></div>
  </div>
</template>

<script>
// 配售数据
import data from '../assets/CreateData';
import echarts from 'echarts';
console.log(data);

export default {
  name: 'index',
  data() {
    return {
      data,
      tableData2: data.concat(), // 配售基础资料表格
      tableKeyList2: [ // 配售基础资料表格Key List
        '一手中签率',
        '稳中手数',
        // '首日开盘涨幅',
        // '首日收盘涨幅',
        '一手金额',
        '公开配售倍数',
        '总申购人数',
        '公开申购金额',
        '甲组申购倍数',
        '乙组申购倍数',
        '甲组申购金额',
        '乙组申购金额',
        '一手占比',
        '一手人数占比',
        '甲组人数',
        '乙组人数',
        '公开发售占比',
        '募资金额',
        '公开发售手数',
        '股票代号',
        '上市日期',
      ],

      tableData3: [], // 预估中签率表格
      tableKeyList3: [], // 预估中签率表格Key List


      input: '', // 搜索配售券商
      甲30倍以上一手平均占比: 0,
      甲30倍以下一手平均占比: 0,
      平均稳中倍数: 0,
    }
  },
  filters: {
    // 把数字转换成百分比
    filterA(value, arg1) {
      if (arg1 === '一手金额') {
        return value.toFixed(0);
      }
      if(/公开配售倍数|乙组申购倍数|甲组申购倍数/.test(arg1)) {
        return value.toFixed(1);
      }
      if(/一手中签率|甲组平均中签率|乙组平均中签率|公开发售占比|一手占比|一手人数占比/.test(arg1)) {
        return (value * 100).toFixed(2) + '%';
      }
      if(/甲组申购金额|乙组申购金额|公开申购金额|募资金额/.test(arg1)) {
        return (value / 100000000).toFixed(2) + '亿';
      }

      return value;
    }
  },
  watch: {
    // 如果搜索值为空,还原table
    input(nowValue) {
      if (nowValue === '') {
        this.tableData2 = this.data.concat();
      }
    }
  },
  methods: {
    // 创建柱状图
    createChart2(domId, xAxis, series, text) {
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
        xAxis: {
          type: 'category',
          data: xAxis,
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: text,
          data: series,
          barWidth: '60%',
          type: 'bar'
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    // 点击搜索券商
    clickSerech(name) {
      let temp = [];
      if(name) {
        const nameList = name.split(',');
        nameList.forEach((element) => {
          this.data.forEach((ele) => {
            if (ele.name.indexOf(element) > -1 || ele.股票代号 === element) {
              temp.push(ele);
            }

          });
        })
        if (temp.length > 0) {
          this.tableData2 = temp;
        } else {
          this.$message('未找到该股票');
        }
      } else {
        this.tableData2 = this.data.concat();
      }
    },

    // 一手占比趋势
    calcB() {
      let 甲30倍以上股票 = [],
          甲30倍以上一手占比 = [],
          甲30倍以上一手平均占比 = 0,
          甲30倍以下股票 = [],
          甲30倍以下一手占比 = [],
          甲30倍以下一手平均占比 = 0;
      this.data.forEach((ele) => {
        if (ele.一手占比 < 1 && ele.甲组申购倍数 > 50 && ele.乙组申购倍数 > 100) {
          甲30倍以上股票.push(ele.name);
          甲30倍以上一手占比.push(ele.一手占比);
          甲30倍以上一手平均占比 += ele.一手占比;

        } else if(ele.一手占比 < 1) {
          甲30倍以下股票.push(ele.name);
          甲30倍以下一手占比.push(ele.一手占比);
          甲30倍以下一手平均占比 += ele.一手占比;
        }
      });
      this.甲30倍以上一手平均占比 = (甲30倍以上一手平均占比 / 甲30倍以上股票.length).toFixed(4);
      this.甲30倍以下一手平均占比 = (甲30倍以下一手平均占比 / 甲30倍以下股票.length).toFixed(4);
      this.createChart2('main2', 甲30倍以上股票, 甲30倍以上一手占比, '比例');
      this.createChart2('main3', 甲30倍以下股票, 甲30倍以下一手占比, '比例');
    }
  },
  mounted() {
    // this.calcA();
    this.calcB();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  display: flex;
  /*justify-content: space-between;*/
  margin-bottom: 20px;
}
.box-left {
  width: 300px;
}
</style>
