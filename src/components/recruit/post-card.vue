<template>
    <div class="course-container">
        <!-- 上板块 -->
        <div class="course-group-first">
            <div class="course-group-wrapper course-group-wrapper-first">
                <div class="course-group-header">
                    <span class="course-group-header-title">{{ recruit.title }}</span>
                </div>
                <div class="course-group-treatment">
                    <div class="course-group-tag-item course-group-salary">{{ recruit.salary }} </div>
                    <div class="course-group-tag-item course-group-tag-item-block" v-if="recruit.education">{{
                        recruit.education }}</div>
                    <div class="course-group-tag-item course-group-tag-item-block">{{ recruit.jobCity }}</div>
                </div>
            </div>
            <div class="course-group-wrapper">
                <div class="course-group-company-container">
                    <img :src=recruit.picUrl :alt=recruit.companyName class="company-picture" />
                    <span class="course-group-header-title company-name">{{ recruit.companyName }}</span>
                    <div class="course-group-company-status">
                        <!-- 公司状态，传递数组数据即可  -->
                        <div class="course-group-tag-item course-group-tag-item-block">
                            移动互联网
                        </div>
                        <div class="course-group-tag-item course-group-tag-item-block">
                            已上市
                        </div>
                        <div class="course-group-tag-item course-group-tag-item-block">
                            10000人以上
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 下板块 -->
        <div class="course-group-second">
            <div class="course-group-footer-wrapper course-group-footer-wrapper-first">
                <!-- 招聘技术栈要求 -->
                <!-- TODO：当文案过长时，是否过滤掉超出部分 -->
                <div class="course-group-tag-item course-group-tag-item-footer"
                    v-for="(item, index) in ['Java', 'Go', 'MySQL', '嵌入式', '单片机/开发经验', '教师']" :key="index">
                    {{ item }}
                </div>
            </div>
            <div class="course-group-footer-wrapper">
                <!-- 福利待遇，显示字符串 -->
                <div class="course-group-tag-item course-group-tag-item-footer course-group-tag-item-footer-benefits">
                    生日福利、餐饮及下午茶、节日奖品、五险一金、全勤奖、零食、带薪年假</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Recruit-Card',
  props: {
    recruit: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
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
}

.course-group-wrapper {
  width: 50%;
  height: 100%;
  /* border: 1px solid pink; */
}

.course-group-wrapper-first {
  margin-left: 20px;
}

.course-group-header {
  width: 100%;
  height: 30%;
  /* border: 1px solid purple; */
}


.course-group-second {
  height: 30%;
  line-height: 30%;
  width: 100%;
  /* border: 1px solid blue; */
  background-color: rgb(252, 251, 250);
  display: flex;
  justify-content: space-around;
}

.course-group-footer-wrapper {
  width: 50%;
  height: 100%;
}

/* 第一个内边距 20px */
.course-group-footer-wrapper-first {
  padding-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


.course-group-treatment {
  /* border: 1px solid orangered; */
  width: 100%;
  height: 65%;
  padding-top: 15px;
}

.course-group-tag-item {
  height: 30px;
  width: fit-content;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  float: left;
  margin-right: 25px;
  white-space: nowrap;
}

.course-group-tag-item-block {
  background-color: #eee;
  padding: 2px 5px;
  border-radius: 8px;
}

.course-group-tag-item-footer {
  margin-top: 7px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.course-group-tag-item-footer-benefits {
  width: 470px;
}

.course-group-salary {
  color: #fe574a;
}

.course-group-company-container {
  /* border: 1px solid red; */
  width: 600px;
  height: 100px;
}

.course-group-company-status {
  /* border: 1px solid orangered; */
  margin-left: 75px;
  padding-top: 10px;
  width: 590px;
  height: 50px;
  line-height: 50px;
}

.label {
  color: #888888;
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

.company-picture {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 10px;
  float: left;
}

</style>