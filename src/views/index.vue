<template>
  <div class="hello" style="margin: 0 10px;">
    <h3>中签率预测</h3>
    <p>暂时只能预测甲组申购50倍以上的热票</p>
    <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick" style="height: 1190px;">
      <el-tab-pane v-for="(item, index) in data2" :key="item.name" :label="item.name" :name="index.toString()">
        <div style="display:flex; padding-right: 10px;border: 1px solid #ebebeb;border-radius: 3px;margin-bottom: 20px;">
          <el-form ref="item" :model="item" label-width="100px" style="width: 50%;">
            <el-form-item label="中签率">
              <el-tag style="margin-right: 20px;">一手中签率: {{ (一手中签率 * 100).toFixed(2) + '%' }}</el-tag>
              <el-tag style="margin-right: 20px;" v-if="甲组稳中">甲组稳中: {{甲组稳中.手数}}手 / {{ (甲组稳中.预测中签率 * 100).toFixed(2) + '%' }}</el-tag>
              <el-tag>一手金额: {{item.上限招股价 * item.每手股数}}元</el-tag>
            </el-form-item>
            <el-form-item label="申购人数">
              <div style="display:flex;">
                <el-slider v-model="甲组人数" :max="2000000" :step="10000" :format-tooltip="formatTooltip3" :marks="marks2" style="flex: 1;"></el-slider>
                <el-tag style="margin-left: 10px;width: 60px;">{{ (甲组人数 / 10000).toFixed(0) + '万' }}</el-tag>
              </div>
            </el-form-item>
            <el-form-item label="申购总金额" >
              <div style="display:flex;">
                <el-slider v-model="申购总金额" :max="2000000000000" :step="1000000000" :format-tooltip="formatTooltip2" :marks="marks3" style="flex: 1;"></el-slider>
                <el-tag style="margin-left: 10px;width: 60px;">{{ (申购总金额 / 100000000).toFixed(0) + '亿' }}</el-tag>
              </div>
            </el-form-item>
            <el-form-item style="padding-top: 10px;">
              <el-button type="primary" @click="blur(index)">修改</el-button>
              <el-button @click="blur(index)">还原</el-button>
            </el-form-item>
          </el-form>
          <el-form ref="item" :model="item" label-width="120px" style="width: 50%;">
            <el-form-item label="发行规模">
              <el-tag style="margin-right: 20px;">公开配售: {{ (item.集资金额 / 100000000 * item.回拨比例).toFixed(1) + '亿' }} </el-tag>
              <el-tag style="margin-right: 20px;">回拨比例: {{ (item.回拨比例 * 100).toFixed(2) + '%' }}</el-tag>
              <el-tag>甲组手数: {{ (item.集资金额 * item.回拨比例 / 2 / item.上限招股价 / item.每手股数 / 10000).toFixed(2) + '万手' }}</el-tag>
            </el-form-item>
            <el-form-item label="一手人数占比">
              <div style="display:flex;">
                <el-slider v-model="一手申购人数占比" :max="1" :step="0.01" :format-tooltip="formatTooltip" :marks="marks" style="flex: 1;"></el-slider>
                <el-tag style="margin-left: 10px;width: 48px;">{{ (一手申购人数占比 * 100).toFixed(0) + '%' }}</el-tag>
              </div>
            </el-form-item>
            <el-form-item label="甲组金额占比">
              <div style="display:flex;">
                <el-slider v-model="甲组申购金额占比" :max="1" :step="0.01" :format-tooltip="formatTooltip" :marks="marks" style="flex: 1;"></el-slider>
                <el-tag style="margin-left: 10px;width: 48px;">{{ (甲组申购金额占比 * 100).toFixed(0) + '%' }}</el-tag>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <h4>预估申购</h4>
        <el-table
            :data="list"
            border
            :summary-method="getSummaries"
            show-summary
            :default-sort="{prop: '打新手数', order: 'descending'}"
            max-height="462"
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
              prop="预估中签率"
              label="预估中签率">
            <template slot-scope="scope">
              {{ scope.row.预估中签率.toFixed(2) }}
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
              prop="预估打和点"
              label="预估打和点">
            <template slot-scope="scope">
              {{ (scope.row.预估打和点 * 100).toFixed(2) + '%' }}
            </template>
          </el-table-column>
        </el-table>
        <div :id="'m' + index" style="width: 1250px;height:400px;margin-top: 20px;"></div>
      </el-tab-pane>
    </el-tabs>
