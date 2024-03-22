<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>待审核</el-breadcrumb-item>
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
              type="info"
              size="small"
              icon="el-icon-view"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:30px"
        @current-change="current_change"
        :page-sizes="[10]"
        :page-size="pagesize"
        background
        layout="total, sizes, prev, pager, next"
        :total="gridData.length"
      ></el-pagination>
    </div>
    <el-dialog :visible.sync="dialog.visible" width="50%" title="文章内容审核">
      <div style="border: 1px solid #ccc">
        <div
          v-html="dialog.content.pcontent"
          style="margin: 5px 10px;height:300px;overflow:hidden;"
          class="contentBox"
        >
          <!-- 文章内容 -->
        </div>
        <!-- <p v-html="dialog.content.pcontent"></p> -->
        <div style="text-align: center;">
          <el-button
            v-if="openBtn"
            type="info"
            icon="el-icon-caret-bottom"
            @click="openContent"
            class="open"
          >展开更多</el-button>
          <el-button
            v-else
            type="info"
            icon="el-icon-caret-top"
            @click="closeContent"
            class="close"
          >收起</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" size="small" @click="check(dialog.content._id,'-1')">不通过</el-button>
        <el-button type="primary" size="small" @click="check(dialog.content._id,'1')">通 过</el-button>
      </span>
    </el-dialog>
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
      dialog: {
        visible: false,
        content: ""
      },
      SearchData: "",
      openBtn: true
    };
  },
  mounted() {
    this.$get({ type: "0" }, "/posts/findarticle")
      .then(res => {
        this.gridData = res.data;
        this.oriData = res.data;
        /* console.log(res.data);
        pauthor: "佚名"
        pdate: "2020-4-30"
        phead: "测试"
        pimg: "http://localhost:3000/images/logo.png"
        psort: "技术"
        _id: "5eaa6e448ba53b95fc41383e"
        */
      })
      .catch(err => {
        this.$msg.fail(err);
      });
  },
  methods: {
    // 展开内容
    openContent() {
      let box = document.querySelector(".contentBox");
      box.style.height = "100%";
      this.openBtn = false;
    },
    // 收起内容
    closeContent() {
      let box = document.querySelector(".contentBox");
      box.style.height = "300px";
      this.openBtn = true;
    },
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    //查看文章
    checkout(id) {
      this.dialog.visible = true;
      this.$get({ id: id }, "/posts/findcontent")
        .then(res => {
          this.dialog.content = res.data;
          // console.log(res);
        })
        .catch(err => {
          this.$msg.fail(err);
        });
    },
    //审核通过文章
    check(id, type) {
      this.$post({ id: id, type: type }, "/posts/updatetype")
        .then(res => {
          this.$msg.success(res.msg);
          this.dialog.visible = false;
          this.$get({ type: "0" }, "/posts/findarticle").then(res => {
            this.gridData = res.data;
            this.oriData = res.data;
            this.total = res.data.length;
          });
        })
        .catch(err => {
          this.$msg.fail(err);
        });
    },
    Search(data) {
      this.gridData = this.gridData.filter(el => {
        return el.phead.indexOf(data) > -1 || el.pauthor.indexOf(data) > -1;
      });
      //   console.log(this.gridData);
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