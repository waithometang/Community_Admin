<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="div_mom">
      <div style="width: 80%;margin-left: auto;margin-right: auto;text-align: center">
        <el-input
          placeholder="请输入账号或日期查找"
          prefix-icon="el-icon-search"
          class="search-input"
          style="width: 50%"
          v-model="SearchData"
          clearable
        ></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="search(SearchData)">查找</el-button>
      </div>
    </div>
    <br />
    <div class="div_mom">
      <el-table
        ref="table"
        :data="gridData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe
        style="width:100%"
      >
        <el-table-column label="头像">
          <template slot-scope="scope">
            <div class="block">
              <el-image style="width: 50px; height: 50px" :src="scope.row.aavatar" fit="fit"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="账号" prop="aname"></el-table-column>
        <el-table-column label="注册时间" prop="date"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="block" v-if="$store.state.usrinfo.aname === 'root'">
              <el-button-group>
                <el-button
                  type="primary"
                  size="mini"
                  style="margin-left:5px;"
                  v-if="scope.row._id !== $store.state.usrinfo._id"
                  @click="user_del(scope.row._id)"
                >删除</el-button>
                <el-tag type="success" v-else>我</el-tag>
              </el-button-group>
            </div>
            <div class="block" v-else-if="scope.row.aname === $store.state.usrinfo.aname">
              <el-tag type="success">我</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:30px"
        @current-change="current_change"
        :page-sizes="[10]"
        :page-size="pagesize"
        :current-page="currentPage"
        background
        layout="total, sizes, prev, pager, next"
        :total="gridData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gridData: [],
      oriData: [],
      page: 0,
      sizes: 0,
      total: 0, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      SearchData: ""
    };
  },
  mounted() {
    this.$get({}, "/login/root")
      .then(res => {
        this.gridData = res.data;
        this.oriData = res.data;
      })
      .catch(err => {
        this.$msg.fail(err);
      });
  },
  methods: {
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    //删除管理员 只有root用户有权限删除
    user_del(id) {
      this.$get({ id: id }, "/login/deleteroot")
        .then(res => {
          this.$msg.success(res.msg);
          this.$get({}, "/login/root").then(res => {
            this.gridData = res.data;
            this.oriData = res.data;
          });
        })
        .catch(err => {
          this.$msg.fail(err);
        });
    },
    search(data) {
      this.gridData = this.gridData.filter(el => {
        return el.aname.indexOf(data) > -1 || el.date.indexOf(data) > -1;
      });
    }
  },
  watch: {
    SearchData(current) {
      if (current.trim().length === 0) {
        this.gridData = this.oriData;
      }
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  height: 50px;
  border-bottom: 1px solid #ccc;
}
</style>