<!--    <div id="m0" style="width: 100%;height:400px;"></div>-->
<!--    <div id="m1" style="width: 100%;height:400px;"></div>-->
<!--    <div id="m2" style="width: 100%;height:400px;"></div>-->
<!--    <div id="m3" style="width: 100%;height:400px;"></div>-->
<!--    <div id="m4" style="width: 100%;height:400px;"></div>-->
<!--    <div id="m5" style="width: 100%;height:400px;"></div>-->
<!--    <div id="m6" style="width: 100%;height:400px;"></div>-->
<!--    <div id="m7" style="width: 100%;height:400px;"></div>-->
<!--    <div id="m8" style="width: 100%;height:400px;"></div>-->
<!--    <div id="m9" style="width: 100%;height:400px;"></div>-->
<!--    <div id="m10" style="width: 100%;height:400px;"></div>-->
<!--    <div id="m11" style="width: 100%;height:400px;"></div>-->
<!--    <div id="m12" style="width: 100%;height:400px;"></div>-->
<!--    <div id="m13" style="width: 100%;height:400px;"></div>-->
<!--    <el-table :data="甲组50倍股票" style="width: 100%;" border height="700px" id="tableData2">-->
<!--      <el-table-column prop="name" label="股票" width="160" fixed></el-table-column>-->
<!--    </el-table>-->

    <h3>配售基础资料,2020年</h3>
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
// 预测数据
import data2 from '../assets/预测数据';
// 打新记录数据
import data3 from '../assets/stockList';

