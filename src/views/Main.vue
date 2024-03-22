<template >
  <div>
    <el-container>
      <el-header>
        <!-- 头部样式 -->
        <div class="top">
          <!-- 左边 -->
          <div style="display: flex;align-items: center;width: 580px;font-size: 16px"></div>
          <!-- 右边 -->
          <div>
            <!-- 头像 -->
            <img :src="$store.state.usrinfo.aavatar" alt="头像" />
            <!-- hover 全局样式--App.vue文件中 -->
            <el-button type="primary" @click="loginOut">退出</el-button>
          </div>
        </div>
      </el-header>
      <el-container class="elmain" :style="{'min-height':Screen}">
        <el-aside width="200px">
          <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="height: 100%;border-right: none"
            router
            :unique-opened="true"
            :default-active="$route.path"
          >
            <div style="width: 100%;text-align: center;height: 20px;line-height: 40px;"></div>
            <el-submenu v-for="(item, index) in Menu" :key="index" :index="index.toString()">
              <template slot="title">
                <!-- <i class="el-icon-goods"></i> -->
                <i :class="iconsObjFirst[index]" style="padding-right: 10px"></i>
                <span slot="title">{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(i,k) in item.group" :key="k" :index="i.path">{{i.item}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main style="background-color: white;overflow: hidden">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      Screen: document.body.clientHeight + "px",
      //   一级图标
      iconsObjFirst: {
        // 0: "el-icon-document",
        // 1: "el-icon-money",
        // 2: "el-icon-s-custom"
        0: "iconfont icon-wen-zhang",
        1: "iconfont icon-tiezi",
        2: "iconfont icon-guojicopy"
      },
      Menu: [
        {
          title: "文章管理",
          group: [
            { path: "/admin/managearticle", item: "待审核" },
            { path: "/admin/banarticle", item: "未通过" },
            { path: "/admin/allowedarticle", item: "已通过" }
          ]
        },
        {
          title: "帖子管理",
          group: [
            { path: "/admin/topics", item: "帖子审核" },
            { path: "/admin/topics_allowed", item: "合格帖子" }
          ]
        },
        {
          title: "用户管理",
          group: [
            { path: "/admin/normaluser", item: "普通用户" },
            { path: "/admin/root", item: "管理员" },
            { path: "/admin/new", item: "新增管理员" }
          ]
        }
      ]
    };
  },
  beforeMount() {
    this.Screen = document.body.clientHeight - 75 + "px";
    //   判断用户是否登录
    if (Cookies.get("admininfo")) {
      this.$store.commit("storeusrinfo", JSON.parse(Cookies.get("admininfo")));
    }
  },
  methods: {
    loginOut() {
      Cookies.remove("admininfo");
      this.$router.push("/");
    }
  }
};
</script>

<style  scoped>
.el-header {
  height: 60px;
  min-width: 1300px;
  background-color: #fff;
  border-bottom: 1px solid #e0e5e5;
}
.top {
  width: 1300px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
img {
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  margin-right: 5px;
  vertical-align: middle;
}
</style>