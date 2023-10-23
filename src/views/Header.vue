<template>
  <header class="header">
    <div class="clearfix header-content">
      <div class="index-menu clearfix">
        <div class="logo">
          <a href="/" target="_self" title="编程严选">
            <img src="@/assets/logo.png" />
          </a>
        </div>
        <nav class="menu">
          <ul class="menuul l">
            <li
              v-for="item in menus"
              :key="item.name"
              @click="handleMenuSelect(item)"
              :class="{ active: activeMenu === item.value }"
            >
              {{ item.name }}
            </li>
          </ul>
        </nav>
        <div class="login-area">
          <ul class="header-unlogin clearfix newcomer-box">

             <li class="shop-cart">
              <a href="https://rvsvd8vr3wx.feishu.cn/wiki/IY8dw4A4HiHRJ4k2U9RcZtvdnfd?from=from_copylink"
                class="shop-cart-icon"
                target="_blank">
                <span class="icon-shopping-cart js-endcart">
                  <el-icon><Wallet /></el-icon>
                </span>
                <span class="salary">大会员</span>

                <span
                  class="shopping_icon js-cart-num"
                  data-ordernum="0"
                  data-cartnum="0"
                  style="display: none"
                  >0</span
                >
              </a>
              <div class="my-cart"></div>
            </li>

            <li class="header-signin"  v-if="isShowLogin">
              <a @click="handleToLogin(0)">登录</a> /
              <a @click="handleToLogin(1)">注册</a>
            </li>
          </ul>
        </div>
        <!--  <div class="search-warp clearfix">
          <div class="search-area" data-search="top-banner">
            <input class="search-input" data-suggest-trigger="suggest-trigger" placeholder="请输入关键字..." type="text"
              autocomplete="off">
            <input type="hidden" class="btn_search" data-search-btn="search-btn">
            <div class="hotTags">
              <a href="https://www.imooc.com/search/?words=Vue" target="_blank" class="">Vue</a>
              <a href="https://www.imooc.com/search/?words=Python&amp;type=course" target="_blank" class="last">Python</a>
            </div>
          </div>
          <div class="showhide-search" data-show="no"><el-icon>
              <Search />
            </el-icon></div>
        </div> -->
      </div>
    </div>
  </header>
</template>

<script>
import { getCookieValue } from "@/utils/userUtil.js";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Header-Navi",
  data() {
    return {
      activeMenu: "home", // 默认选中首页
      isShowLogin: true, // Set this to true if the user is logged in
      username: "",
      menus: [
        { name: "首页", value: "home", path: "/index" },
        { name: "动态", value: "article", path: "/article-list" },
        { name: "招聘", value: "recruit", path: "/recruit/index" },
        { name: "面经", value: "interview", path: "/article-interview" },
        { name: "内推", value: "recommend", path: "/inner-recommend" },
        { name: "导航", value: "pilotPage", path: "/pilot" },
        { name: "专栏", value: "special", path: "/special" },
        { name: "排行榜", value: "ranking", path: "/ranking" },
        { name: "项目", value: "project", path: "/projectList" },
        { name: "副业", value: "sideline", path: "/sidelineList" },
        { name: "下载", value: "download", path: "/download" },
      ],
    };
  },
  watch: {
    $route(to, from) {
      console.log(this.$store.state.userInfo);
      if (to.path === "/login" || this.$store.state.userInfo) {
        this.isShowLogin = false;
      } else {
        this.isShowLogin = true;
      }
    },
  },
  created() {
    this.getUserInfo();
    this.activeMenu = this.handleUpdateActivePath();
  },
  computed: {
    ...mapState({
      activePath: (state) => state.nav.activePath,
    }),
  },
  methods: {
    handleMenuSelect(item) {
      this.activeMenu = item.value; // 更新选中的菜单项
      localStorage.setItem("currentActiveMenu", this.activeMenu);
      this.$router.push(item.path);
    },
    handleToLogin(isToLogin) {
      this.$router.push({ path: "/login", query: { sl: isToLogin } });
    },
    handleLogout() {
      // Implement the logout functionality here
      // For example, clear the user session and redirect to the home page
    },
    getUserInfo() {
      let userId = getCookieValue("userId");
      this.username = userId === null ? "guest" : userId;
    },
    ...mapMutations({
      setActivePath: "nav/setActivePath",
    }),
    handleUpdateActivePath() {
      let item = "";
      const currentActiveMenu = localStorage.getItem("currentActiveMenu");
      if (currentActiveMenu) {
        item = currentActiveMenu;
      } else {
        let url = window.location.href;
        url = url.match(/#(\S*)/)[1];
        for (let i = 0; i < this.menus.length; i++) {
          if (this.menus[i].path == url) {
            item = this.menus[i].value;
            break;
          } else {
            item = "home";
          }
        }
      }
      return item;
    },
  },
};
</script>