// 券商数据
import CreateBroker from "@/assets/CreateBroker";
const brokerObj = new CreateBroker(data3);
data2.forEach((ele, index, arr) => {
  brokerObj.打新记录.forEach(element => {
    if(ele.name === element.name) {
      arr[index].list = element.list;
    }
  })
});


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
        '公开募资金额',
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

      甲组50倍股票: [],
      甲组50倍以下股票: [],

      // 预测相关数据
      data2,
      activeName: '0',
      一手中签率: 0,
      甲组稳中: null,
      甲组人数: 0,
      申购总金额: 0,
      一手申购人数占比: 0,
      甲组申购金额占比: 0,
      list: [],
      marks: {
        0.1: '10%',
        0.3: '30%',
        0.5: '50%',
        0.7: '70%',
        0.9: '90%',
      },
      marks2: {
        100000: '10万',
        500000: '50万',
        1000000: '100万',
        1500000: '150万',
      },
      marks3: {
        100000000000: '1千亿',
        500000000000: '5千亿',
        1000000000000: '10千亿',
        1500000000000: '15千亿',
      },
      myChart: null,
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

    // 折线图
    createChart3(domId, xAxis, series, text) {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById(domId));
      // echarts配置
      const option = {
        title: {
          text,
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['实际中签率', '预测中签率']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis
        },
        yAxis: {
          type: 'value'
        },
        series,
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },

    // 创建折线图
    createChart(domId, xAxis, series, name) {
      // 基于准备好的dom，初始化echarts实例
      // echarts配置
      let option = {
        title: {
          text: '甲组中签率折线图',
        },
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
            name: '中签率%',
            type: 'line',
            barWidth: '60%',
            data: series,
          }
        ]
      };
      this.myChart = echarts.init(document.getElementById(domId));

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
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
          this.甲组50倍股票.push(ele);
          甲30倍以上股票.push(ele.name);
          甲30倍以上一手占比.push(ele.一手占比);
          甲30倍以上一手平均占比 += ele.一手占比;

        } else if(ele.一手占比 < 1) {
          this.甲组50倍以下股票.push(ele)
          甲30倍以下股票.push(ele.name);
          甲30倍以下一手占比.push(ele.一手占比);
          甲30倍以下一手平均占比 += ele.一手占比;
        }
      });
      this.甲30倍以上一手平均占比 = (甲30倍以上一手平均占比 / 甲30倍以上股票.length).toFixed(4);
      this.甲30倍以下一手平均占比 = (甲30倍以下一手平均占比 / 甲30倍以下股票.length).toFixed(4);
      this.createChart2('main2', 甲30倍以上股票, 甲30倍以上一手占比, '比例');
      this.createChart2('main3', 甲30倍以下股票, 甲30倍以下一手占比, '比例');
    },

    预测中签率(data, index, i) {
      let { 公开发售手数, 甲组, 甲组申购金额, 一手金额, 甲组人数, 一手中签率, 甲组稳中 } = data;
      // const 一手中签率 = (平均一手占比 * (公开发售手数 / 2)) / 甲组[0].申购人数;
      const 每手概率 = (公开发售手数 / 2 - 甲组人数 * 一手中签率) / (甲组申购金额 / 一手金额 - 甲组人数);
      // 中签率 = 每手概率 * (申购股数 - 1) + 一手概率;
      let 手数数组 = [], 实际中签率 = {
        name: '实际中签率',
        type: 'line',
        data: [],
      }, 预测中签率 = {
        name: '预测中签率',
        type: 'line',
        data: [],
      }, 差值总和 = 0;
      data.甲组.forEach((ele, index, arr) => {
        const {手数} = ele;
        if (手数 <= 甲组稳中.手数) {
          arr[index].预测中签率 = 每手概率 * (手数 - 1) * 1.12 + 一手中签率;
          手数数组.push(手数);
          实际中签率.data.push(ele.总中签率);
          预测中签率.data.push(arr[index].预测中签率.toFixed(3))
        } else {
          arr[index].预测中签率 = 每手概率 * (甲组稳中.手数 - 1) * 1.12 + 每手概率 * (手数 - 甲组稳中.手数 - 1)  * 0.75 + 一手中签率;
          手数数组.push(手数);
          实际中签率.data.push(ele.总中签率);
          预测中签率.data.push(arr[index].预测中签率.toFixed(3))
        }
      });

      data.甲组.forEach(ele => {
        const {手数} = ele;
        if (手数 > 甲组稳中.手数) {
          差值总和 += Math.abs(ele.预测中签率 - ele.总中签率);
        }
      });

      data.每手概率 = 每手概率;
      data.差值总和 = 差值总和;

      // this.createChart3('m' + index, 手数数组, [实际中签率, 预测中签率], data.name);
    },

    预测中签率2(data) {
      let { 每手股数, 上限招股价, 集资金额, 申购总金额, 甲组申购金额占比, 一手申购人数占比, 甲组人数, 回拨比例, name } = data;
      const 一手金额 = 每手股数 * 上限招股价 * 1.01;
      const 公开发售手数 = 集资金额 / 上限招股价 / 每手股数 * 回拨比例;
      const 甲组申购金额 = 申购总金额 * 甲组申购金额占比;
      let 乙组每手中签率;
      乙组每手中签率 = 1 / ((申购总金额 - 甲组申购金额) / (一手金额 * 公开发售手数 / 2));
      let 一手中签率;
      // 暂时打8折,最近一手分配比例较低
      console.log(name + ':' + (甲组申购金额 / (公开发售手数 * 上限招股价 * 每手股数 /2)).toFixed(0) + '倍')
      if(甲组申购金额 / (公开发售手数 * 上限招股价 * 每手股数 /2)  > 30) {
        一手中签率 = (this.甲30倍以上一手平均占比 * 0.8 * (公开发售手数 / 2)) / (甲组人数 * 一手申购人数占比);
      } else {
        一手中签率 = (this.甲30倍以下一手平均占比 * (公开发售手数 / 2)) / (甲组人数 * 一手申购人数占比);
      }
      let 每手概率 = (公开发售手数 / 2 - 甲组人数 * 一手中签率) / (甲组申购金额 / 一手金额 - 甲组人数);
      if (name === '云顶新耀-B') {
        一手中签率 = (this.甲30倍以上一手平均占比 * (公开发售手数 / 2)) / (甲组人数 * 一手申购人数占比);
        每手概率 = (公开发售手数 / 2 - 甲组人数 * 一手中签率) / (甲组申购金额 / 一手金额 - 甲组人数);
      }
      data.甲组 = {};
      let 甲组稳中;
      data.listNumber.forEach((ele, index, arr) => {
        let 预测中签率;
        if (每手概率 * (ele - 1) * 1.12 + 一手中签率 <= 1) {
          预测中签率 = 每手概率 * (ele - 1) * 1.12 + 一手中签率;
        } else {
          if (!甲组稳中) {
            甲组稳中 = {
              手数: ele,
              预测中签率: 每手概率 * (arr[index-1] - 1) * 1.12 + 每手概率 * (ele - arr[index-1] - 1)  * 0.75 + 一手中签率
            }
            预测中签率 = 每手概率 * (arr[index-1] - 1) * 1.12 + 每手概率 * (ele - arr[index-1] - 1)  * 0.75 + 一手中签率;
          }
          if(!预测中签率) {
            预测中签率 = 每手概率 * (甲组稳中.手数 - 1) * 1.12 + 每手概率 * (ele - 甲组稳中.手数 - 1)  * 0.75 + 一手中签率;
          }
        }
        data.甲组[ele] = 预测中签率;
      });
      data.甲组稳中 = 甲组稳中;
      data.每手概率 = 每手概率;
      data.一手中签率 = 一手中签率;
      data.乙组每手中签率 = 乙组每手中签率;

      console.log(data);
    },

    // 封装中签率函数
    封装中签率函数(ele, index) {
      this.预测中签率2(ele);
      const {上限招股价, 每手股数} = ele;
      // 计算打和点
      if (ele.list) {
        ele.list.forEach((element, index, arr) => {
          const { 打新手数, 申购成本 } = element;
          const 预估中签率 = ele.甲组[打新手数];
          const 一手金额 = 上限招股价 * 每手股数;

          arr[index].预估打和点 = (1 / 预估中签率 * 申购成本 + 一手金额 * 0.01) / 一手金额;
          arr[index].预估中签率 = 预估中签率;
          arr[index].一手金额 = 一手金额;
        });
      }
      this.data2 = data2;

      this.activeName = typeof index === 'string' ? index : index.toString();
      this.一手中签率 = data2[index].一手中签率;
      this.甲组稳中 = data2[index].甲组稳中;
      this.甲组人数 = data2[index].甲组人数;
      this.申购总金额 = data2[index].申购总金额;
      this.一手申购人数占比 = data2[index].一手申购人数占比;
      this.甲组申购金额占比 = data2[index].甲组申购金额占比;
      if(data2[index].list) {
        this.list = data2[index].list.concat();
      }

      let 手数数组 = [], 预测中签率数组 = [];
      for (const 上限招股价Element in data2[index].甲组) {
        手数数组.push(上限招股价Element);
        预测中签率数组.push(data2[index].甲组[上限招股价Element].toFixed(2));
      }

      this.createChart('m' + index, 手数数组, 预测中签率数组, data2[index].name);
    },

    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      let 一手金额;
      if (data.length > 0) {
        一手金额 = data[0].一手金额;
      }
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
            sums[index] = sums[index].toFixed(2) + '手';
          }
        }
      });
      // 总融资倍数
      if(sums[2] && sums[4] && sums[5]) {
        sums[2] = ((sums[2] - sums[5].split('元')[0]) / (sums[4].split('元')[0] - sums[5].split('元')[0])).toFixed(2) + '倍';
      }
      // 平均打和点
      if(sums[3] && sums[5] && sums[6]) {
        // (1 / 预估中签率 * 申购成本 + 一手金额 * 0.01) / 一手金额;
        sums[6] = ((1 / sums[3].split('手')[0] * sums[5].split('元')[0] + 一手金额 * 0.01) / 一手金额 * 100).toFixed(2) + '%';
      }
      return sums;
    },

    blur(index) {
      const ele = this.data2[index];
      ele.甲组人数 = this.甲组人数;
      ele.申购总金额 = this.申购总金额;
      ele.一手申购人数占比 = this.一手申购人数占比;
      ele.甲组申购金额占比 = this.甲组申购金额占比;
      this.封装中签率函数(ele, index);
    },

    handleClick(tab, event) {
      const ele = this.data2[this.activeName];
      this.封装中签率函数(ele, this.activeName);
    },
    formatTooltip(val) {
      return (val * 100).toFixed(0) + '%';
    },
    formatTooltip2(val) {
      return (val / 100000000).toFixed(0) + '亿';
    },
    formatTooltip3(val) {
      return (val / 10000).toFixed(0) + '万';
    }
  },
  mounted() {
    // this.calcA();
    this.calcB();

    data2.forEach(ele => {
      this.封装中签率函数(ele, 0);
    })

    // this.甲组50倍股票.forEach((ele,index) => {
    //   this.预测中签率(ele, index);
    // });
    // const 差值数组 = [];
    // for(let i = 0.5;i < 1.5;i+=0.01) {
    //   let 总差值总和 = 0;
    //   this.甲组50倍股票.forEach((ele,index) => {
    //     this.预测中签率(ele, index, i);
    //     总差值总和 += ele.差值总和;
    //   });
    //   差值数组.push({
    //     总差值总和,
    //     index: i,
    //   });
    // }
    // console.log(差值数组)

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
