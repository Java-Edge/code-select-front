<template>
  <div class="course-navigation">
    <!--   筛选框   -->
    <div class="filter-box">
      <!-- <div class="filter-box1">
        <div
          class="filter-item"
          @click="handleFilterSelect('校招')"
          :class="{ active: activeMenu === '校招' }"
        >
          校招
        </div>
        <div
          class="filter-item"
          @click="handleFilterSelect('社招')"
          :class="{ active: activeMenu === '社招' }"
        >
          社招
        </div>
      </div> -->

        <div class="education-level-filter-box">
        <el-select
          v-model="recruitTypeValue"
          placeholder="招聘类型"
          style="width: 240px"
          collapse-tags
          clearable
          filterable
          @change="handleRecruitType"
        >
          <el-option
            v-for="item in recruitType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="education-level-filter-box">
        <el-select
          v-model="educationLevelValue"
          placeholder="学历要求"
          style="width: 240px"
          collapse-tags
          clearable
          filterable
          @change="handleChangeEducation"
        >
          <el-option
            v-for="item in educationLevel"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="graduate-year-filter-box">
        <el-select
          v-model="graduateYearValue"
          placeholder="毕业年限"
          style="width: 240px"
          collapse-tags
          clearable
          filterable
          @change="handleChangeGraduateYear"
        >
          <el-option
            v-for="item in graduateYear"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="salary-filter-box">
        <el-select
          v-model="salaryValue"
          placeholder="薪资要求"
          style="width: 240px"
          collapse-tags
          clearable
          filterable
          @change="handleChangesalary"
        >
          <el-option
            v-for="item in salaryRange"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="finance-filter-box">
        <el-select
          v-model="financeStageValue"
          placeholder="融资阶段"
          style="width: 240px"
          collapse-tags
          clearable
          filterable
          @change="handleChangeFinanceStage"
        >
          <el-option
            v-for="item in financeStage"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="person-scale-filter-box">
        <el-select
          v-model="personScaleValue"
          placeholder="公司规模"
          style="width: 240px"
          collapse-tags
          clearable
          filterable
          @change="handleChangePersonScale"
        >
          <el-option
            v-for="item in personScale"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="content">
      <!-- 内容区域 -->
      <div class="floorhd">
        <div class="grid_c1 floorhd_inner">
          <h3 class="floorhd_tit">招聘列表</h3>
        </div>
      </div>
      <!-- 课程详情区域 -->
      <RecruitList :recruits="recruits" />
    </div>
  </div>
</template>

<script>
import RecruitList from "./recruit-list.vue"; // Import the CourseList component

