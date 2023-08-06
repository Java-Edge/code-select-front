<template>
  <div>
    <div v-for="(recruit, index) in recruits" :key="index">
      <div class="recruit">
        <div class="recruit-left">
          <div class="recruit-left1">
            <!--    岗位名称      -->
            <div>{{ recruit.title }}</div>
            <!--    薪资      -->
            <div class="salary">{{ recruit.salary }}</div>
          </div>
          <!--    岗位标签      -->
          <div>
            <span v-for="(item, index) in recruit.positionTags" :key="index" class="position-tag-class">{{ item }}</span>
          </div>
        </div>
        <div class="recruit-right">
          <!--    公司图片      -->
          <div>
            <div v-if="recruit.companyLogo != null">
              <img :src="recruit.companyLogo">
            </div>
            <div v-else>
              <img src="@/assets/default.jpg">
            </div>
          </div>
          <div>
            <!--    公司名称      -->
            <div class="company-name">{{ recruit.companyName }}</div>
            <!--    公司标签      -->
            <div>
              <span v-for="(item, index) in recruit.companyTags" :key="index" class="position-tag-class">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // recruit: {
    //   type: Object,
    //   required: true,
    // },
    recruits: Array,
  },
};
</script>

<style scoped>
.recruit {
  display: flex;
  width: 800px;
  height: 110px;
  background-color: white;
  border-radius: 8px;
  margin-top: 15px;
}
.recruit-left {
  padding-top: 20px;
  width: 60%;
  margin-left: 20px;
}
.recruit-left1 {
  display: flex;
  padding-bottom: 20px;
}
.salary {
  margin-left: 15px;
  color: #cf6555;
}
.recruit-right {
  display: flex;
  padding-top: 20px;
}
.recruit-right img {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  margin-top: 10px;
}
.company-name {
  padding-bottom: 20px;
}
.position-tag-class {
  font-size: 8px;
  padding: 5px;
  color: #555555;
  margin-right: 5px;
  background-color: #f6f6f8;
}
</style>
