<template>
  <header class="header">
    <div class="clearfix header-content">
      <div class="index-menu clearfix">
        <div class="logo">
          <a href="/#/index" target="_self" title="编程严选网">
            <img src="@/assets/logo.jpg" />
          </a>
        </div>
        <nav class="menu">
          <ul class="menuul l">
            <li v-for="item in menus" :key="item.name" @click="handleMenuSelect(item)"
              :class="{ active: activeMenu === item.value }">
              {{ item.name }}
            </li>
          </ul>
        </nav>
        <div class="login-area">
          <ul class="header-unlogin clearfix newcomer-box">

            <!-- <li class="shop-cart">
              <a href="https://rvsvd8vr3wx.feishu.cn/docs/doccnBIBScqHkFGL9P3zNJFU9bJ?from=from_copylink"
                class="shop-cart-icon" target="_blank">
                <span class="salary">大会员</span>
              </a>
            </li> -->

            <!-- 主题切换按钮 -->
            <li class="theme-toggle-item">
              <ThemeToggle />
            </li>

            <!-- 用户认证区域 -->
            <li class="auth-item">
              <!-- 未登录状态 -->
              <div v-if="!isAuthenticated" class="auth-buttons">
                <span class="login-btn" @click="handleLogin">登录/注册</span>
              </div>

              <!-- 已登录状态：头像下拉 -->
              <div v-else class="user-avatar-wrap" @mouseenter="showDropdown" @mouseleave="hideDropdown">
                <div class="avatar-trigger">
                  <img v-if="avatar" :src="avatar" class="avatar-img" alt="avatar" />
                  <div v-else class="avatar-default">{{ nickname.charAt(0) || username.charAt(0) || 'U' }}</div>
                </div>

                <transition name="dropdown-fade">
                  <div v-show="dropdownVisible" class="user-dropdown" @mouseenter="showDropdown" @mouseleave="hideDropdown">
                    <div class="dropdown-header">
                      <img v-if="avatar" :src="avatar" class="dropdown-avatar" alt="avatar" />
                      <div v-else class="dropdown-avatar default">{{ nickname.charAt(0) || username.charAt(0) || 'U' }}</div>
                      <div class="dropdown-meta">
                        <div class="dropdown-name">{{ nickname || username }}</div>
                      </div>
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-menu">
                      <div class="dropdown-item" @click="goProfile">
                        <el-icon class="dropdown-icon"><User /></el-icon>
                        <span>个人中心</span>
                      </div>
                      <div class="dropdown-item logout" @click="handleLogout">
                        <el-icon class="dropdown-icon"><SwitchButton /></el-icon>
                        <span>退出登录</span>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </li>

          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, computed, defineOptions } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessageBox } from 'element-plus'
import { User, SwitchButton } from '@element-plus/icons-vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

// Define component name to satisfy multi-word naming convention
defineOptions({
  name: 'HeaderNavi'
})

const router = useRouter()
const store = useStore()

// Reactive state
const activeMenu = ref("home")
const dropdownVisible = ref(false)
let dropdownTimer = null

// Computed properties
const isAuthenticated = computed(() => store.getters['user/isAuthenticated'])
const username = computed(() => store.getters['user/username'])
const nickname = computed(() => store.getters['user/nickname'])
const avatar = computed(() => store.getters['user/avatar'])

// Menu configuration
const menus = ref([
  { name: "首页", value: "home", path: "/index" },
  { name: "面经", value: "interview", path: "/article-interview" },
  { name: "专栏", value: "special", path: "/special" },
])

// Get user info on component mount
onMounted(() => {
  activeMenu.value = handleUpdateActivePath()
  if (isAuthenticated.value) {
    store.dispatch('user/fetchUserInfo').catch(() => {})
  }
})

// Handle menu selection
const handleMenuSelect = (item) => {
  activeMenu.value = item.value
  localStorage.setItem("currentActiveMenu", item.value)
  router.push(item.path)
}

// Handle login click
const handleLogin = () => {
  router.push('/login')
}

// Dropdown visibility control
const showDropdown = () => {
  if (dropdownTimer) {
    clearTimeout(dropdownTimer)
    dropdownTimer = null
  }
  dropdownVisible.value = true
}

const hideDropdown = () => {
  dropdownTimer = setTimeout(() => {
    dropdownVisible.value = false
  }, 150)
}

// Navigate to personal center
const goProfile = () => {
  dropdownVisible.value = false
  router.push('/profile')
}

// Handle logout
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要退出登录吗?',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    // 调用登出 action
    await store.dispatch('user/logout')
    
    // 跳转到首页
    router.push('/index')
  } catch (error) {
    // 用户取消操作
    console.log('取消退出')
  }
}