export default {
  name: "RecruitNavigation",
  components: {
    RecruitList, // Register the CourseList component
    // ... Rest of your components ...
  },
  data() {
    return {
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
      carouselData: [
        {
          id: 1,
          image:
            "https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230709183838817.png",
        },
        {
          id: 2,
          image: "https://via.placeholder.com/800x300?text=Slide%202",
        },
        {
          id: 3,
          image: "https://via.placeholder.com/800x300?text=Slide%203",
        },
        // 更多轮播图数据
      ],
      img: require("@/assets/background.jpg"),
      graduateYear: [],
      salaryRange: [
        // {
        //   value: "10000",
        //   label: "10k",
        // },
        // {
        //   value: "20000",
        //   label: "20k",
        // },
        // {
        //   value: "30000",
        //   label: "30k",
        // },
      ],
      scaleTag: [],
      personScale: [],
      salaryValue: "",
      educationLevelValue: "",
      graduateYearValue: "",
      personScaleValue: "",
      financeStageValue: "",
      recruitTypeValue: "",
      recruitList: [
        {
          title: "后端开发工程师",
          salary: "11-18k*20薪 ",
          companyName: "交行金科",
          positionTags: [
            "上海",
            "1-3年",
            "本科",
            "java",
            "软件开发",
            "后端开发",
          ],
          companyTags: ["金融", "未融资", "500-999人"],
        },
        {
          title: "后端开发工程师",
          salary: "11-18k*20薪 ",
          companyName: "交行金科",
          positionTags: [
            "上海",
            "1-3年",
            "本科",
            "java",
            "软件开发",
            "后端开发",
          ],
          companyTags: ["金融", "未融资", "500-999人"],
        },
      ],
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
    this.getRecruits();
    this.getSelections();
  },
  methods: {
    handleMenuSelect(index) {
      this.activeMenu = index; // 更新选中的菜单项
      // 可根据不同的菜单项进行相应的页面跳转或其他操作
    },
    getRecruits(condition) {
      let params = {
        pageNo: 1,
        pageSize: 20,
        param: {
          companyId: "",
          careerJobId: "",
          ...condition
        },
      };
      this.$axios
        .post(
          "/back/recruit/selectByCondition",
          params
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
    handleFilterSelect(value) {
      console.log(value);
    },

    getSelections() {
      // 1. 学历要求
      this.getDctionary("education_level", (result) => {
        this.educationLevel = result;
      });

      // 2. 毕业年限
      this.getDctionary("graduate_year", (result) => {
        this.graduateYear = result;
      });

      // 3. 薪资要求
      this.getDctionary("salary_range", (result) => {
        this.salaryRange = result;
      });

      // 4. 融资阶段
      this.getDctionary("finance_stage", (result) => {
        this.financeStage = result;
      });

      // 5. 公司规模
      this.getDctionary("person_scale", (result) => {
        this.personScale = result;
      });

      // 6. 招聘类型
      this.getDctionary("recruit_type", (result) => {
        this.recruitType = result;
      });
    },

    getDctionary(typeKey, callback) {
      this.$axios
        .get(
          "/back/dictionary/list?typeKey=" + typeKey
          // ,
          //     {
          //         headers: {
          //             "Authorization": this.$store.getters.getToken
          //         }
          //     }
        )
        .then((response) => {
          const result = response.data.result;
          console.log(response);
          // this.$message({
          //     type: 'success',
          //     message: response.data.message
          // });
          console.log(result);
          callback(result.list);
        });
    },

    handleChangeEducation() {
      console.log(this.educationLevelValue);
      let param = {
        eduLevel: this.educationLevelValue,
        graduateYear: this.graduateYearValue,
        personScale: this.personScaleValue,
        salaryRange: this.salaryValue,
        scaleTag: this.financeStageValue,
        recruitType: this.recruitTypeValue,
      };
      this.getRecruits(param);
    },

    handleChangeGraduateYear() {
      console.log(this.educationLevelValue);
      let param = {
        eduLevel: this.educationLevelValue,
        graduateYear: this.graduateYearValue,
        personScale: this.personScaleValue,
        salaryRange: this.salaryValue,
        scaleTag: this.financeStageValue,
        recruitType: this.recruitTypeValue,
      };
      this.getRecruits(param);
    },

    handleChangesalary() {
      console.log(this.educationLevelValue);
      let param = {
        eduLevel: this.educationLevelValue,
        graduateYear: this.graduateYearValue,
        personScale: this.personScaleValue,
        salaryRange: this.salaryValue,
        scaleTag: this.financeStageValue,
        recruitType: this.recruitTypeValue,
      };
      this.getRecruits(param);
    },

    handleChangeFinanceStage() {
      console.log(this.educationLevelValue);
      let param = {
        eduLevel: this.educationLevelValue,
        graduateYear: this.graduateYearValue,
        personScale: this.personScaleValue,
        salaryRange: this.salaryValue,
        scaleTag: this.financeStageValue,
        recruitType: this.recruitTypeValue,
      };
      this.getRecruits(param);
    },

    handleChangePersonScale() {
      console.log(this.educationLevelValue);
      let param = {
        eduLevel: this.educationLevelValue,
        graduateYear: this.graduateYearValue,
        personScale: this.personScaleValue,
        salaryRange: this.salaryValue,
        scaleTag: this.financeStageValue,
        recruitType: this.recruitTypeValue,
      };
      this.getRecruits(param);
    },
    handleRecruitType() {
      console.log(this.educationLevelValue);
      let param = {
        eduLevel: this.educationLevelValue,
        graduateYear: this.graduateYearValue,
        personScale: this.personScaleValue,
        salaryRange: this.salaryValue,
        scaleTag: this.financeStageValue,
        recruitType: this.recruitTypeValue,
      };
      this.getRecruits(param);
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
.education-level-filter-box {
  margin-top: 22px;
  margin-left: 22px;
}
.graduate-year-filter-box {
  margin-top: 22px;
  margin-left: 22px;
}
.finance-filter-box {
  margin-top: 22px;
  margin-left: 22px;
}
.person-scale-filter-box {
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

.floorhd {
  height: 65px;

  .grid_c1 {
    margin: 0 auto;
    width: 1600px;

    .floorhd_tit {
      position: relative;
      width: 150px;
      height: 45px;
      font-size: 28px;
      font-weight: 700;
      text-align: center;
      line-height: 45px;
      padding: 0 30px;
      margin: 0 auto 20px;
      overflow: hidden;
      color: #333;
    }
  }
}

.floorhd_tit::before {
  background-position: 0 0;
  left: 0;
}

.floorhd_tit:after {
  background-position: -25px 0;
  right: 0;
}

.floorhd_tit:after,
.floorhd_tit:before {
  content: "";
  position: absolute;
  top: 50%;
  margin-top: -10px;
  background-image: url("@/assets/sprite.png");
  width: 25px;
  height: 20px;
}
</style>
