<template>
    <div id="login" v-loading="loading" element-loading-text="登录中...">
        <el-form class="container" :model="loginForm" status-icon :rules="rules" ref="loginForm" v-show="showLogin"
            label-width="100px">
            <h3 class="title">用户登录</h3>
            <el-form-item label="用户名：" prop="username">
                <el-input type="username" v-model="loginForm.username" autocomplete="off"></el-input>
            </el-form-item>
            
            <el-form-item label="密码：" prop="password">
                <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码：" prop="validCode" class="validCode">
                <el-input v-model="loginForm.validCode"></el-input>
                <el-image :src="codeUrl" @click="getValidCode" class="login-code"></el-image>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login('loginForm')">登录</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
                <el-link type="primary" :underline="false" @click="showChange">-> 去注册</el-link>
            </el-form-item>
        </el-form>
        <el-form class="container" :model="registerForm" status-icon :rules="rules" ref="registerForm" v-show="!showLogin"
            label-width="100px">
            <h3 class="title">用户注册</h3>
            <el-form-item label="用户名：" prop="username">
                <el-input type="username" v-model="registerForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="rePassword">
                <el-input type="rePassword" v-model="registerForm.rePassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码：" prop="validCode" class="validCode">
                <el-input v-model="registerForm.validCode"></el-input>
                <el-image :src="codeUrl" @click="getValidCode" class="login-code"></el-image>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register('registerForm')">注册</el-button>
                <el-button @click="resetForm('registerForm')">重置</el-button>
                <!--        #606266 #5cb6ff-->
                <el-link type="primary" :underline="false" @click="showChange">-> 去登录</el-link>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script>

export default {
    name: 'Login',
    data() {
        var validateChkcode = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('请输入验证码！'))
            }
            callback()
        }
        var validateUsername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名！'))
            } else if (!this.showLogin) {
                // 异步原因，不会等待返回后再执行后面流程，而是直接执行else后面的语句
                this.$axios.get('/back/user/checkUsername?username=' + this.registerForm.username).then(response => {
                    console.log(response.data.result)
                    if (response.data.result === "1") {
                        callback(new Error('该用户名已经存在！'))
                    }
                    callback()
                })
            } else {
                callback()
            }
        }
        var validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码！'))
            }
            callback()
        }
        var validateRePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码！'))
            } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致！'))
            }
            callback()
        }
        return {
            showLogin: true,
            loading: false,
            codeUrl: '',
            cookiePass: '',
            loginForm: {
                username: '',
                password: '',
                validCode: '',
                id: ''
            },
            registerForm: {
                username: '',
                password: '',
                rePassword: '',
                validCode: '',
                id: ''
            },
            rules: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                validCode: [
                    { validator: validateChkcode, trigger: 'blur' }
                ],
                rePassword: [
                    { validator: validateRePassword, trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        this.getValidCode()
    },
    methods: {
        showMessage(message) {
            this.$message.error(message)
        },
        login(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.$axios.post('back/user/login', this.loginForm).then(response => {
                        if (response.data.code === 200) {
                            this.$store.dispatch('setUser', response.data.result)
                            this.$router.push({ path: '/index' })
                        } else {
                            this.showMessage(response.data.message)
                            this.loading = false
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        register(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('back/user/register', this.registerForm).then(response => {
                        if (response.data.code === 200) {
                            this.$store.dispatch('setUser', response.data.result)
                            // 注册成功跳转到首页
                            this.$message.success(response.data.message)
                            this.$router.push({ path: '/index' })
                        } else {
                            this.showMessage(response.data.message)
                        }
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        getValidCode() {
            // this.$axios.get('/base/user/getCheckCode?' + new Date()
            // ).then(response => {
            //     const courses = response.data.result;
            //     console.log(response)
            //     this.codeUrl = response.path;
            //     console.log(this.courses)
            // })
            this.codeUrl = 'api/back/user/getCheckCode?' + new Date()
            console.log(this.$axios.baseURL)
        },
        showChange() {
            this.showLogin = !this.showLogin
            this.getValidCode()
        }
    }
}
</script>
  
<style>
#login {
    /* background: url("../assets/backImg.jpg") no-repeat; */
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
}

body {
    margin: 0px;
}

.container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 8% auto;
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

.el-link {
    margin-left: 25px;
}

img {
    float: right;
}
</style>