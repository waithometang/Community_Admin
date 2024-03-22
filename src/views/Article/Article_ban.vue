<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>未通过</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="div_mom">
      <div style="width: 80%;margin-left: auto;margin-right: auto;text-align: center">
        <el-input
          placeholder="请输入文章标题或作者查找"
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
        :data="gridData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        stripe
        style="width:100%"
      >
        <el-table-column label="封面">
          <template slot-scope="scope">
            <div class="block">
              <el-image style="width: 50px; height: 50px" :src="scope.row.pimg" fit="fit"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="文章标题" prop="phead"></el-table-column>
        <el-table-column label="文章分类" prop="psort"></el-table-column>
        <el-table-column label="文章作者" prop="pauthor"></el-table-column>
        <el-table-column label="创建时间" prop="pdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="checkout(scope.row._id)"
              icon="el-icon-delete"
              type="danger"
              size="small"
            >删除</el-button>
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
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      SearchData: ""
    };
  },
  mounted() {
    this.$get({ type: "-1" }, "/posts/findarticle")
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
    //删除文章
    checkout(id) {
      this.$post({ id: id }, "/posts/deletearticleid")
        .then(res => {
          this.$msg.success(res.msg);
          this.$get({ type: "-1" }, "/posts/findarticle").then(res => {
            this.gridData = res.data;
            this.oriData = res.data;
          });
        })
        .catch(err => {
          this.$msg.fail(err);
        });
      // console.log(id);
    },
    Search(data) {
      this.gridData = this.gridData.filter(el => {
        return el.pauthor.indexOf(data) > -1 || el.phead.indexOf(data) > -1;
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
