<template>
  <!-- 招聘列表卡片 -->
  <router-link :to="`/recruit/${recruit.id}`" class="link-sty">
    <div class="course-box" @click="deliver(recruit.sourceUrl)">
      <div class="course-container">
        <!-- 上板块 -->
        <div class="course-group-first">
          <div class="course-group-wrapper">
            <div class="course-group-header">
              <span class="course-group-header-title">{{ recruit.title }}</span>
            </div>
            <div class="course-group-treatment">
              <div class="course-group-treatment-item course-group-salary">{{ recruit.salary }} </div>
              <div class="course-group-treatment-item course-group-treatment-item-block label">{{ recruit.education }}</div>
              <div class="course-group-treatment-item course-group-treatment-item-block label">{{ recruit.jobCity }}</div>
            </div>
          </div>
          <div class="course-group-wrapper">
            <img :src=recruit.picUrl :alt=recruit.companyName class="company-picture" /> 
            <span class="course-group-header-title company-name">{{ recruit.companyName }}</span>
          </div>
        </div>
        <!-- 下板块 -->
        <div class="course-group-second">
          
          <!-- <div class="des">{{ recruit }}</div> -->
        </div>
      </div>
      <!-- <button class="learn-button" @click="deliver(selectedRecruit.sourceUrl)">
          点击投递
      </button> -->

      <!-- 侧边栏内容展示 可以放置广告, 友链等信息 -->
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    recruit: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // shortenTitle(title) {
    //   if (title.length > 8) {
    //     return title.slice(0,8) + "...";
    //   }
    //   return title;
    // },
    deliver(sourceUrl) {
      // console.log(sourceUrl);
      if(sourceUrl !== null){
        window.open(sourceUrl);
      }
    },
  },
};
</script>

<style scoped>
.link-sty {
  text-decoration: none;
  color: black;
}
.course-box {
  flex: 0 0 calc(50% - 20px);
  max-width: 1000px;
  width: 1000px;
  height: 150px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
   box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25);
  border-radius: 5px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s ease-in-out;
  padding: 10px;
}

.course-box:hover {
  transform: scale(1.05);
}

.course-details {
  font-size: 14px;
  color: #777777;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.course-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
}

.course-group-first {
  height: 65%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
}

.course-group-second {
  height: 30%;
  width: 100%;
  /* border: 1px solid blue; */
  padding-left: 15px;
}

.course-group-wrapper {
  width: 50%;
  height: 100%;
  /* border: 1px solid pink; */
}

.course-group-header {
  width: 100%;
  height: 30%;
  /* border: 1px solid purple; */
}

.course-group-treatment {
  /* border: 1px solid orangered; */
  width: 100%;
  height: 65%;
  padding-top: 15px;
}

.course-group-treatment-item {
  height: 30px;
  width: fit-content;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  float: left;
  margin-right: 25px;
  white-space: nowrap;
}

.course-group-treatment-item-block {
  background-color: #eee;
  border-radius: 8px;
}

.course-group-salary {
  color: #fe574a;
}

.label {
  color: #888888;
}

.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  margin-bottom: 1px;
}

.title {
  font-size: 16px;
  color: #333333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.course-group-header-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.company-name {
  width: 100%;
  margin-top: 35px;
  margin-left: 5px;
}

.red {
  color: red;
}

.des {
  padding-top: 10px;
}

.company-picture {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 10px;
  float: left;
}

.learn-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 12px 24px;
  font-size: 18px;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.learn-button:hover {
  background-color: #0056b3;
}

.learn-button:focus {
  outline: none;
}
</style>