// Update active path based on current route
const handleUpdateActivePath = () => {
  let item = ""
  const currentActiveMenu = localStorage.getItem("currentActiveMenu")
  if (currentActiveMenu) {
    item = currentActiveMenu
  } else {
    let url = window.location.href
    url = url.match(/#(\S*)/)[1]
    for (let i = 0; i < menus.value.length; i++) {
      if (menus.value[i].path === url) {
        item = menus.value[i].value
        break
      } else {
        item = "home"
      }
    }
  }
  return item
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  border-bottom: 1px solid #f3f5f6;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 72px;
  box-sizing: border-box;
  z-index: 1000;

  .header-content {
    width: auto;
    max-width: 1450px;
    z-index: 900;
    position: relative;
    background-size: cover;
    background-color: #fff !important;
    margin: 0 auto;

    .index-menu {
      min-width: 1152px;

      .logo {
        float: left;
        // margin: 0 20px;

        a {
          display: block;
          background: 0 0 !important;
          // width: 140px;
          height: 72px;

          img {
            margin-left: 4px;
            height: 72px;
          }
        }
      }

      .menuul li {
        cursor: pointer;
        float: left;
        position: relative;
        padding: 0 16px;
        color: var(--nav-item-color, #545c63);
        text-align: center;
        font-size: 16px;
        height: 71px;
        line-height: 71px;
        transition: color 0.3s;

        &:hover {
          color: var(--nav-item-hover-color, #1c1f21);
        }
      }

      .menu li.active {
        color: var(--nav-item-active-color, #1c1f21);
        font-weight: 600;
        font-size: 18px;
      }

      .login-area {
        float: right;
        position: relative;

        .newcomer-box {
          position: relative;
        }

        .header-unlogin>li {
          float: left;
        }

        /* 主题切换按钮样式 */
        .theme-toggle-item {
          float: left;
          height: 36px;
          line-height: 36px;
          margin: 18px 0 18px 12px;
          display: flex;
          align-items: center;
        }

        /* 用户认证区域样式 */
        .auth-item {
          float: left;
          height: 36px;
          line-height: 36px;
          margin: 18px 0 18px 12px;
          display: flex;
          align-items: center;

          .auth-buttons {
            .login-btn {
              color: var(--nav-text-default, #545c63);
              cursor: pointer;
              font-size: 14px;
              transition: color 0.3s;

              &:hover {
                color: var(--brand-primary);
              }
            }
          }

          .user-avatar-wrap {
            position: relative;
            height: 36px;
            display: flex;
            align-items: center;

            .avatar-trigger {
              cursor: pointer;

              .avatar-img,
              .avatar-default {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                object-fit: cover;
              }

              .avatar-default {
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--brand-primary);
                color: #fff;
                font-size: 14px;
                font-weight: 500;
              }
            }

            .user-dropdown {
              position: absolute;
              top: calc(100% + 12px);
              right: 0;
              width: 220px;
              background: var(--dropdown-bg, #fff);
              border-radius: 8px;
              box-shadow: 0 4px 16px var(--dropdown-shadow, rgba(0, 0, 0, 0.12));
              padding: 16px;
              z-index: 1001;

              &::before {
                content: '';
                position: absolute;
                top: -6px;
                right: 12px;
                width: 12px;
                height: 12px;
                background: var(--dropdown-bg, #fff);
                transform: rotate(45deg);
                box-shadow: -2px -2px 4px var(--dropdown-arrow-shadow, rgba(0, 0, 0, 0.04));
              }

              .dropdown-header {
                display: flex;
                align-items: center;
                gap: 12px;

                .dropdown-avatar {
                  width: 48px;
                  height: 48px;
                  border-radius: 50%;
                  object-fit: cover;
                  flex-shrink: 0;

                  &.default {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--brand-primary);
                    color: #fff;
                    font-size: 18px;
                    font-weight: 500;
                  }
                }

                .dropdown-meta {
                  flex: 1;
                  min-width: 0;

                  .dropdown-name {
                    font-size: 15px;
                    font-weight: 600;
                    color: var(--dropdown-text-strong, #1c1f21);
                    line-height: 22px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
              }

              .dropdown-divider {
                height: 1px;
                background: var(--dropdown-divider, #f3f5f6);
                margin: 14px 0;
              }

              .dropdown-menu {
                .dropdown-item {
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  padding: 10px 8px;
                  border-radius: 6px;
                  cursor: pointer;
                  font-size: 14px;
                  color: var(--dropdown-text, #545c63);
                  transition: background-color 0.2s, color 0.2s;

                  &:hover {
                    background: var(--dropdown-hover-bg, #f3f5f6);
                    color: var(--dropdown-text-strong, #1c1f21);
                  }

                  .dropdown-icon {
                    font-size: 16px;
                    color: var(--dropdown-icon, #9199a1);
                  }

                  &.logout {
                    margin-top: 4px;
                    color: var(--dropdown-danger, #f56c6c);

                    .dropdown-icon {
                      color: var(--dropdown-danger, #f56c6c);
                    }

                    &:hover {
                      background: var(--dropdown-danger-bg, #fef0f0);
                    }
                  }
                }
              }
            }
          }
        }

        /* 下拉卡片过渡动画 */
        .dropdown-fade-enter-active,
        .dropdown-fade-leave-active {
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .dropdown-fade-enter-from,
        .dropdown-fade-leave-to {
          opacity: 0;
          transform: translateY(-6px);
        }
      }
    }
  }
}
</style>
