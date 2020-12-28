<template>
  <div>
    <p>
      排名根据个人体验,综合考虑APP体验、额度、融资倍数、暗盘、一手融资、佣金等.
    </p>
    <el-table
        :data="qsList"
        border
        style="width: 100%;margin-top: 20px;">
      <el-table-column
          prop="name"
          label="券商">
        <template slot-scope="scope">
          <div style="display:flex;line-height: 40px;width: 120px;">
            <img :src="`./icon/${scope.row.name}.png`" style="width: 40px;margin-right: 10px;" alt="">
            <span>
              {{ scope.row.name }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="现金认购费"
          label="现金认购费">
        <template slot-scope="scope">
          {{ scope.row.现金认购费 === -1 ? '不支持' : scope.row.现金认购费 }}
        </template>
      </el-table-column>
      <el-table-column
          prop="融资认购费"
          label="融资认购费">
      </el-table-column>
      <el-table-column
          prop="融资倍数"
          label="融资倍数">
      </el-table-column>
      <el-table-column
          prop="融资额度"
          label="融资额度">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.融资额度 === 2">充足</el-tag>
          <el-tag v-if="scope.row.融资额度 === 1">一般</el-tag>
          <el-tag type="danger" v-if="scope.row.融资额度 === 0">少</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="融资一手"
          label="融资一手">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.融资一手 === 1">支持</el-tag>
          <el-tag type="danger" v-if="scope.row.融资一手 === 0">不支持</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="暗盘"
          label="暗盘">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.暗盘 === 1">支持</el-tag>
          <el-tag type="danger" v-if="scope.row.暗盘 === 0">不支持</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="美股打新"
          label="美股打新">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.美股打新 === 1">支持</el-tag>
          <el-tag type="danger" v-if="scope.row.美股打新 === 0">不支持</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="佣金说明"
          label="佣金">
      </el-table-column>
      <el-table-column
          prop="港股平台费"
          label="平台费">
      </el-table-column>
      <el-table-column
          prop="软件下载"
          label="软件下载">
        <template slot-scope="scope">
          <a :href="scope.row.软件下载" target="_blank">
            <i class="el-icon-download" style="font-size: 20px;"></i>
          </a>
        </template>
      </el-table-column>
      <el-table-column
          prop="开户链接"
          label="开户链接">
        <template slot-scope="scope">
          <a v-if="scope.row.开户链接" :href="scope.row.开户链接" target="_blank">
            开户链接
          </a>
          <span v-else>开户麻烦,详询</span>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
 import browser from '@/assets/brokerList';

 // 券商排序
 let qsArr = ['华泰', '恒大', '老虎', '辉立', '富途', '富昌', '耀才', '华赢', '易昇', '雪盈', '华盛通', '尊嘉', '友信', '阿尔法', '艾德', '有鱼', '青石', '长桥', '利弗莫尔', '玖富', '东财', '方德', '第一上海', '佳兆业', '盈路'];
 console.log(qsArr.length)
 let qsList = [];
 qsArr.forEach(ele => {
   qsList.push(Object.assign({
     name: ele,
   }, browser[ele]) );
 })
 console.log(qsList);

 export default {
   name: 'qs',
   data() {
     return {
       qsList,
     }
   },
 }
</script>
