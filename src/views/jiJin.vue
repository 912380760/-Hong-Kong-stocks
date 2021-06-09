<template>
  <el-tabs v-model="activeName" tab-position="left" style="height: 850px;">
    <el-tab-pane v-for="item in brokerObj.操作记录" :key="item[0]"  :label="item[0]" :name="item[0]">
      <div style="margin: 10px 0;">
        <el-tag style="margin-right: 10px;">
          持仓占比: {{( item[1].持仓占比 * 100).toFixed(2) }}%
        </el-tag>
        <el-tag style="margin-right: 10px;" type="success">
          收益率: {{( item[1].收益率 * 100).toFixed(2) }}%
        </el-tag>
        <el-tag style="margin-right: 10px;" type="warning">
          收益: {{( item[1].收益).toFixed(2) }}
        </el-tag>
        <el-tag style="margin-right: 10px;" type="info">
          持仓金额: {{( item[1].持仓金额).toFixed(2) }}
        </el-tag>
      </div>

      <el-table
          :data="item[1].list"
          border
          max-height="840"
          style="width: 100%;">
        <el-table-column
            prop="操作时间"
            label="操作时间">
          <template #default="scope">
            {{ new Date(scope.row.操作时间).toLocaleDateString() }}
          </template>
        </el-table-column>
        <el-table-column
            prop="操作类型"
            label="操作类型">
          <template #default="scope">
            {{ filter(scope.row.操作类型) }}
          </template>
        </el-table-column>
        <el-table-column
            prop="基金代码"
            label="基金代码">
        </el-table-column>
        <el-table-column
            prop="购买金额"
            label="购买金额">
          <template #default="scope">
            {{ scope.row.购买金额.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
            prop="份额"
            label="份额">
          <template #default="scope">
            {{ scope.row.份额 ? scope.row.份额.toFixed(2) : '' }}
          </template>
        </el-table-column>
        <el-table-column
            prop="买入总金额"
            label="买入总金额">
          <template #default="scope">
            {{ scope.row.买入总金额.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
            prop="操作比例"
            label="操作比例">
          <template #default="scope">
            {{ (scope.row.操作比例 * 100).toFixed() + '%' }}
          </template>
        </el-table-column>
        <el-table-column
            prop="转换基金代码"
            label="转换基金代码">
        </el-table-column>
        <el-table-column
            prop="转换基金名称"
            label="转换基金名称">
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>

  <br>
  <br>
  <br>

  <el-tabs v-model="activeName2" tab-position="left" style="height: 850px;">
    <el-tab-pane v-for="item in brokerObj.按时间分类操作记录" :key="item[0]"  :label="item[0]" :name="item[0]">
<!--      <div style="margin: 10px 0;">-->
<!--        <el-tag style="margin-right: 10px;">-->
<!--          持仓占比: {{( item[1].持仓占比 * 100).toFixed(2) }}%-->
<!--        </el-tag>-->
<!--        <el-tag style="margin-right: 10px;" type="success">-->
<!--          收益率: {{( item[1].收益率 * 100).toFixed(2) }}%-->
<!--        </el-tag>-->
<!--        <el-tag style="margin-right: 10px;" type="warning">-->
<!--          收益: {{( item[1].收益).toFixed(2) }}-->
<!--        </el-tag>-->
<!--        <el-tag style="margin-right: 10px;" type="info">-->
<!--          持仓金额: {{( item[1].持仓金额).toFixed(2) }}-->
<!--        </el-tag>-->
<!--      </div>-->

      <el-table
          :data="item[1].list"
          border
          max-height="840"
          style="width: 100%;">
        <el-table-column
            prop="操作时间"
            label="操作时间">
          <template #default="scope">
            {{ new Date(scope.row.操作时间).toLocaleDateString() }}
          </template>
        </el-table-column>
        <el-table-column
            prop="操作类型"
            label="操作类型">
          <template #default="scope">
            {{ filter(scope.row.操作类型) }}
          </template>
        </el-table-column>
        <el-table-column
            prop="基金代码"
            label="基金代码">
        </el-table-column>
        <el-table-column
            prop="基金名称"
            label="基金名称">
        </el-table-column>
        <el-table-column
            prop="购买金额"
            label="购买金额">
          <template #default="scope">
            {{ scope.row.购买金额.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
            prop="操作比例"
            label="操作比例">
          <template #default="scope">
            {{ (scope.row.操作比例 * 100).toFixed() + '%' }}
          </template>
        </el-table-column>
        <el-table-column
            prop="转换基金代码"
            label="转换基金代码">
        </el-table-column>
        <el-table-column
            prop="转换基金名称"
            label="转换基金名称">
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import ajax from "axios";
import { 获取多个基金历史净值并下载, 获取基金分红历史记录并下载 } from '../utils/downloadData'

export default {
  name: "jiJin",
  setup() {
    let brokerObj = reactive({
      操作记录: [],
      按时间分类操作记录: [],
    });
    let activeName = ref('');
    let activeName2 = ref('');

    function filter(val) {
      switch (val) {
        case '001':
          return '转入'
        case '022':
          return '买入'
        case '023':
          return '分红'
        case '024':
          return '卖出'
        case '036':
          return '转出'
      }
    }

    onMounted(async () => {
      const 螺丝钉收益率 = await ajax({
        url: '/djapi/plan/position/detail?plan_code=CSI666',
        method: 'get'
      }).then(res => res.data.data.items)
      const 螺丝钉收益率表 = {};
      螺丝钉收益率.forEach(ele => {
        const {fd_code, fd_name, total_gain_rate} = ele;
        螺丝钉收益率表[fd_name] = {
          name: fd_name,
          code: fd_code,
          收益率: total_gain_rate
        }
      });
      console.log(螺丝钉收益率表)

      const 螺丝钉组合基金历史净值 = await ajax({
        url: '/data/螺丝钉组合基金历史净值.json',
        method: 'get',
      }).then(res => res.data);
      console.log(螺丝钉组合基金历史净值)

      const 螺丝钉组合基金历史分红 = await ajax({
        url: '/data/螺丝钉组合基金历史分红.json',
        method: 'get',
      }).then(res => res.data);
      console.log(_.cloneDeep(螺丝钉组合基金历史分红))

      const 螺丝钉组合历史调仓 = await ajax({
        url: '/data/螺丝钉组合历史调仓.json',
        method: 'get',
      }).then(res => res.data);
      console.log(螺丝钉组合历史调仓)

      const [操作记录, 按时间分类操作记录] = 格式化调仓记录(螺丝钉组合历史调仓, 螺丝钉组合基金历史净值, 螺丝钉组合基金历史分红);
      brokerObj.操作记录 = 操作记录;
      brokerObj.按时间分类操作记录 = 按时间分类操作记录;
      activeName.value = brokerObj.操作记录[0][0];
      console.log(brokerObj.按时间分类操作记录)
      activeName2.value = brokerObj.按时间分类操作记录[0][0];

      const 债券类基金 = ["南方安裕混合C", "东方红策略精选C", "工银双利债券B", "广发趋势优选混合C", "鹏扬泓利债券C",
        "南方宝元债券C", "大成景安短融债券E"];
      // const 债券类基金 = [];

      let 总收益 = 0, 总成本 = 0, 债券总持仓 = 0;
      // 计算总收益率
      brokerObj.操作记录.forEach(ele => {
        const {买入总金额} = ele[1];
        const name = ele[0];
        if(债券类基金.indexOf(name) === -1) {
          const 卖出金额 = ele[1].卖出金额 || 0;

          总收益 += (螺丝钉收益率表[name].收益率 / 100 * 买入总金额);
          总成本 += (买入总金额 - 卖出金额);
        } else {
          债券总持仓 += ele[1].持仓金额;
        }
      });
      console.log(总收益, 总成本, 债券总持仓)

      console.log(brokerObj.操作记录)
      let list = 循环获取下载所需数组(brokerObj.操作记录)
      // console.log(list)
      // 下载多个基金净值历史数据
      // 获取基金分红历史记录并下载(list)
      // 获取多个基金历史净值并下载(list)
    });

    return {
      brokerObj,
      activeName,
      activeName2,
      filter,
    }
  }
}

/**
 * 格式化调仓记录
 * @param 螺丝钉组合历史调仓
 * @param 螺丝钉组合基金历史净值
 * @param 螺丝钉组合基金历史分红
 * @return {T[]}
 */
function 格式化调仓记录(螺丝钉组合历史调仓, 螺丝钉组合基金历史净值, 螺丝钉组合基金历史分红) {
  let myMap = new Map();
  let myDateMap = new Map();
  螺丝钉组合历史调仓.reverse().forEach((ele) => {
    const { trade_date, trading_elements } = ele;
    trading_elements.forEach((ele2) => {
      const { money, fd_name, action, portion, target_fd_name, target_fd_code, fd_code } = ele2;
      const item = {
        操作类型: action, // 036转换 022买入 024卖出
        更新时间: trade_date,
        操作时间: trade_date,
        基金代码: fd_code,
        基金名称: fd_name,
        操作比例: portion,
        购买金额: money,
        转换基金代码: target_fd_code,
        转换基金名称: target_fd_name,
      }
      test(myMap, item, 螺丝钉组合基金历史净值, 螺丝钉组合基金历史分红, myDateMap);
    });
  });
  console.log(myDateMap)

  // 补充分红,分红前买入,至今未操作
  for (const key in 螺丝钉组合基金历史分红) {
    const item = 螺丝钉组合基金历史分红[key];
    if (item.length > 0) {
      const mapData = myMap.get(key);
      for (let i = 0; i < item.length; i++) {
        const ele = item[i];
        const 净值 = 计算基金净值(螺丝钉组合基金历史净值, key, ele.tradedate, ele.tradedate - 1000 * 60 * 60 * 24);
        const 购买金额2 = mapData.份额 * ele.div * 净值
        if(!mapData.卖出金额) {
          mapData.卖出金额 = 购买金额2;
        } else {
          mapData.卖出金额 += 购买金额2;
        }
        // const item2 = {
        //   操作类型: '023', // 036转换 022买入 024卖出
        //   操作时间: new Date(ele.tradedate),
        //   基金代码: mapData.list[0].基金代码,
        //   基金名称: key,
        //   操作比例: ele.div,
        //   购买金额: mapData.份额 * ele.div * 净值,
        // }
        item.shift();
        i -= 1;
        // test(myMap, item2, 螺丝钉组合基金历史净值, 螺丝钉组合基金历史分红);
      }
    }
  }

  let 总持仓金额 = 0;
  myMap.forEach(ele => {
    const { 份额 } = ele;
    const 净值 = 计算基金净值(螺丝钉组合基金历史净值, ele.list[0].基金名称, '2021/4/30', '2021/4/29');
    ele.持仓金额 = 净值 * 份额;
    总持仓金额 += (净值 * 份额);
  });
  let 总盈利 = 0;
  myMap.forEach(ele => {
    ele.list.reverse();
    const { 卖出金额, 买入总金额 } = ele;
    const 净值 = 计算基金净值(螺丝钉组合基金历史净值, ele.list[0].基金名称, '2021/4/30', '2021/4/29');

    ele.持仓占比 = ele.持仓金额 / 总持仓金额;

    let 收益率;
    if (卖出金额) {
      收益率 = (ele.持仓金额 + 卖出金额) / 买入总金额 - 1;
    } else {
      收益率 = ele.持仓金额 / 买入总金额 - 1;
    }
    ele.收益率 = 收益率;
    ele.收益 = 卖出金额 ? ele.持仓金额 + 卖出金额 - 买入总金额 : ele.持仓金额 - 买入总金额;
    总盈利 += ele.收益;
  });
  console.log(总持仓金额, 总盈利)
  console.log(myMap)

  return [[...myMap].reverse(), [...myDateMap].reverse()];
}

function test(myMap, item, 螺丝钉组合基金历史净值, 螺丝钉组合基金历史分红, myDateMap) {
  const {
    操作类型, // 036转换 022买入 024卖出
    更新时间,
    操作时间,
    基金代码,
    基金名称,
    操作比例,
    购买金额,
    转换基金代码,
    转换基金名称,
  } = item;
  const 国际化后操作时间 = new Date(更新时间).toLocaleDateString();

  const mapData = myMap.get(基金名称);
  const mapData2 = myDateMap.get(国际化后操作时间);
  const 基金历史分红 = 螺丝钉组合基金历史分红[基金名称]
  const 份额 = 计算基金份额(螺丝钉组合基金历史净值, 基金名称, 购买金额, 操作时间);
  const 净值 = 计算基金净值(螺丝钉组合基金历史净值, 基金名称, 操作时间, 操作时间 - 1000 * 60 * 60 * 24);


  if(!mapData) {
    const mapItem = {
      list: [
        {
          ...item,
          买入总金额: 购买金额,
          份额,
        },
      ],
      买入总金额: 购买金额,
      份额,
    }
    myMap.set(基金名称, mapItem);
  } else {
    if(操作类型 !== '023') {
      mapData.买入总金额 += 购买金额;
    }
    mapData.份额 += 份额;

    mapData.list.push({
      ...item,
      买入总金额:  mapData.买入总金额,
      份额: mapData.份额,
    });
  }

  if (!mapData2) {
    myDateMap.set(国际化后操作时间, {
      list: [
        {
          ...item,
        }
      ]
    });
  } else {
    mapData2.list.push({
      ...item
    });
  }

  // 分红
  基金历史分红.reverse();
  for (let i = 0; i < 基金历史分红.length; i++) {
    const ele = 基金历史分红[i];
    const 净值2 = 计算基金净值(螺丝钉组合基金历史净值, 基金名称, new Date(ele.tradedate), new Date(ele.tradedate) - 1000 * 60 * 60 * 24);
    if(new Date(ele.tradedate) < new Date(操作时间)) {
      if (mapData) {
        // console.log(mapData.份额, 基金名称)
        const 购买金额2 = mapData.份额 * ele.div * 净值2;
        if(!mapData.卖出金额) {
          mapData.卖出金额 = 购买金额2;
        } else {
          mapData.卖出金额 += 购买金额2;
        }
        // const tempItem2 = {
        //   操作类型: '023', // 036转换 022买入 023分红 024卖出
        //   操作时间: new Date(ele.tradedate),
        //   基金代码: 基金代码,
        //   基金名称: 基金名称,
        //   操作比例: ele.div,
        //   购买金额: 购买金额2,
        // };
        基金历史分红.shift();
        i -= 1;
        // test(myMap, tempItem2, 螺丝钉组合基金历史净值, 螺丝钉组合基金历史分红);
      } else {
        基金历史分红.shift();
        i -= 1;
      }
    }
  }

  if (操作类型 === '024' || 操作类型 === '036') {
    const 卖出金额 = 操作比例 * mapData.份额 * 净值 * 0.9975;
    mapData.份额 *= (1 - 操作比例);
    if(!mapData.卖出金额) {
      mapData.卖出金额 = 卖出金额;
    } else {
      mapData.卖出金额 += 卖出金额;
    }

    // 转换
    if (操作类型 === '036') {
      const tempItem = {
        操作类型: '001', // 036转换 022买入 024卖出 001转入
        更新时间: 操作时间,
        操作时间: 操作时间 + 1000 * 60 * 60 * 24,
        基金代码: 转换基金代码,
        基金名称: 转换基金名称,
        操作比例: 0,
        购买金额: 卖出金额,
        转换基金代码: 基金代码,
        转换基金名称: 基金名称,
      };
      // 递归将转化基金增加为买入
      test(myMap, tempItem, 螺丝钉组合基金历史净值, 螺丝钉组合基金历史分红, myDateMap);
    }
  }
}

/**
 * 计算基金净值
 * @param 螺丝钉组合基金历史净值
 * @param 买入基金名称
 * @param 买入日期
 * @param 买入日期2
 * @return {number}
 */
function 计算基金净值(螺丝钉组合基金历史净值, 买入基金名称, 买入日期, 买入日期2) {
  const item = 螺丝钉组合基金历史净值[买入基金名称];
  const dataString = new Intl.DateTimeFormat('zh', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false
  }).format(new Date(买入日期)).replace(/\//g, '-');
  let 净值 = 0;
  item.forEach(ele => {
    if(ele.date === dataString) {
      净值 = ele.nav;
    }
  });

  // 第二买入日期净值
  if (!净值) {
    const dataString = new Intl.DateTimeFormat('zh', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour12: false
    }).format(new Date(买入日期2)).replace(/\//g, '-');
    item.forEach(ele => {
      if(ele.date === dataString) {
        净值 = ele.nav;
      }
    });
  }
  return 净值;
}

/**
 * 计算基金份额
 * @param 螺丝钉组合基金历史净值
 * @param 买入基金名称
 * @param 买入总金额
 * @param 买入日期
 * @return {number}
 */
function 计算基金份额(螺丝钉组合基金历史净值, 买入基金名称, 买入总金额, 买入日期) {
  const item = 螺丝钉组合基金历史净值[买入基金名称];
  const dataString = new Intl.DateTimeFormat('zh', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour12: false
  }).format(new Date(买入日期)).replace(/\//g, '-');
  let 份额 = 0;
  item.forEach(ele => {
    if(ele.date === dataString) {
      份额 = 买入总金额 / ele.nav * 0.9988;
    }
  });
  return 份额
}

/**
 * 循环获取下载所需数组
 * @param 操作记录 list
 * @return [{name, code, size}]
 */
function 循环获取下载所需数组(操作记录) {
  return 操作记录.reduce((obj, ele) => {
    const { list } = ele[1];
    const {基金名称} = list[0];
    const size = ( new Date() - new Date(list[list.length - 1].trade_date) )
        / (1000 * 60 * 60 * 24);
    obj.push({
      name: ele[0],
      code: 基金名称,
      size: parseInt(size)
    });
    return obj;
  }, []);
}
</script>

<style scoped>

</style>
