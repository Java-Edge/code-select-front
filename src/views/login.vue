<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h2>{{ isLogin ? '用户登录' : '用户注册' }}</h2>
      </div>
      
      <el-form 
        ref="formRef" 
        :model="form" 
        :rules="rules" 
        class="login-form"
        @submit.prevent="handleSubmit"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            prefix-icon="User"
            size="large"
          />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>

        <!-- 确认密码(仅注册时显示) -->
        <el-form-item v-if="!isLogin" prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="请确认密码"
            prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="validCode">
          <div class="captcha-wrapper">
            <el-input
              v-model="form.validCode"
              placeholder="请输入验证码"
              prefix-icon="Picture"
              size="large"
              style="flex: 1"
            />
            <div class="captcha-image" @click="refreshCaptcha">
              <img v-if="captchaUrl" :src="captchaUrl" alt="验证码" />
              <span v-else>点击获取</span>
            </div>
          </div>
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
          <el-button 
            type="primary" 
            size="large" 
            class="submit-btn"
            :loading="loading"
            @click="handleSubmit"
          >
            {{ isLogin ? '登录' : '注册' }}
          </el-button>
        </el-form-item>

        <!-- 切换登录/注册 -->
        <div class="switch-mode">
          <span @click="switchMode">
            {{ isLogin ? '没有账号? 立即注册' : '已有账号? 立即登录' }}
          </span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus/es/components/message'
import { getCheckCode, checkUsername } from '@/api/user'

const router = useRouter()
const route = useRoute()
const store = useStore()

const formRef = ref(null)
const isLogin = ref(true)
const loading = ref(false)
const captchaUrl = ref('')

const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  validCode: ''
})

// 验证用户名
const validateUsername = async (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入用户名'))
  }
  if (value.length < 3 || value.length > 20) {
    return callback(new Error('用户名长度为 3-20 个字符'))
  }
  
  // 注册时检查用户名是否存在
  if (!isLogin.value) {
    try {
      const response = await checkUsername(value)
      const { data } = response.data
      if (data === 1) {
        callback(new Error('用户名已存在'))
      } else {
        callback()
      }
    } catch (error) {
      callback()
    }
  } else {
    callback()
  }
}

// 验证密码
const validatePassword = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入密码'))
  }
  if (value.length < 6) {
    return callback(new Error('密码长度不能少于 6 位'))
  }
  callback()
}

// 验证确认密码
const validateConfirmPassword = (rule, value, callback) => {
  if (!isLogin.value) {
    if (!value) {
      return callback(new Error('请确认密码'))
    }
    if (value !== form.password) {
      return callback(new Error('两次输入的密码不一致'))
    }
  }
  callback()
}

// 验证验证码
const validateCaptcha = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入验证码'))
  }
  if (value.length !== 4) {
    return callback(new Error('验证码为 4 位'))
  }
  callback()
}

const rules = {
  username: [
    { required: true, validator: validateUsername, trigger: 'blur' }
  ],
  password: [
    { required: true, validator: validatePassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validateConfirmPassword, trigger: 'blur' }
  ],
  validCode: [
    { required: true, validator: validateCaptcha, trigger: 'blur' }
  ]
}

// 获取验证码
const refreshCaptcha = async () => {
  try {
    const response = await getCheckCode()
    console.log('验证码响应:', response)
    
    // 从响应头获取 Content-Type
    const contentType = response.headers['content-type'] || 'image/png'
    
    // 将 Blob 转换为 URL
    const blob = new Blob([response.data], { type: contentType })
    captchaUrl.value = URL.createObjectURL(blob)
    
    console.log('验证码 URL:', captchaUrl.value)
  } catch (error) {
    console.error('获取验证码失败:', error)
    ElMessage.error('获取验证码失败,请重试')
  }
}

// 切换登录/注册模式
const switchMode = () => {
  isLogin.value = !isLogin.value
  // 清空表单
  if (formRef.value) {
    formRef.value.resetFields()
  }
  // 刷新验证码
  refreshCaptcha()
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true

    if (isLogin.value) {
      // 登录
      await store.dispatch('user/login', {
        username: form.username,
        password: form.password,
        validCode: form.validCode
      })
      
      ElMessage.success('登录成功')
      
      // 跳转到原本要访问的页面或首页
      const redirect = route.query.redirect || '/index'
      await router.push(redirect)
    } else {
      // 注册
      const { register } = await import('@/api/user')
      await register({
        username: form.username,
        password: form.password,
        validCode: form.validCode
      })
      
      ElMessage.success('注册成功,请登录')
      // 切换到登录模式
      switchMode()
    }
  } catch (error) {
    console.error('提交失败:', error)
    // 刷新验证码
    refreshCaptcha()
    form.validCode = ''
  } finally {
    loading.value = false
  }
}

