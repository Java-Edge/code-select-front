<template>
  <div class="content-class" style="padding-top:10px;">
    <div v-for="(value, key) in pilotList" :key="key">
      <categry-components :list="value" :title="key"></categry-components>
    </div>
  </div>
</template>

<script setup>
import CategryComponents from "@/views/category/categryComponents.vue";

import axios from 'axios'
import {ref} from "vue";

let pilotList = ref({})

const getPilotType = () => {
  axios.get('/back/pilot/getList').then(res => {
    pilotList.value = res.data.result
  }).catch(err => {
    console.log('err', err)
  })
}
getPilotType()
</script>

<style>
.category-com {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
