<template>
  <div class="login_container">
    <!-- 图片和文字区域 -->
    <div class="containerImg">
      <img src="../assets/images/logo.png" style="width: 40px;width: 40px" />
      <div style="margin-left: 15px;color: #3B5D91;font-size: 18px;font-weight: bold">IT社区交流网站后台</div>
    </div>
    <!-- 登录区域 -->
    <div class="login_box">
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名：" prop="username" style="font-weight: bolder">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            clearable
            placeholder="请输入用户名"
            style="outline: none"
          ></el-input>
        </el-form-item>
        <el-form-item label="密 码：" prop="pwd" style="font-weight: bolder">
          <el-input
            v-model="loginForm.pwd"
            prefix-icon="el-icon-lock"
            clearable
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        pwd: ""
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "用户名称最小4位，最大20位",
            trigger: "blur"
          }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, max: 20, message: "密码最小4位，最大20位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //   重置按钮
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    //   点击登录按钮
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          // 发起请求
          const res = await this.$get(
            { aname: this.loginForm.username, apwd: this.loginForm.pwd },
            "/login/admin"
          );

          if (res.data == null) {
            // this.$router.push("/");
            this.$msg.fail("账号或者密码错误");
            return false;
          }
          // 成功时执行
          // 触发vuex事件 //使用commit函数调用mutations中的对应函数
          this.$store.commit("storeusrinfo", res.data);
          //  cookie储存
          Cookies.set("admininfo", res.data);
          // 跳转页面
          this.$router.push("/admin/managearticle");
        } else {
          return;
        }
      });
    }
  }
};
</script>

<style  scoped>
.login_container {
  height: 100%;
  background: url("../assets/images/login_background.jpg") no-repeat;
  background-size: cover;
}
.containerImg {
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_box {
  width: 380px;
  height: 180px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login_box .el-input {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>