<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>帖子管理</el-breadcrumb-item>
      <el-breadcrumb-item>合格帖子</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="div_mom">
      <div style="width: 80%;margin-left: auto;margin-right: auto;text-align: center">
        <el-input
          placeholder="请输入帖子标题或作者查找"
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
        <el-table-column label="文章标题" prop="thead"></el-table-column>
        <el-table-column label="文章作者" prop="tname"></el-table-column>
        <el-table-column label="创建时间" prop="tdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="deleteTopic(scope.row._id)"
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
      SearchData: "" //查找
    };
  },
  mounted() {
    this.$get({ type: "1" }, "/topic/adminalltopics")
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
    //删除帖子
    deleteTopic(id) {
      this.$post({ id: id }, "/topic/deletetopicid")
        .then(res => {
          this.$msg.success(res.msg);
          this.$get({ type: "1" }, "/topic/adminalltopics").then(res => {
            this.gridData = res.data;
            this.oriData = res.data;
          });
        })
        .catch(err => {
          this.$msg.fail(err);
        });
    },
    //页面查找帖子
    Search(data) {
      this.gridData = this.gridData.filter(el => {
        return el.thead.indexOf(data) > -1 || el.tname.indexOf(data) > -1;
      });
    }
  },
  watch: {
    SearchData(newdata) {
      if (newdata.trim().length === 0) {
        this.gridData = this.oriData;
        this.total = this.gridData.length;
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