// 组件挂载时获取验证码
onMounted(() => {
  refreshCaptcha()
})
</script>

<style lang="scss" scoped>
/* ===== 背景 ===== */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0a0e1a;
  overflow: hidden;
  position: relative;

  /* 动态光晕背景 */
  &::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%);
    top: -150px;
    left: -150px;
    animation: pulse 6s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(120, 0, 255, 0.18) 0%, transparent 70%);
    bottom: -100px;
    right: -100px;
    animation: pulse 6s ease-in-out 3s infinite;
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.15); opacity: 0.7; }
}

/* ===== 卡片 ===== */
.login-box {
  position: relative;
  z-index: 1;
  width: 440px;
  padding: 44px 40px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(0, 212, 255, 0.25);
  border-radius: 20px;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow:
    0 0 0 1px rgba(0, 212, 255, 0.08),
    0 8px 40px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);
}

/* ===== 标题 ===== */
.login-header {
  text-align: center;
  margin-bottom: 36px;

  h2 {
    font-size: 26px;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(90deg, #00d4ff, #7b61ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 2px;
  }

  /* 标题下的装饰线 */
  &::after {
    content: '';
    display: block;
    width: 48px;
    height: 3px;
    margin: 12px auto 0;
    background: linear-gradient(90deg, #00d4ff, #7b61ff);
    border-radius: 2px;
  }
}

/* ===== 表单间距 ===== */
.login-form {
  :deep(.el-form-item) {
    margin-bottom: 22px;
  }

  /* 输入框整体覆盖为深色透明风格 */
  :deep(.el-input__wrapper) {
    background: rgba(255, 255, 255, 0.05) !important;
    border: 1px solid rgba(0, 212, 255, 0.3) !important;
    border-radius: 10px !important;
    box-shadow: none !important;
    transition: border-color 0.25s, box-shadow 0.25s;

    &:hover {
      border-color: rgba(0, 212, 255, 0.6) !important;
    }

    &.is-focus {
      border-color: #00d4ff !important;
      box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.15) !important;
    }
  }

  :deep(.el-input__inner) {
    color: #e8f4ff !important;
    font-size: 15px;
    background: transparent !important;

    &::placeholder {
      color: rgba(180, 210, 240, 0.45) !important;
    }
  }

  /* 前缀图标颜色 */
  :deep(.el-input__prefix-inner .el-icon) {
    color: rgba(0, 212, 255, 0.7);
  }

  /* 密码可见按钮 */
  :deep(.el-input__suffix-inner .el-icon) {
    color: rgba(0, 212, 255, 0.6);
    &:hover { color: #00d4ff; }
  }

  /* 表单校验错误文字 */
  :deep(.el-form-item__error) {
    color: #ff6b9d;
    font-size: 12px;
  }
}

/* ===== 验证码行 ===== */
.captcha-wrapper {
  display: flex;
  gap: 12px;
  align-items: stretch;
}

.captcha-image {
  flex-shrink: 0;
  width: 118px;
  height: 40px;
  border: 1px solid rgba(0, 212, 255, 0.45);
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 212, 255, 0.06);
  transition: border-color 0.25s, box-shadow 0.25s;

  &:hover {
    border-color: #00d4ff;
    box-shadow: 0 0 8px rgba(0, 212, 255, 0.35);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 9px;
  }

  span {
    font-size: 12px;
    color: rgba(0, 212, 255, 0.7);
    letter-spacing: 0.5px;
  }
}

/* ===== 登录按钮 ===== */
.submit-btn {
  width: 100%;
  height: 46px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 2px;
  border: none !important;
  border-radius: 10px !important;
  background: linear-gradient(90deg, #00aaff, #7b61ff) !important;
  box-shadow: 0 4px 20px rgba(0, 170, 255, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 28px rgba(0, 170, 255, 0.55) !important;
  }

  &:active {
    transform: translateY(0);
  }
}

/* ===== 切换登录/注册 ===== */
.switch-mode {
  text-align: center;
  margin-top: 20px;

  span {
    color: rgba(0, 212, 255, 0.8);
    cursor: pointer;
    font-size: 13px;
    letter-spacing: 0.5px;
    transition: color 0.2s, text-shadow 0.2s;

    &:hover {
      color: #00d4ff;
      text-shadow: 0 0 8px rgba(0, 212, 255, 0.6);
    }
  }
}
</style>
