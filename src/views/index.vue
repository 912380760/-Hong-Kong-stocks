<template>
  <div class="hello" style="margin: 0 10px;">
    <myHead></myHead>
    <h3>中签率预计</h3>
    <el-table :data="tableData3" border>
      <el-table-column label="股票/中签率" width="135" prop="name"></el-table-column>
      <el-table-column label="预估">
        <el-table-column label="一手中签率" width="120">
          <template slot-scope="scope">
            {{scope.row["一手中签率"] | filterA('一手中签率')}}
          </template>
        </el-table-column>
        <el-table-column prop="稳中手数" label="稳中手数" width="120"></el-table-column>
        <el-table-column prop="甲组申购人数" label="甲组申购人数" width="120"></el-table-column>
        <el-table-column label="一手人数占比" width="120">
          <template slot-scope="scope">
            {{scope.row["一手人数占比"] | filterA('一手中签率')}}
          </template>
        </el-table-column>
        <el-table-column label="一手中签率占比" width="120">
          <template slot-scope="scope">
            {{scope.row["一手中签率占比"] | filterA('一手中签率')}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="实际">
        <el-table-column label="一手中签率" width="120"></el-table-column>
        <el-table-column label="稳中手数" width="120"></el-table-column>
        <el-table-column label="甲组申购人数" width="120"></el-table-column>
        <el-table-column label="一手人数占比" width="120"></el-table-column>
        <el-table-column label="一手中签率占比" width="120"></el-table-column>
      </el-table-column>
    </el-table>

    <h3>配售基础资料</h3>
    <p>模糊匹配,支持股票代码,可以搜索多个,用逗号隔开</p>
    <div class="box">
      <div class="box-left">
        <el-input  placeholder="请输入股票名称" clearable v-model="input" @keyup.enter.native="clickSerech(input)">
          <el-button @click="clickSerech(input)" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>

    <el-table :data="tableData2" style="width: 100%;" border height="750px">
      <el-table-column prop="股票/资料" label="股票/资料" width="160" fixed></el-table-column>
      <el-table-column sortable v-for="(i,index) in tableKeyList2" :key="index" :prop="i" :label="i" width="150">
        <template slot-scope="scope">
          {{scope.row[i] | filterA(i)}}
        </template>
      </el-table-column>
    </el-table>

    <h3>一手占比趋势</h3>
    <p>受限于甲组申购倍数影响,超过30倍以后会严重影响一手占比分配,(因为过多的一手分配策略会让融资申购太吃亏,影响融资申购热情,这是港交所不愿意看到的)</p>
    <p>ps:甲组申购倍数为回拨之后的申购倍数,甲组能超购到30倍,公开申购肯定已经超购过百倍回拨50%了</p>
    <h4>甲组申购超过30倍,乙组申购超过50倍的平均一手占比: {{this.甲30倍以上一手平均占比 | filterA('一手中签率') }}</h4>
    <div id="main2" style="width: 100%;height:400px;"></div>
    <h4>甲组申购小于30倍的平均一手占比: {{this.甲30倍以下一手平均占比 | filterA('一手中签率') }}</h4>
    <div id="main3" style="width: 100%;height:400px;"></div>
<!--    <div id="main4" style="width: 100%;height:400px;"></div>-->
<!--    <div id="main5" style="width: 100%;height:400px;"></div>-->

    <h3>申购记录</h3>
    <el-table :data="tableData" style="width: 100%;" border>
      <el-table-column prop="股票名称/券商" label="股票/券商" width="130" fixed></el-table-column>
      <el-table-column v-for="i in tableKeyList" :key="i" :prop="i" :label="i" width="110">
        <template slot-scope="scope">
          <el-tag size="medium" v-if="scope.row[i].打新手数">{{ scope.row[i].打新手数 }}</el-tag>
          <el-tag size="medium" type="info" v-else>未申购</el-tag>
          <div style="height: 10px;" v-if="scope.row[i].中签手数"></div>
          <el-tag size="medium" type="success" v-if="scope.row[i].中签手数">{{ scope.row[i].中签手数 }}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <h3>历史收益曲线</h3>
    <div id="main" style="width: 100%;height:400px;"></div>

    <h3>个股收益</h3>
    <div id="main1" style="width: 100%;height:400px;"></div>

    <h3>券商收益</h3>
    <div id="main4" style="width: 100%;height:400px;"></div>
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
  import myHead from '@/components/head';

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

  let num0 = 0;
  for (const key in 券商对象) {
    let ele = 券商对象[key];
    num0 += ele.余额;
  }
  console.log('余额: ' + num0)

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
    components: {
      myHead,
    },
    data() {
      return {
        配售对象,
        券商对象,
        tableData: [], // 申购记录
        tableKeyList: [], // 申购记录Key List

        tableData2: [], // 配售基础资料表格
        tableKeyList2: [ // 配售基础资料表格Key List
          '上市日期',
          '一手中签率',
          '稳中手数',
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
        ],

        tableData3: [], // 预估中签率表格
        tableKeyList3: [], // 预估中签率表格Key List


        input: '', // 搜索配售券商
        temp: [],
        甲30倍以上一手平均占比: 0,
        甲30倍以下一手平均占比: 0,
        平均稳中倍数: 0,
      }
    },
    filters: {
      // 把数字转换成百分比
      filterA(value, arg1) {
        if(/一手中签率|甲组平均中签率|乙组平均中签率|公开发售占比|一手占比|一手人数占比/.test(arg1)) {
          return (value * 100).toFixed(2) + '%';
        } else if(/甲组申购金额|乙组申购金额|公开申购金额|募资金额/.test(arg1)) {
          return (value / 100000000).toFixed(4) + '亿';
        } else {
          return value;
        }
      }
    },
    watch: {
      // 如果搜索值为空,还原table
      input(nowValue) {
        if (nowValue === '') {
          this.tableData2 = this.temp;
        }
      }
    },
    methods: {
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
      createChart3(domId, xAxis, series, text) {
        console.log(xAxis, series)
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById(domId));
        // echarts配置
        const option = {
          title: {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: xAxis,
          },
          series: [
            {
              name: text,
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: series,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
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
            this.temp.forEach((ele) => {
                if (ele["股票/资料"].indexOf(element) > -1 || ele.股票代号 === element) {
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
          this.tableData2 = this.temp;
        }
      },
    },
    mounted() {
      // 申购中签记录
      for (const key in 股票对象集合) {
        let obj ={
          '股票名称/券商': key,
        }
        for (const brokerKey in this.券商对象) {
          this.券商对象[brokerKey].打新记录.forEach((ele) => {
            if (ele.name === key) {
              if (ele.中签手数 > 0) {
                obj[brokerKey] = {
                  打新手数: `${ele.打新类型.substring(0, 2)}${ele.打新手数}手`,
                  中签手数: `中签${ele.中签手数}手`,
                };
              } else {
                obj[brokerKey] = {
                  打新手数: `${ele.打新类型.substring(0, 2)}${ele.打新手数}手`,
                };
              }
            }
          });

          // 处理未申购情况
          if(!obj[brokerKey]) {
            obj[brokerKey] = {};
          }
        }
        this.tableData.push(obj);
      };
      this.tableData.reverse();
      for (const brokerKey in this.券商对象) {
        this.tableKeyList.push(brokerKey);
      }
      // 历史收益曲线 目前打新利润 = 中签后已经出售的股票,如果股票未出售不计算,因为利润并未确定,不包含打未公布的新股费用
      // todo 每个股票打新费用 总中签率和实际中签率 资金占用
      let 收益对象 = {};
      for (const brokerKey in this.券商对象) {
        this.券商对象[brokerKey].打新记录.forEach((ele) => {
          if (ele.资金占用 === 0) {
            if(!收益对象[ele.资金解放日]) {
              收益对象[ele.资金解放日] = ele.净利润;
            } else {
              收益对象[ele.资金解放日] += ele.净利润;
            }
          }
        });
      }
      let 收益日期 = [], 收益利润 = [], 收益数组对象 = [], 总收益 = 0;
      // 排序
      for (const key in 收益对象) {
        收益数组对象.push({
          日期: key,
          利润: 收益对象[key],
        })
      }
      // 冒泡排序
      bubbleSort(收益数组对象);
      收益数组对象.forEach((ele) => {
        收益日期.push(ele.日期);
        收益利润.push((总收益 += ele.利润).toFixed(2) - 0);
      });
      this.createChart('main', 收益日期, 收益利润, 'line', '收益');

      // 个股收益 = 已公布并且已出售的个股收益
      let 个股收益对象 = {};
      for (const key in 股票对象集合) {
        for (const brokerKey in this.券商对象) {
          this.券商对象[brokerKey].打新记录.forEach((ele) => {
            if (ele.name === key && ele.资金占用 === 0) {
              if(!个股收益对象[key]) {
                个股收益对象[key] = ele.净利润;
              } else {
                个股收益对象[key] += ele.净利润;
              }
            }
          })
        }
      };
      // 按股票上市时间排序
      let 股票名 = [], 股票收益 = [];
      for (const key in 股票对象集合) {
        if(个股收益对象[key]) {
          股票名.push(key);
          股票收益.push((个股收益对象[key]).toFixed(2) - 0)
        }
      };
      股票名.reverse();
      股票收益.reverse();
      this.createChart2('main1', 股票名, 股票收益, '收益');

      data.forEach((ele) => {
        for (const key in 配售对象) {
          let temp = 配售对象[key];
          if (ele.name === key) {
            let temp2 = {};
            temp2['股票/资料'] = ele.name;

            this.tableKeyList2.forEach((ele2) => {
              temp2[ele2] = temp[ele2];
            })
            this.tableData2.push(temp2);
          }
        }
      });
      this.temp = this.tableData2;

      // 一手占比趋势
      let 甲30倍以上股票 = [],
          甲30倍以上一手占比 = [],
          甲30倍以上一手平均占比 = 0,
          甲30倍以下股票 = [],
          甲30倍以下一手占比 = [],
          甲30倍以下一手平均占比 = 0;
      data.forEach((ele) => {
        for (const key in 配售对象) {
          if(key === ele.name) {
            let temp = 配售对象[key];

            if (temp.一手占比 < 1 && temp.甲组申购倍数 > 30 && temp.公开配售倍数 > 150) {
              甲30倍以上股票.push(key);
              甲30倍以上一手占比.push(temp.一手占比);
              甲30倍以上一手平均占比 += temp.一手占比;

            } else if(temp.一手占比 < 1) {
              甲30倍以下股票.push(key);
              甲30倍以下一手占比.push(temp.一手占比);
              甲30倍以下一手平均占比 += temp.一手占比;
            }
          }
        }
      });
      this.甲30倍以上一手平均占比 = (甲30倍以上一手平均占比 / 甲30倍以上股票.length).toFixed(4);
      this.甲30倍以下一手平均占比 = (甲30倍以下一手平均占比 / 甲30倍以下股票.length).toFixed(4);
      this.createChart2('main2', 甲30倍以上股票, 甲30倍以上一手占比, '比例');
      this.createChart2('main3', 甲30倍以下股票, 甲30倍以下一手占比, '比例');


      // todo 通过招股信息计算中签率  计算稳中手数跟申购倍数和一手占比的关系

      for (const key in 股票对象集合) {
        let ele = 股票对象集合[key];
        if(ele.总股数) {
          let temp = {};
          temp.甲组申购人数 = ele.甲组申购人数;
          let 甲组手数 = ele.总股数 * ele.回拨比例 / ele.每手股数 / 2;
          let 甲组超购倍数 = ele.申购金额 * ele.甲组金额占比 / (ele.一手金额 * 甲组手数);
          temp.一手中签率占比 = 甲组超购倍数 > 30 ? Number(this.甲30倍以上一手平均占比) : Number(this.甲30倍以下一手平均占比);
          temp.一手人数占比 = ele.一手人数占比;
          temp.一手中签率 = 甲组手数 * temp.一手中签率占比 / (ele.甲组申购人数 * temp.一手人数占比);
          // 一手占比过多影响稳中手数
          // temp.稳中手数 = 甲组超购倍数 > 30 ? parseInt(甲组超购倍数) : parseInt(甲组超购倍数 / 0.8);
          temp.稳中手数 = parseInt(甲组超购倍数);
          temp.name = ele.name;
          this.tableData3.push(temp);
          this.tableKeyList3.push(ele.name);
        }
      }



      // 券商收益

      // todo 单元测试

      // 一手中签率 平均中签率 稳中手数
      // 打新人数 一手占比 回拨比例

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
