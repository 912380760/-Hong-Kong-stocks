<template>
  <h3>申购记录</h3>
  <el-tabs v-model="activeName" tab-position="left" style="height: 800px;" v-loading="loading">
    <el-tab-pane v-for="item in brokerObj.打新记录" :key="item.name"  :label="item.name" :name="item.name">
      <el-table
          :data="item.list"
          :summary-method="getSummaries"
          :row-class-name="tableRowClassName"
          border
          show-summary
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
          <template #default="scope">
            {{ scope.row.打新类型.split('打新')[0] + scope.row.打新手数 + '手' }}
          </template>
        </el-table-column>
        <el-table-column
            prop="申购金额"
            label="融资倍数">
          <template #default="scope">
            {{ scope.row.融资比例 !== 1 ? (1 / (1 - scope.row.融资比例)).toFixed(0) + '倍' : '白嫖' }}
          </template>
        </el-table-column>
        <el-table-column
            sortable
            prop="中签数"
            label="中签数">
          <template #default="scope">
            {{ scope.row.中签数 ? scope.row.中签数 + '手' : '' }}
          </template>
        </el-table-column>
        <el-table-column
            sortable
            prop="资金占用"
            label="资金占用">
          <template #default="scope">
            {{scope.row.资金占用.toFixed(0) + '元'}}
          </template>
        </el-table-column>
        <el-table-column
            sortable
            prop="申购成本"
            label="申购成本">
          <template #default="scope">
            {{scope.row.申购成本.toFixed(0) + '元'}}
          </template>
        </el-table-column>
        <el-table-column
            sortable
            prop="盈亏"
            label="盈亏">
          <template #default="scope">
            {{scope.row.盈亏.toFixed(0) + '元'}}
          </template>
        </el-table-column>
        <el-table-column
            sortable
            prop="百分比收益"
            label="百分比收益">
          <template #default="scope">
            {{ (scope.row.百分比收益 * 100).toFixed(2) + '%' }}
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>

  <h3>申购合计</h3>
  <el-table
      v-loading="loading"
      :data="brokerObj.打新记录"
      :summary-method="getSummaries"
      show-summary
      border
      stripe
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
      <template #default="scope">
        {{ scope.row.手数 + '手' }}
      </template>
    </el-table-column>
    <el-table-column
        prop="申购金额"
        label="平均融资倍数">
      <template #default="scope">
        {{ scope.row.融资倍数 !== Infinity ? scope.row.融资倍数.toFixed(0) + '倍' : '白嫖' }}
      </template>
    </el-table-column>
    <el-table-column
        sortable
        prop="中签数"
        label="中签数">
      <template #default="scope">
        {{ scope.row.中签数 ? scope.row.中签数 + '手' : '' }}
      </template>
    </el-table-column>
    <el-table-column
        sortable
        prop="资金占用"
        label="资金占用">
      <template #default="scope">
        {{ scope.row.资金占用.toFixed(0) + '元' }}
      </template>
    </el-table-column>
    <el-table-column
        sortable
        prop="申购成本"
        label="申购成本">
      <template #default="scope">
        {{scope.row.申购成本.toFixed(0) + '元'}}
      </template>
    </el-table-column>
    <el-table-column
        sortable
        prop="盈亏"
        label="盈亏">
      <template #default="scope">
        {{ scope.row.盈亏.toFixed(0) + '元' }}
      </template>
    </el-table-column>
    <el-table-column
        sortable
        prop="百分比收益"
        label="百分比收益">
      <template #default="scope">
        {{ (scope.row.百分比收益 * 100).toFixed(2) + '%' }}
      </template>
    </el-table-column>
    <el-table-column
        sortable
        prop="申购金额"
        label="申购金额">
      <template #default="scope">
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

  <h3>券商收益</h3>

</template>

<script>
import { onMounted, reactive, ref } from "vue";

import ipoHistory from '../assets/data'
import data from '../assets/stockList';
import brokerList from "../assets/brokerList";
import { 获取IPO数据, 合并IPO数据, 计算打新记录, 历史收益曲线计算 } from '../utils/CreateBroker'
import { createChart } from '../utils/createChart'

export default {
  name: 'index',
  setup() {
    let brokerObj = reactive({
      打新记录: []
    });
    let activeName = ref('');
    let loading = ref(true);

    onMounted(async () => {
      const ipoData = await 获取IPO数据(ipoHistory);
      const recording = 合并IPO数据(ipoData, data);
      brokerObj.打新记录 = 计算打新记录(recording, brokerList);
      console.log(brokerObj.打新记录)

      activeName.value = brokerObj.打新记录[0].name;
      loading.value = false;
      const {
        收益日期,
        收益利润,
      } = 历史收益曲线计算(brokerObj.打新记录);
      createChart('main', 收益日期, 收益利润, 'line', '收益');
    });

    return {
      brokerObj,
      activeName,
      loading,
      getSummaries,
      tableRowClassName
    }
  }
}

// 合计
function getSummaries(param) {
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
}

// 中签行变色
function tableRowClassName({row, rowIndex}) {
  if (row.中签数 > 0) {
    return 'success-row';
  }
  return '';
}

</script>

<style>
.el-table .success-row {
  background: #f0f9eb;
}
</style>
