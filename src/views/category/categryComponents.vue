<template>
  <div class="view-box main-content">
    <div class="head-line">{{ title }}</div>
    <div class="item-list">
      <div v-for="(item, index) in list" :key="index">
        <div class="item-class">
          <a :href="item.link" style="text-decoration:none;">
            <img :src="item.img"/>
            <span>{{ item.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    list: {
      link: String,
      img: String,
      name: String,
    },
  },
};
</script>

<style>
.view-box {
  width: 80%;
  margin-bottom: 14px;
  border-radius: 4px;
  background: #fff;
}
.head-line {
  margin: 15px 20px;
}
.item-list {
  display: flex;
  flex-flow: wrap;
  margin-bottom: 20px;
}
.item-class {
  width: 150px;
  margin: 15px 15px;
}
.item-class img {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-right: 6px;
  vertical-align: center;
  object-fit: contain;
}
</style>