<style lang="scss" scoped>
.salary {
  margin-left: 15px;
  color: #cf6555;
}
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
  z-index: 9999;
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
        color: #545c63;
        text-align: center;
        font-size: 16px;
        height: 71px;
        line-height: 71px;
        transition: background-color 0.3s;
      }

      .menu li.active {
        color: #1c1f21;
        font-weight: 550;
        font-size: 18px;
      }

      .login-area {
        float: right;
        position: relative;
        .newcomer-box {
          position: relative;
        }

        .header-unlogin > li {
          float: left;
        }

        .shop-cart {
          float: left;
          height: 36px;
          line-height: 36px;
          margin: 18px 0;

          .shop-cart-icon {
            display: inline-block;
            padding: 0 12px;
            width: auto;
            box-sizing: border-box;
            height: 36px;
            line-height: 36px;
            color: #787d82;
            text-align: center;
            i {
              font-size: 20px;
            }
          }
        }

        .header-signin {
          color: #d9dde1;
          margin-left: 12px;

          a {
            color: #4d555d !important;
            display: inline-block;
            padding: 0 12px;
            height: 71px;
            line-height: 71px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
            -webkit-transition: background-color 0.2s;
            -moz-transition: background-color 0.2s;
            transition: background-color 0.2s;
          }
        }
      }

      .search-warp {
        position: relative;
        float: left;
        margin-left: 24px;
        min-width: 32px;
        height: 72px;

        .search-area {
          float: right;
          position: relative;
          height: 40px;
          padding-right: 36px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
          zoom: 1;
          background: #f3f5f6;
          border-radius: 4px;
          margin: 16px 0;
          width: 324px;
          box-sizing: border-box;
          font-size: 0;
          -webkit-transition: width 0.3s;
          -moz-transition: width 0.3s;
          transition: width 0.3s;

          .search-input {
            padding: 8px 12px;
            font-size: 14px;
            color: #9199a1;
            line-height: 24px;
            height: 40px;
            width: 100%;
            float: left;
            border: 0;
            -webkit-transition: background-color 0.3s;
            -moz-transition: background-color 0.3s;
            transition: background-color 0.3s;
            background-color: transparent;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -ms-box-sizing: border-box;
            box-sizing: border-box;
          }

          .btn_search {
            float: left;
            cursor: pointer;
            width: 30px;
            height: 38px;
            text-align: center;
            -webkit-transition: background-color 0.3s;
            -moz-transition: background-color 0.3s;
            transition: background-color 0.3s;
          }

          .hotTags {
            display: inline-block;
            position: absolute;
            top: 0;
            right: 32px;

            a {
              display: inline-block;
              padding: 4px 8px;
              height: 16px;
              font-size: 14px;
              color: #9199a1;
              line-height: 16px;
              margin-top: 8px;
              max-width: 60px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }

        .showhide-search {
          width: 20px;
          height: 24px;
          text-align: right;
          position: absolute;
          display: inline-block;
          right: 0;
          bottom: 24px;
          padding: 0 8px;
          border-radius: 18px;
        }

        i {
          display: block;
          height: 24px;
          color: #545c63;
          cursor: pointer;
          font-size: 17px;
          line-height: 24px;
          width: 20px;
        }
      }
    }
  }
}
</style>
