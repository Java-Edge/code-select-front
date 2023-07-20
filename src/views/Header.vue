<template>
  <header class="header">
    <div class="header-content">
      <!-- Logo or other branding elements -->
      <!-- ... -->

      <nav class="menu">
        <ul>
          <router-link :to="`/index`">
            <li @click="handleMenuSelect('home')" :class="{ active: activeMenu === 'home' }">首页</li>
            <router-link to="/article-list">发布文章</router-link>
          </router-link>
          <!-- <li @click="handleMenuSelect('course')" :class="{ active: activeMenu === 'course' }">课程</li>
          <li @click="handleMenuSelect('vip')" :class="{ active: activeMenu === 'vip' }">VIP</li> -->
          <!-- 其他信息 -->
        </ul>
      </nav>

    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      activeMenu: 'home', // 默认选中首页
      isLoggedIn: true, // Set this to true if the user is logged in
    };
  },
  methods: {
    handleMenuSelect(index) {
      this.activeMenu = index; // 更新选中的菜单项
      // 可根据不同的菜单项进行相应的页面跳转或其他操作
    },
    handleLogout() {
      // Implement the logout functionality here
      // For example, clear the user session and redirect to the home page
    },
  },
};
</script>

<style scoped>
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

.search-box {
  display: flex;
  align-items: center;
}

.search-box input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
}

.search-box button {
  margin-left: 10px;
  padding: 8px 12px;
  background-color: #ffcc29;
  border: none;
  border-radius: 4px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
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
