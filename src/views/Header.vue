<template>
  <header class="header">
    <div class="clearfix header-content">
      <div class="index-menu clearfix">
        <div class="logo">
          <a href="/" target="_self" title="首页">
            <img title="慕课网" src="@/assets/logo.png" style="margin-left: 4px;">
          </a>
        </div>
        <nav class="menu">
          <ul class="menuul l">
            <li v-for="item in menus" :key="item.name" @click="handleMenuSelect(item)"
              :class="{ active: activeMenu === item.value }">{{ item.name }}
            </li>
          </ul>
        </nav>
        <div class="login-area">
          <ul class="header-unlogin clearfix newcomer-box">
            <li class="shop-cart">
              <a href="//order.imooc.com/pay/cart" class="shop-cart-icon" target="_blank">

                <span class="icon-shopping-cart js-endcart">
                  <el-icon><ShoppingCartFull /></el-icon>
                </span>
                <span class="shopping_icon js-cart-num" data-ordernum="0" data-cartnum="0" style="display: none">0</span>
              </a>
              <div class="my-cart">

              </div>
            </li>
            <li class="header-signin">
              <a href="//www.imooc.com/user/newlogin">登录</a> /
              <a href="//www.imooc.com/user/newsignup">注册</a>
            </li>
          </ul>
        </div>
        <div class="search-warp clearfix">
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
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { getCookieValue } from "@/utils/userUtil.js";
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      activeMenu: 'home', // 默认选中首页
      isLoggedIn: true, // Set this to true if the user is logged in
      username: "",
      menus: [
        { name: '首页', value: 'home', path: '/index' },
        { name: '动态', value: 'article', path: '/article-list/0' },
        { name: '招聘', value: 'recruit', path: '/recruit/index' },
        { name: '面经', value: 'interview', path: '/article-interview' },
        { name: '内推', value: 'recommend', path: '/inner-recommend' },
        { name: '导航', value: 'pilotPage', path: '/coursePage' },
        { name: '专栏', value: 'special', path: '/special' },
        { name: '排行版', value: 'ranking', path: '/ranking' },
        { name: '项目', value: 'project', path: '/projectList' },
        { name: '副业', value: 'sideline', path: '/sidelineList' }
      ]

    };
  },
  created() {
    this.getUserInfo();
  },
  computed: {
    ...mapState({
      activePath: state => state.nav.activePath
    })
  },
  methods: {
    handleMenuSelect(item) {
      this.activeMenu = item.value; // 更新选中的菜单项
      this.$router.push(item.path);
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
      setActivePath: 'nav/setActivePath'
    })
  },
};
</script>

<style lang="scss" scoped>
.header {
  background: #07111b;
  border-bottom: 1px solid #f3f5f6;

  .header-content {
    width: auto;
    z-index: 900;
    position: relative;
    background-size: cover;
    background-color: #fff !important;
    margin: 0 auto;

    .index-menu {
      min-width: 1152px;
      margin: 0 auto;

      .logo {
        float: left;
        margin: 0 20px;

        a {
          display: block;
          background: 0 0 !important;
          width: 140px;
          height: 71px;

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
        transition: background-color .3s;
      }

      .menu li.active {
        color: #1C1F21;
        font-weight: 500;
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
            i{
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
            color: rgba(255, 255, 255, .6);
            -webkit-transition: background-color .2s;
            -moz-transition: background-color .2s;
            transition: background-color .2s;
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
          border-bottom: 1px solid rgba(255, 255, 255, .4);
          zoom: 1;
          background: #f3f5f6;
          border-radius: 4px;
          margin: 16px 0;
          width: 324px;
          box-sizing: border-box;
          font-size: 0;
          -webkit-transition: width .3s;
          -moz-transition: width .3s;
          transition: width .3s;

          .search-input {
            padding: 8px 12px;
            font-size: 14px;
            color: #9199a1;
            line-height: 24px;
            height: 40px;
            width: 100%;
            float: left;
            border: 0;
            -webkit-transition: background-color .3s;
            -moz-transition: background-color .3s;
            transition: background-color .3s;
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
            -webkit-transition: background-color .3s;
            -moz-transition: background-color .3s;
            transition: background-color .3s;
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


// .menu {
//   display: flex;
//   justify-content: center;
// }

// .menu ul {
//   padding: 0;
//   margin: 0;

// }

// .menu li {
//   display: inline-block;
//   position: relative;
//   padding: 0 20px;
//   cursor: pointer;
//   height: 50px;
//   line-height: 50px;
//   font-size: 16px;
// }

// .menu li.active {
//   color: #ffd04b;
// }

// .menu li.active::after {
//   content: '';
//   width: 28px;
//   height: 2px;
//   border-radius: 2px;
//   background-color: #ffd04b;
//   position: absolute;
//   left: 50%;
//   margin-left: -14px;
//   bottom: 0px;
// }

// .nav {
//   width: 1600px;
//   margin: 0 auto;
//   display: flex;
//   align-items: center;
//   justify-content: space-evenly;

//   >div {
//     display: flex;
//     font-size: 16px;
//     font-weight: 600;
//     color: #222222;
//     height: 50px;
//     justify-content: center;
//     align-items: center;
//     font-family: PingFangSC-Medium, PingFang SC;
//     cursor: pointer;
//   }
// }

// .user-info {
//   display: flex;
//   align-items: center;
// }

// .user-profile {
//   display: flex;
//   align-items: center;
// }

// .user-avatar {
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   margin-right: 10px;
// }

// .user-name {
//   font-size: 14px;
// }

// .user-info button {
//   margin-left: 20px;
//   padding: 8px 12px;
//   background-color: #ffcc29;
//   border: none;
//   border-radius: 4px;
//   color: #333;
//   font-size: 14px;
//   cursor: pointer;
// }

// .auth-buttons {
//   display: flex;
//   align-items: center;
// }

// .auth-button {
//   padding: 8px 12px;
//   background-color: #ffcc29;
//   border: none;
//   border-radius: 4px;
//   color: #333;
//   font-size: 14px;
//   cursor: pointer;
//   text-decoration: none;
//   margin-right: 10px;
// }

/* Add any other additional styles you need for the header */</style>
