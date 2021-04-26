<template>
  <el-alert
      style="margin-top: 10px"
      :closable="false"
      title="排名根据个人体验,综合考虑APP体验、额度、融资倍数、暗盘、一手融资、佣金等."
      type="success">
  </el-alert>
  <el-table
      :data="qsList"
      v-if="qsList.length > 0"
      border
      stripe
      height="800"
      style="width: 100%;margin-top: 10px;">
    <el-table-column
        prop="name"
        label="券商">
      <template #default="scope">
        <div style="display:flex;line-height: 40px;width: 120px;">
          <img :src="`./icon/${scope.row.name}.png`" style="width: 40px;margin-right: 10px;" alt="">
          <span>
              {{ scope.row.name }}
            </span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="认购费用">
      <el-table-column
          sortable
          width="120"
          prop="现金认购费"
          label="现金认购费">
        <template #default="scope">
          {{ scope.row.现金认购费 === -1 ? '不支持' : scope.row.现金认购费 }}
        </template>
      </el-table-column>
      <el-table-column
          prop="融资认购费"
          label="融资认购费">
      </el-table-column>
    </el-table-column>

    <el-table-column label="认购细节">
      <el-table-column
          prop="融资倍数"
          label="融资倍数">
      </el-table-column>
      <el-table-column
          prop="融资额度"
          label="融资额度">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.融资额度 === 2">充足</el-tag>
          <el-tag v-else-if="scope.row.融资额度 === 1">一般</el-tag>
          <el-tag type="danger" v-else>少</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="融资一手"
          label="一手融">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.融资一手 === 1">支持</el-tag>
          <el-tag type="danger" v-if="scope.row.融资一手 === 0">不支持</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="认购取消"
          label="认购取消">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.认购取消 === 1">免费</el-tag>
          <el-tag v-else-if="scope.row.认购取消 === 2">融资收费</el-tag>
          <el-tag type="danger" v-else-if="scope.row.认购取消 === 0">禁止</el-tag>
          <el-tag type="danger" v-else>融资禁止</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="暗盘"
          label="暗盘">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.暗盘 === 1">支持</el-tag>
          <el-tag type="danger" v-if="scope.row.暗盘 === 0">不支持</el-tag>
        </template>
      </el-table-column>
    </el-table-column>

    <el-table-column label="交易成本">
      <el-table-column
          prop="交易万元佣金"
          label="交易万元佣金"
          width="110">
      </el-table-column>
      <el-table-column
          prop="港股平台费"
          label="平台费">
      </el-table-column>
      <el-table-column
          sortable
          width="130"
          prop="综合交易佣金"
          label="综合交易佣金">
      </el-table-column>
      <el-table-column
          prop="出金手续费"
          label="出金手续费">
      </el-table-column>
      <el-table-column
          prop="出金结算时间"
          label="出金结算时间"
          width="110">
      </el-table-column>
    </el-table-column>

    <!--    <el-table-column-->
    <!--        prop="软件下载"-->
    <!--        label="软件下载">-->
    <!--      <template #default="scope">-->
    <!--        <a :href="scope.row.软件下载" target="_blank">-->
    <!--          <el-button size="small" type="primary">下载<i class="el-icon-download el-icon&#45;&#45;right"></i></el-button>-->
    <!--        </a>-->
    <!--      </template>-->
    <!--    </el-table-column>-->
    <!--    <el-table-column-->
    <!--        prop="开户链接"-->
    <!--        label="开户链接">-->
    <!--      <template #default="scope">-->
    <!--        <a v-if="scope.row.开户链接" :href="scope.row.开户链接" target="_blank">-->
    <!--          开户链接-->
    <!--        </a>-->
    <!--        <span v-else>开户麻烦,详询</span>-->
    <!--      </template>-->
    <!--    </el-table-column>-->
  </el-table>
</template>

<script>
import browser from '../assets/brokerList';
import { reactive } from 'vue';

export default {
  name: 'qs',
  setup() {
    const qsArr = [ '华泰', '盈立', '老虎', '辉立', '恒大', '富途', '富昌', '耀才', '尊嘉', '有鱼', '青石', '华赢',
      '艾德', '阿尔法', '易昇', '方德', '富元', '东财', '华盛通', '微牛'];
    let qsList = reactive([]);
    qsList = qsArr.map(ele => {
      const element = browser[ele];
      const 交易万元佣金 = Math.max(element.最低佣金, element.佣金 * 10000);
      return Object.assign({
        name: ele,
        交易万元佣金,
        综合交易佣金: 交易万元佣金 + element.港股平台费,
      }, element);
    });

    return { qsList };
  },
}
</script>
