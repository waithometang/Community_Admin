<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>帖子管理</el-breadcrumb-item>
      <el-breadcrumb-item>待审核帖子</el-breadcrumb-item>
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
        <el-button type="primary" style="margin-left: 20px" @click="search(SearchData)">查找</el-button>
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
              @click="checkout(scope.row._id)"
              icon="el-icon-circle-check"
              type="primary"
              size="small"
            >审核内容</el-button>
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
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog :visible.sync="dialog.visible" width="800px" title="帖子审核">
      <div>
        <div style="text-align: center;font-weight: bold;">{{dialog.content.thead}}</div>
        <p style="text-indent: 20px;line-height: 25px;">{{dialog.content.tcontent}}</p>
        <div v-if="dialog.content.timage" style="margin-top:10px;border-radius: 5px;">
          <img
            v-for="(item,index) in dialog.content.timage"
            :src="item"
            :key="'img'+index"
            width="750px"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-form label-width="80px">
          <el-form-item label="拒绝理由">
            <el-input placeholder="审核不通过必须填写原因,未通过会自动删除帖子" v-model="reason"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          size="small"
          type="danger"
          @click="check(dialog.content._id,'-1')"
          :disabled="disable"
        >不通过</el-button>
        <el-button
          type="primary"
          size="small"
          @click="check(dialog.content._id,'1')"
          :disabled="!disable"
        >通 过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gridData: [],
      page: 0,
      sizes: 0,
      total: 0, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      SearchData: "",
      temp: [],
      temptotal: 0,
      dialog: {
        visible: false,
        content: ""
      },
      reason: "", //拒绝理由
      disable: true // 按钮
    };
  },
  mounted() {
    this.$get({ type: "0" }, "/topic/adminalltopics")
      .then(res => {
        this.gridData = res.data;
        this.temp = res.data;
        this.total = res.data.length;
      })
      .catch(err => {
        this.$msg.fail(err);
      });
  },
  methods: {
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    //查看帖子
    checkout(id) {
      this.dialog.visible = true;
      this.$get({ type: id }, "/topic/single")
        .then(res => {
          this.dialog.visible = true;
          this.dialog.content = res.data;
        })
        .catch(err => {
          this.$msg.fail(err);
        });
    },

    //页面查找帖子
    search(val) {
      this.gridData = this.gridData.filter(data => {
        return data.thead.indexOf(val) > -1 || data.tname.indexOf(val) > -1;
      });
      this.total = this.gridData.length;
    },
    //审核帖子 1 通过 -1 不通过
    check(id, type) {
      this.$post(
        { id: id, type: type, reason: this.reason },
        "/topic/allowban"
      ).then(res => {
        this.$msg.success(res.msg);
        this.dialog.visible = false;
        this.$get({ type: "0" }, "/topic/adminalltopics").then(res => {
          this.gridData = res.data;
          this.temp = res.data;
          this.total = res.data.length;
        });
      });
    }
  },
  watch: {
    SearchData(val) {
      if (val.trim().length == 0) {
        this.gridData = this.temp;
        this.total = this.gridData.length;
      }
    },
    reason() {
      if (this.reason.trim().length > 0) {
        this.disable = false;
      } else {
        this.disable = true;
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
img {
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 10px;
}
</style>