<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增管理员</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="width:600px;height:900px;margin:100px 100px;text-align:center;">
      <el-form
        label-width="80px"
        :model="root_data"
        ref="addAdminRef"
        :rules="addAdminRules"
        class="demo-ruleForm"
        v-if="$store.state.usrinfo.aname === 'root'"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="root_data.account" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="root_data.pwd" clearable show-password></el-input>
        </el-form-item>
        <el-form>
          <el-button @click="new_root" type="primary" size="small">新增</el-button>
          <el-button @click="reset" type="info" size="small">清空</el-button>
        </el-form>
      </el-form>
      <div v-else>
        <el-alert
          title="对不起，你不是超级管理员，权限不够"
          center
          type="warning"
          effect="dark"
          :closable="false"
          show-icon
        ></el-alert>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      root_data: {
        account: "",
        pwd: ""
      },
      addAdminRules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "账号名称最小4位，最大20位",
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
    new_root() {
      this.$refs.addAdminRef.validate(valid => {
        if (valid) {
          this.$post(
            { account: this.root_data.account, pwd: this.root_data.pwd },
            "/login/newroot"
          )
            .then(res => {
              this.$msg.success(res.msg);
              this.reset();
            })
            .catch(err => {
              this.$msg.fail(err);
            });
        } else {
          return false;
        }
      });
    },
    reset() {
      this.$refs.addAdminRef.resetFields();
    }
  }
};
</script>
<style  scoped>
.el-breadcrumb {
  height: 50px;
  border-bottom: 1px solid #ccc;
}
