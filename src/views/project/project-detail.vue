<template>
  <div class="project-detail main-content">
    <div class="project-title">
      {{ project.title }}
    </div>
    <div class="project-btn">
      <a :href="project.href" target="_blank">阅读源码</a>
    </div>
    <div class="project-des">
      <div class="left-border">项目简介</div>
      <div class="project-content">{{ project.des }}</div>
    </div>
    <div
      class="architecture-img"
      v-if="project.architectureImg != null && project.architectureImg != ''"
    >
      <div class="left-border">架构图</div>
      <div class="archi-img">
        <!-- <img src="https://pic.imgdb.cn/item/64cf41fe1ddac507ccff877a.png" /> -->
        <img :src="project.architectureImg" style="max-width:100%"/>
      </div>
    </div>
    <div class="will-learn">
      <div class="left-border">通过本项目你将学到</div>
      <div class="project-content"  v-html="project.willLearn">
      </div>
    </div>
    <div class="project-highlight">
      <div class="left-border">项目亮点</div>
      <div class="project-content"   v-html="project.highlight">
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
const route = useRoute();
const project = ref({});
const projectId = route.params.id;
const getProjectDetail = async () => {
  axios.get(`/back/project/getById/${projectId}`).then((res) => {
    console.log(res);
    project.value = res.data.result;
  });
};
getProjectDetail();
</script>
<style lang="scss" scoped>
.project-detail {
  margin: 0 auto;
  margin-top: 25px;
}
.project-title {
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  // background-color: #0d1633;
  height: 125px;
  line-height: 125px;
  color: black;
}
.project-btn {
  margin-bottom: 25px;
}
.project-btn a {
  background-color: #ff3030;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
}
.project-btn a:hover {
  background-color: #ee2c2c;
}

.left-border {
  border-left: 5px solid #ff6a6a;
  // background-image: linear-gradient(to bottom, white, pink);
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
}
.project-content {
  line-height: 30px;
}
.archi-img {
  display: flex;
  // justify-content: space-around;
}
</style>
