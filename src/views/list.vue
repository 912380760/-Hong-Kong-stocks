<template>
  <div class="hello" style="margin: 0 10px;">
    <h3>配售基础资料,2020年</h3>

    <div class="box">
      <el-input class="input" placeholder="请输入股票名称" clearable v-model="selectName" @keyup.enter.native="clickSearch(selectName, dataObj)">
        <template #append>
          <el-button @click="clickSearch(selectName, dataObj)" slot="append" icon="el-icon-search"></el-button>
        </template>
      </el-input>
      <div class="text">模糊匹配,支持股票代码,可以搜索多个,用逗号隔开</div>
    </div>

    <el-table :data="dataObj.tableData" style="width: 100%;" border height="700px" id="tableData2">
      <el-table-column prop="name" label="股票/资料" width="160" fixed></el-table-column>
      <el-table-column sortable v-for="(i,index) in tableKeyList2" :key="index" :prop="i" :label="i" width="130">
        <template #default="scope">
          {{ filters(scope.row[i], i)}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 配售数据
import data from '../utils/CreateData';
import { reactive, ref, watch } from "vue";


// fetch("https://jybdata.iqdii.com/jybapp/IPOService/GetPlacingResult?v=0.7584351378209115&lang=chs", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "zh-CN,zh;q=0.9",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "cross-site"
//   },
//   "referrer": "https://www.aipo.org/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "{\"code\":\"E06622\",\"count\":\"-1\"}",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "omit"
// });

export default {
  name: 'list',
  setup() {
    const dataObj = reactive({
      // 配售基础资料表格
      tableData: _.cloneDeep(data),
    });
    // 搜索配售券商
    let selectName = ref('');

    // 配售基础资料表格Key List
    const tableKeyList2 = [
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
      '公开募资金额',
      '公开发售手数',
      '股票代号',
      '上市日期',
    ]

    // 如果搜索值为空,还原table
    watch(selectName, (newValue) => {
      if (newValue === '') {
        dataObj.tableData = _.cloneDeep(data)
      }
    })

    return {
      dataObj,
      tableKeyList2,
      selectName,
      clickSearch,
      filters
    }
  }
}

/**
 * 点击搜索股票
 * @param selectName
 * @param tableData
 */
function clickSearch(selectName, dataObj) {
  let temp = [];
  if(selectName) {
    const nameList = selectName.split(',');
    nameList.forEach((element) => {
      dataObj.tableData.forEach((ele) => {
        if (ele.name.indexOf(element) > -1 || ele.股票代号 === element) {
          temp.push(ele);
        }
      });
    })
    if (temp.length > 0) {
      dataObj.tableData = temp;
    } else {
      this.$message('未找到该股票');
    }
  } else {
    dataObj.tableData = _.cloneDeep(data);
  }
}

function filters(value, arg1) {
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
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  display: flex;
  /*justify-content: space-between;*/
  margin-bottom: 20px;
}
.input {
  width: 350px;
}
.text {
  margin-left: 20px;
  line-height: 40px;
}
</style>
