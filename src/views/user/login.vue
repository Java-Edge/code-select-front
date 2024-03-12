<template>
  <div class="login">
    <div id="login" v-loading="loading" element-loading-text="登录中...">
      <el-form
        class="container"
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        v-show="showLogin"
        label-width="100px"
      >
        <h3 class="title">用户登录</h3>
        <el-form-item label="用户名：" prop="username">
          <el-input
            type="username"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码：" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="validCode" class="validCode">
          <el-input v-model="loginForm.validCode"></el-input>
          <el-image
            :src="codeUrl"
            @click="getValidCode"
            class="login-code"
          ></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
          <el-link type="primary" :underline="false" @click="showChange"
            >-> 去注册</el-link
          >
        </el-form-item>
      </el-form>
      <el-form
        class="container"
        :model="registerForm"
        status-icon
        :rules="rules"
        ref="registerForm"
        v-show="!showLogin"
        label-width="100px"
      >
        <h3 class="title">用户注册</h3>
        <el-form-item label="用户名：" prop="username">
          <el-input
            type="username"
            v-model="registerForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="rePassword">
          <el-input
            type="rePassword"
            v-model="registerForm.rePassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="validCode" class="validCode">
          <el-input v-model="registerForm.validCode"></el-input>
          <el-image
            :src="codeUrl"
            @click="getValidCode"
            class="login-code"
          ></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register('registerForm')"
            >注册</el-button
          >
          <el-button @click="resetForm('registerForm')">重置</el-button>
          <el-link type="primary" :underline="false" @click="showChange">-> 去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    var validateChkcode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入验证码！"));
      }
      callback();
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名！"));
      } else if (!this.showLogin) {
        // 异步原因，不会等待返回后再执行后面流程，而是直接执行else后面的语句
        this.$axios
          .get(
            "/back/user/checkUsername?username=" + this.registerForm.username
          )
          .then((response) => {
            console.log(response.data.result);
            if (response.data.result === "1") {
              callback(new Error("该用户名已经存在！"));
            }
            callback();
          });
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码！"));
      }
      callback();
    };
    var validateRePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码！"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致！"));
      }
      callback();
    };
    return {
      showLogin: true,
      loading: false,
      codeUrl: "",
      cookiePass: "",
      loginForm: {
        username: "",
        password: "",
        validCode: "",
        id: "",
      },
      registerForm: {
        username: "",
        password: "",
        rePassword: "",
        validCode: "",
        id: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        validCode: [{ validator: validateChkcode, trigger: "blur" }],
        rePassword: [{ validator: validateRePassword, trigger: "blur" }],
      },
    };
  },
  created() {
    if (this.$route.query.sl == 1) {
      this.showLogin = false;
    } else {
      this.showLogin = true;
    }
    this.getValidCode();
  },
  methods: {
    showMessage(message) {
      this.$message.error(message);
    },
    login(formName) {
      debugger; // 在方法开始处放置 debugger
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$axios
            .post("back/user/doLogin", this.loginForm)
            .then((response) => {
              if (response.data.code === 200) {
                var user = response.data.result;
                this.$store.commit("SET_USERINFO", user);
                // this.setCookieValue("token", user.token);
                this.$router.push({ path: "/index" });
              } else {
                this.showMessage(response.data.message);
                this.loading = false;
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("back/user/register", this.registerForm)
            .then((response) => {
              if (response.data.code === 200) {
                this.$store.commit("SET_USERINFO", response.data.result);
                // 注册成功跳转到首页
                this.$message.success(response.data.message);
                this.$router.push({ path: "/index" });
              } else {
                this.showMessage(response.data.message);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getValidCode() {
      this.codeUrl = "api/back/user/getCheckCode?" + new Date();
    },
    showChange() {
      this.showLogin = !this.showLogin;
      this.getValidCode();
    },

    //window.document.cookie可以拿到cookie所有的key=value;形式的字符串。所以从cookie拿值，遍历cookie的所有key，直到key等于keyStr，
    //就可以拿到对应的值，例如我们要拿名为token的key，调用方法getCookieValue(token)就可以拿到key为token的值(value)
    getCookieValue(keyStr) {
      //cookie只能存放键值对
      const operator = "=";
      let value = null;
      const s = window.document.cookie;
      const arr = s.split("; ");
      for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        var k = str.split(operator)[0];
        var v = str.split(operator)[1];
        if (k === keyStr) {
          value = v;
          break;
        }
      }
      return value;
    },
    //往cookie中设置格式：document.cookie = key=value，例如token=fohweoif2n334023noi2r
    setCookieValue(key, value) {
      //cookie只能存放键值对
      const operator = "=";
      document.cookie = key + operator + value;
    },
  },
};
</script>

<style>
#login {
  position: fixed;
  left: 0;
  top: 73px;
  /* background: url("../assets/backImg.jpg") no-repeat; */
  overflow-y: hidden;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: 999999;
}
::-webkit-scrollbar {
  display: none;
}
body {
  overflow: hidden;
}
.container {
  border-radius: 15px;
  background-clip: padding-box;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login-code {
  display: inline-block;
  height: 40px;
  float: right;
}

.validCode .el-input {
  float: left;
  width: 50%;
}

img {
  float: right;
}
</style>
