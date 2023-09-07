<template>
  <div class="content">
    <!-- 分类菜单 -->
    <div class="menu-content" @mouseout="hideSubMenu">
      <div class="menu-item" v-for="(item, index) in menu_list" :key="index" @mouseover="showSubMenu(index)">
        <a href="">
          <span>{{ item.title }}</span>
          <img src="https://s1.ax1x.com/2023/04/20/p9klxA0.png" class="icon-stle">
        </a>
      </div>
    </div>
    <!-- END -->

    <!-- 二级菜单 -->
    <div class="sub-menu hide" @mouseover="showSubMenu(-1)" @mouseout="hideSubMenu">
      <div class="inner-box" v-show="menu_item_index == index" v-for="(item, index) in menu_list" :key="index">
        <div class="sub-inner-box">
          <div class="title">{{ item.title }}</div>
          <div class="sub-row" v-for="(item1, ind) in item.list" :key="ind">
            <span class="bold">{{ item1.menu_title }} :</span>
            <a href="" class="menu" v-for="(item2, ind2) in item1.menus" :key="ind2" style="display: inline-block;" >{{ item2 }}</a>
          </div>
        </div>
      </div>
    </div>
    <!-- END -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 当前鼠标移入的分类菜单下标
      menu_item_index: 0,

      // 分类菜单数据（json格式，我提前整理好的）
      menu_list: [
        {
          title: '前端开发',
          list: [{
            menu_title: '知识点',
            menus: ['Vue.js', 'Typescript', 'React.js', 'HTML/CSS', 'Javascript', 'Angular', 'Node.js', 'JQuery', 'Bootstrap',
              'Sass/Less', 'WebApp', '小程序', '前端工具', 'CSS', 'HTML5', 'CSS3']
          },
          ]
        },
        {
          title: '后端开发',
          list: [{
            menu_title: '知识点',
            menus: ['Java', 'SpringBoot', 'SpringCloud', 'SSM', 'PHP', '.net', 'Python', '爬虫', 'Django', 'Flask', 'Tornado', 'Go', 'C', 'C++'
              , 'C#', 'Ruby', 'ThinkPHP']
          },
          ]
        },
        {
          title: '移动开发',
          list: [{
            menu_title: '知识点',
            menus: ['Android', 'IOS', 'React Native', 'WEEX', 'Swift']
          },
          ]
        },
        {
          title: '计算机基础',
          list: [{
            menu_title: '计算机基础',
            menus: ['密码学', '信息安全', '计算机网路', '算法与数据结构', '数学']
          },
          {
            menu_title: '数据库',
            menus: ['MySQL', 'Redis', 'MongoDB', 'Oracle', 'SQL Server', 'NoSQL']
          },
          ]
        },
        {
          title: '前沿技术',
          list: [{
            menu_title: '前沿技术',
            menus: ['微服务', '区块链', '以太坊', '机器学习', '深度学习', '计算机视觉', '自然语言处理', '数据分析与挖掘']
          },
          {
            menu_title: '云计算&大数据',
            menus: ['大数据', 'Hadoop', 'Spark', 'Hbase', 'Flink', 'Storm', '云计算', 'AWS', 'DOcker', 'Kubernetes']
          },
          ]
        },
        {
          title: '测试运维',
          list: [{
            menu_title: '知识点',
            menus: ['运维', '自动化运维', '运维工具', '中间件', 'Linux', '测试', '功能测试', '性能测试', '自动化测试', '接口测试', '安全测试']
          },
          ]
        },
        {
          title: '更多方向',
          list: [{
            menu_title: '产品设计',
            menus: ['模型制作', '动效动画', '设计基础', '设计工具', 'APP UI设计', '产品交互', 'PhotoShop']
          },
          {
            menu_title: '游戏',
            menus: ['Unity 3D', 'Cocos2d-x']
          },
          ]
        }],

    }
  },

  mounted() {

  },

  methods: {

    // 显示对应的二级分类菜单
    showSubMenu(index) {
      if (index != -1) {
        this.menu_item_index = index;
      }
      document.querySelector('.sub-menu').classList.remove('hide');
    },

    // 隐藏二级分类菜单
    hideSubMenu() {
      document.querySelector('.sub-menu').classList.add('hide');
    },

  }
}
</script>

<style scoped>
/* 根节点 */
.content {
  position: relative;
  width: 20%;
  /* padding: 30px; */
  /* background-color: #f0f0f0; */
}

/* END */

/* 覆盖默认a标签样式 */
a {
  text-decoration: none;
}

a:link,
a:visited {
  color: #5e5e5e;
}

/* END */

/* 左侧分类菜单 */
.menu-content {
  width: 244px;
  height: 454px;
  background-color: rgba(0, 0, 0, .5);
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 6px;
}

.menu-item {
  height: 64px;
  line-height: 66px;
  padding: 0 24px;
  cursor: pointer;
}

.menu-item:hover {
  background: rgba(0, 0, 0, .2);
  /* .2 就是过渡的时间 */
  transition: all .2s linear;
}

.menu-item a {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 0 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  height: 64px;
  font-size: 16px;
}

.menu-item:last-child a {
  border-bottom: none;
}

.menu-item a span {
  flex: 1;
}

.menu-item a .fa {
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
}

/* 二级分类菜单 */
.sub-menu {
  border: 1px solid #d9dde1;
  background-color: #fff;
  width: calc(80vw - 244px);
  max-width: 730px;
  height: 458px;
  position: absolute;
  left: 244px;
  top: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* z-index设置为2将二级菜单置于顶层 */
  z-index: 2;
}

.hide {
  display: none;
}

.inner-box {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.sub-inner-box {
  width: 100%;
  margin-left: 40px;
  width: calc(100% - 40px);
}

.sub-inner-box .title {
  color: #00CA78;
  font-size: 16px;
  line-height: 16px;
  font-weight: bold;
  margin-top: 28px;
  margin-bottom: 30px;
}

.sub-inner-box .sub-row {
  margin-bottom: 25px;
  line-height: 25px;
}

.sub-inner-box .sub-row .bold {
  font-weight: 700;
  margin-right: 15px;
}

.sub-inner-box .sub-row a {
  margin-right: 15px;
}

.icon-stle {
  width: 17px;
  height: 17px;
}

.banner-img {
  width: 100%;
  height: 100%;
}
</style>
