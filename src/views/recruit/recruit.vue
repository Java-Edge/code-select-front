<template>
  <div class="course-navigation">
    <filterVue />
    <!-- 内容区域 -->
    <div style="font-size: 30px; text-align: center; margin-top: 30px">
      -- 招聘列表 --
    </div>
    <!-- 课程详情区域 -->
    <RecruitList :recruits="recruits" />
  </div>
</template>

  <script>
import RecruitList from "./recruit-list.vue"; // Import the CourseList component
import filterVue from "./compontents/filter.vue";

export default {
  name: "RecruitNavigation",
  components: {
    RecruitList,filterVue
  },
  data() {
    return {
      name: "",
      activeMenu: "home", // 默认选中首页
      recruits: [], // 所有课程数据，从后端获取或静态定义
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        loop: true,
        autoplay: {
          delay: 3000,
        },
      },
    };
  },
  computed: {
    recruitRows() {
      // 将所有课程按每行4个进行分组
      const rows = [];
      for (let i = 0; i < this.recruits.length; i += 4) {
        rows.push(this.recruits.slice(i, i + 4));
      }
      return rows;
    },
  },
  created() {
    this.getRecruit();
  },
  methods: {
    getRecruit() {
      let condition;
      condition = {
        pageNo: 1,
        pageSize: 20,
        param: {
          companyId: "",
          careerJobId: "",
        },
      };
      this.$axios
        .post(
          "/back/recruit/selectByCondition", condition
          // ,
          //     {
          //         headers: {
          //             "Authorization": this.$store.getters.getToken
          //         }
          //     }
        )
        .then((response) => {
          let result = response.data.result;
          this.recruits = result.records;
          this.total = result.total;

          console.log(this.recruits);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  background-color: #e9eef3;
}
/* 添加样式 */
.course-navigation {
  max-width: 1600px;
  margin: 0 auto;
}
.filter-box {
  display: flex;
}
.filter-box1 {
  display: flex;
  margin-top: 25px;
  margin-left: 20px;
}
.recruit-list {
  display: flex;
  justify-content: center;
}
.filter-item {
  background-color: white;
  width: 60px;
  height: 33px;
  line-height: 33px;
  text-align: center;
  margin-left: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 2px;
  font-size: 15px;
  color: #606266;
}

/* 选中状态下的样式 */
.filter-item.selected {
  background-color: #007bff;
  color: #fff;
}
.time-filter-box {
  margin-top: 22px;
  margin-left: 22px;
}
.salary-filter-box {
  margin-top: 22px;
  margin-left: 22px;
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
}

.menu li.active {
  color: #ffd04b;
  border-bottom: 2px solid #ffd04b;
}

.content {
  display: flex;
  flex-wrap: wrap;
  /* Wrap the sidebar and swiper to next row if necessary */
}

.left-sidebar {
  width: 20%;
  padding: 20px;
  background-color: #f0f0f0;
}

.left-sidebar h3 {
  margin-bottom: 10px;
  font-size: 18px;
}

.left-sidebar ul {
  list-style: none;
  padding: 0;
}

.left-sidebar li {
  margin-bottom: 10px;
  cursor: pointer;
}

.right-sidebar {
  flex: 1;
  padding: 20px;
  min-width: 300px;
  /* Set a minimum width for the sidebar */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Add the following CSS styles */

.swiper-pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  /* Add some margin between carousel and pagination */
}

.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background-color: #ccc;
  border-radius: 50%;
  margin: 0 5px;
  /* Adjust the space between bullets as needed */
}

.swiper-pagination-bullet-active {
  background-color: #555;
}
/* 背景图片样式 */
.background-image {
  width: 1600px;
  height: 250px;
  margin-top: 50px;
}

.swiper-container {
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
  position: relative;
  /* 添加以下样式以实现水平排列 */
  display: flex;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
}
.input-wrap {
  position: relative;
  display: inline-block;
  min-width: 300px;
  vertical-align: middle;
  line-height: normal;
}

</style>
  