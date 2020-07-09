<template>
  <div class="hello" style="margin: 0 10px;">
    <h3>申购记录</h3>
    <el-table :data="tableData" style="width: 100%;" border height="750px">
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

    <h3>配售基础资料</h3>
    <div class="box">
      <div class="box-left">
        <el-input  placeholder="请输入股票名称" clearable v-model="input" @keyup.enter.native="clickSerech(input)">
          <el-button @click="clickSerech(input)" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>

    <el-table :data="tableData2" style="width: 100%;" border height="750px">
      <el-table-column prop="股票/资料" label="股票/资料" width="135" fixed></el-table-column>
      <el-table-column sortable v-for="(i,index) in tableKeyList2" :key="index" :prop="i" :label="i" width="150">
        <template slot-scope="scope">
          {{scope.row[i] | filterA(i)}}
        </template>
      </el-table-column>
    </el-table>

    <h3>一手占比趋势</h3>
    <div id="main2" style="width: 100%;height:400px;"></div>
<!--    <div id="main3" style="width: 100%;height:400px;"></div>-->
<!--    <div id="main4" style="width: 100%;height:400px;"></div>-->
<!--    <div id="main5" style="width: 100%;height:400px;"></div>-->
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
          '甲组平均中签率',
          '一手金额',
          '公开配售倍数',
          '国际配售倍数',
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
          '公开发售手数',
          '乙组平均中签率',
          '股票代号',
        ],

        input: '', // 搜索配售券商
        temp: [],
      }
    },
    filters: {
      // 把数字转换成百分比
      filterA(value, arg1) {
        if(/一手中签率|甲组平均中签率|乙组平均中签率|公开发售占比|一手占比|一手人数占比/.test(arg1)) {
          return (value * 100).toFixed(2) + '%';
        } else if(/甲组申购金额|乙组申购金额|公开申购金额/.test(arg1)) {
          return (value / 1000000000).toFixed(4) + '亿';
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

      // 点击搜索券商
      clickSerech(name) {
        let temp;
        if(name) {
          this.temp.forEach((ele) => {
            if (ele["股票/资料"].indexOf(name) > -1 || ele.股票代号 === name) {
              temp = ele;
            }
          });

          if (temp) {
            this.tableData2 = [temp];
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
      console.log(this.tableData, this.tableKeyList);

      // 历史收益曲线 目前打新利润 = 中签后已经出售的股票,如果股票未出售不计算,因为利润并未确定,不包含打未公布的新股费用
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
      console.log(收益数组对象);

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
      console.log(个股收益对象);

      // todo 添加配售基础资料
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
      console.log(this.tableData2)

      // todo 根据港股回拨倍数将一手占比趋势分开陈列
      // 一手占比趋势
      let 一手占比趋势股票名 = [], 一手占比比例 = [];
      data.forEach((ele) => {
        for (const key in 配售对象) {
          if(key === ele.name) {
            let temp = 配售对象[key];
            if (temp.一手占比 < 1) {
              一手占比趋势股票名.push(key);
              一手占比比例.push(temp.一手占比);
            }
          }
        }
      });
      this.createChart2('main2', 一手占比趋势股票名, 一手占比比例, '比例');
      console.log(一手占比趋势股票名, 一手占比比例)

      // todo 分析港股打新人数趋势和港股打新资金趋势
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
