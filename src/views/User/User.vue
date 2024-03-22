<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>普通用户</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="div_mom">
      <div style="width: 80%;margin-left: auto;margin-right: auto;text-align: center">
        <el-input
          placeholder="请输入账号或昵称查找"
          prefix-icon="el-icon-search"
          class="search-input"
          style="width: 50%"
          v-model="SearchData"
          clearable
        ></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="Search(SearchData)">查找</el-button>
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
              <el-image style="width: 50px; height: 50px" :src="scope.row.uavatar" fit="fit"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="账号" prop="uname"></el-table-column>
        <el-table-column label="昵称" prop="unickname"></el-table-column>
        <el-table-column label="性别" prop="ugender"></el-table-column>
        <el-table-column label="登录状态">
          <template slot-scope="scope">
            <span v-if=" scope.row.uis === false">正常</span>
            <span v-else>禁止登录</span>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" prop="udate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="block">
              <el-button-group>
                <el-button
                  type="danger"
                  size="mini"
                  v-if="scope.row.uis === false"
                  @click="user_ban(scope.row._id,'-1')"
                >禁止登录</el-button>

                <el-button
                  type="primary"
                  size="mini"
                  style="margin-left:5px;"
                  v-else
                  @click="user_ban(scope.row._id,'0')"
                >解封</el-button>
              </el-button-group>
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
    this.$get({}, "/login/normaluser")
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
    user_ban(id, type) {
      let flag = false;
      if (type === "-1") {
        //解封
        flag = !flag;
      }
      this.$get({ id: id, type: flag }, "/login/userban")
        .then(res => {
          //   console.log(res);
          this.$msg.success(res.msg);
          this.$get({}, "/login/normaluser").then(res => {
            // console.log(res);
            this.gridData = res.data;
            this.oriData = res.data;
          });
        })
        .catch(err => {
          this.$msg.fail(err);
        });
    },

    Search(data) {
      this.gridData = this.gridData.filter(el => {
        return el.uname.indexOf(data) > -1 || el.unickname.indexOf(data) > -1;
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