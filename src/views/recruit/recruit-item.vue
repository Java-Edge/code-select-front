<template>
  <div class="recruit">
    <div class="recruit-left">
      <div>
        <!--    岗位名称      -->
        <div>{{ recruit.title }}</div>
        <!--    薪资      -->
        <div>{{ recruit.salary }}</div>
      </div>
      <!--    岗位标签      -->
      <div></div>
    </div>
    <div class="recruit-right">
      <!--    公司图片      -->
      <div></div>
      <div>
        <!--    公司名称      -->
        <div>{{ recruit.companyName }}</div>
        <!--    公司标签      -->
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recruit: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.recruit {
  display: flex;
  width: 800px;
  height: 120px;
  background-color: white;
}
</style>
