<template>
  <header class="header">
    <div class="header-content">
      <nav class="menu">
        <ul>
          <li @click="handleMenuSelect('home')" :class="{ active: activeMenu === 'home' }">首页</li>
          <!--          <router-link :to="`/index`"></router-link>-->
          <li @click="handleMenuSelect('article')" :class="{ active: activeMenu === 'article' }">动态</li>
          <li @click="handleMenuSelect('recruit')" :class="{ active: activeMenu === 'recruit' }">招聘</li>
          <li @click="handleMenuSelect('interview')" :class="{ active: activeMenu === 'interview' }">面经</li>
          <li @click="handleMenuSelect('pilotPage')" :class="{ active: activeMenu === 'pilotPage' }">导航</li>
          <li @click="handleMenuSelect('special')" :class="{ active: activeMenu === 'special' }">专栏</li>
          <li @click="handleMenuSelect('ranking')" :class="{ active: activeMenu === 'ranking' }">排行榜</li>
          <!-- <li @click="handleMenuSelect('course')" :class="{ active: activeMenu === 'course' }">课程</li>
          <li @click="handleMenuSelect('vip')" :class="{ active: activeMenu === 'vip' }">VIP</li>  -->
          <!-- 其他信息 -->
        </ul>
      </nav>

      <!-- Search box -->
      <div class="search-box">
        <!-- Implement the search input and button here -->
        <!-- <input type="text" placeholder="搜索课程" />
        <button>搜索</button> -->
      </div>

      <!-- Login and user profile information -->
      <div class="user-info">
        <!-- Check if the user is logged in -->
        <template v-if="isLoggedIn">
          <div class="user-profile">
            <!-- Display user profile information (e.g., profile picture, username, etc.) -->
            <!-- <img src="https://picx.zhimg.com/v2-d534f6d0948d7228b4173e6e1a7a3436_xl.jpg" alt="User Profile"
              class="user-avatar" /> -->
            <span class="user-name">{{ username }}</span>
          </div>
          <button @click="handleLogout">退出登录</button>
        </template>
        <template v-else>
          <div class="auth-buttons">
            <router-link to="/login" class="auth-button">登录</router-link>
            <router-link to="/signup" class="auth-button">注册</router-link>
          </div>
        </template>
      </div>
    </div>
  </header>
  <!-- <div class="nav">
    <div @click="handleMenuSelect('article')">文章列表</div>
    <div @click="handleMenuSelect('coursePage')">课程</div>
  </div> -->
</template>

<script>
import pilotPage from "@/views/category/pilot.vue";
import { getCookieValue } from "@/utils/userUtil.js";
export default {
  name: 'Header',
  data() {
    return {
      activeMenu: 'home', // 默认选中首页
      isLoggedIn: true, // Set this to true if the user is logged in
      username: ""
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    handleMenuSelect(index) {
      console.log('handleMenuSelect', index);
      this.activeMenu = index; // 更新选中的菜单项
      // 可根据不同的菜单项进行相应的页面跳转或其他操作
      switch (index) {
        case "home":
          // 去首页
          this.$router.push("/index");
          break
        case "article":
          // 文章列表
          this.$router.push("/article-list/0");
          break
        case "recruit":
          this.$router.push("/recruit/index")
          break
        case "interview":
          this.$router.push("/article-interview")
          break
        case "coursePage":
          this.$router.push("/coursePage");
          break
        case "pilotPage":
          this.$router.push("/pilot");
          break
        case "special":
          this.$router.push("/special");
          break
        case "ranking":
          this.$router.push("/ranking");
          break
        default:
          //这里是没有找到对应的值处理
          break
      }
    },
    handleLogout() {
      // Implement the logout functionality here
      // For example, clear the user session and redirect to the home page
    },
    getUserInfo() {
      let userId =  getCookieValue("userId");
      this.username = userId === null ? "guest" : userId;
    }
  },
};
</script>

<style lang="scss" scoped>
/* 添加样式 */
.header {
  background-color: #333;
  color: #fff;
  padding: 10px 0;
  text-align: center;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu {
  display: flex;
  justify-content: center;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  display: inline-block;
  padding: 0 20px;
  cursor: pointer;
  font-size: 16px;
}

.menu li.active {
  color: #ffd04b;
  border-bottom: 2px solid #ffd04b;
}

.nav {
  width: 1600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  >div {
    display: flex;
    font-size: 16px;
    font-weight: 600;
    color: #222222;
    height: 50px;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Medium, PingFang SC;
    cursor: pointer;
  }
}

.user-info {
  display: flex;
  align-items: center;
}

.user-profile {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-name {
  font-size: 14px;
}

.user-info button {
  margin-left: 20px;
  padding: 8px 12px;
  background-color: #ffcc29;
  border: none;
  border-radius: 4px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
}

.auth-buttons {
  display: flex;
  align-items: center;
}

.auth-button {
  padding: 8px 12px;
  background-color: #ffcc29;
  border: none;
  border-radius: 4px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  margin-right: 10px;
}

/* Add any other additional styles you need for the header */
</style>
