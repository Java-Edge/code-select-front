<template>
  <router-link :to="`/recruit/${recruit.id}`" class="link-sty">
    <div class="course-box" @click="deliver(recruit.sourceUrl)">
      <div class="course-details">
        <div class="line">
          <h4 class="title">{{ shortenTitle(recruit.title) }}</h4>
          <space/>
          <div class="salary">
            <span class="label red">{{ recruit.salary }} </span>
          </div>
        </div>
        <div class="line">
          <div class="education">
            <span class="label">{{ recruit.education }}</span>
          </div>
          <div class="city">
            <span class="label">{{ recruit.jobCity }}</span>
          </div>
        </div>
        <div class="line">
          <img :src=recruit.picUrl :alt=recruit.companyName class="company-picture" /> 
          <div class="companyName">
            <span class="label">{{ recruit.companyShortName }}</span>
          </div>
          <div class="experience">
            <span class="label">{{ recruit.graduationYear }}</span>
          </div>
        </div>
        <div class="des">{{ recruit.des }}</div>
        <!-- <button class="learn-button" @click="deliver(selectedRecruit.sourceUrl)">
            点击投递
        </button> -->
      </div>
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
    shortenTitle(title) {
      if (title.length > 8) {
        return title.slice(0,8) + "...";
      }
      return title;
    },
    deliver(sourceUrl) {
      console.log(sourceUrl);
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
  max-width: 400px;
  height: 150px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  margin-bottom: 1px;
}

.title {
  font-size: 14px;
  color: #333333;
  margin: 0;
  margin-bottom: 1px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.label {
  font-weight: bold;
  font-size: 12px;
  color: #888888;
  white-space: nowrap;
}

.red {
  color: red;
}

.des {
  padding-top: 10px;
}

.company-picture{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
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
