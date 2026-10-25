<template>
  <div class="job-search-box clearfix">
    <div class="job-search-form">
      <span @click="openDialog" class="city-label">
        {{ name || data.locationCity.name }}
      </span>
      <div class="search-input-box">
        <div class="input-wrap input-wrap-text">
          <input
            v-model="keyword"
            autocomplete="on"
            spellcheck="false"
            type="text"
            placeholder="搜索职位、公司"
            class="input"
          />
        </div>
      </div>
      <a href="javascript:;" class="search-btn" @click="handleSearch">搜索</a>
    </div>
    <city-dialog ref="cityDialogRef" @confirm="handleConfirm" />
    <a
      @click="$router.push('/login')"
      class="go-login-btn"
      v-if="!store.getters['user/isAuthenticated']"
    >
      登录，查看更多岗位
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import CityDialog from './cityDialog.vue'
import data from '../city.json'

const store = useStore()
const cityDialogRef = ref<InstanceType<typeof CityDialog> | null>(null)
const name = ref<string>()
const keyword = ref<string>()

const emit = defineEmits<{
  (e: 'search', payload: { keyword?: string; city?: string }): void
  (e: 'city-change', item: { name: string }): void
}>()

const openDialog = () => {
  cityDialogRef.value?.showDialog()
}

const handleConfirm = (item: { name: string }) => {
  name.value = item.name
  emit('city-change', item)
}

const handleSearch = () => {
  emit('search', {
    keyword: keyword.value,
    city: name.value
  })
}

defineExpose({
  keyword,
  name,
  openDialog
})
</script>

<style lang="scss" scoped>
.job-search-box {
  margin: 0 auto;
  
  .job-search-form {
    position: relative;
    float: left;
    width: 844px;
    height: 50px;
    background: #00bebd;
    border-radius: 12px;
    border: 2px solid #00bebd;
    
    .input-wrap {
      width: 100%;
      color: #222;
      margin-left: -1px;
    }
    
    .city-label {
      box-sizing: border-box;
      position: relative;
      float: left;
      background: #fff;
      width: 136px;
      font-size: 16px;
      font-weight: 400;
      color: #222;
      line-height: 22px;
      height: 50px;
      padding: 14px 24px 14px 18px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-radius: 10px 0 0 10px;
      border-right: 1px solid #fff;
      cursor: pointer;
      transition: all 0.2s linear;
    }
    
    .city-label:after {
      content: " ";
      position: absolute;
      top: 21px;
      right: 18px;
      width: 4px;
      height: 7px;
      background: url(https://img.bosszhipin.com/static/file/2022/01vcskhm8y1652252017628.png) -6px -16px/10px auto no-repeat;
      transform: rotate(90deg);
      z-index: 1;
    }
    
    .search-input-box {
      position: relative;
      float: left;
      background: #fff;
      width: 588px;
      border-radius: 0 10px 10px 0;
    }
    
    .input {
      box-sizing: border-box;
      height: 50px;
      border: none;
      box-shadow: none;
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      padding: 14px 18px;
      border-radius: 0 12px 12px 0;
    }
    
    .search-btn {
      float: left;
      display: block;
      font-weight: 500;
      color: #fff;
      line-height: 28px;
      width: 116px;
      font-size: 20px;
      text-align: center;
      padding: 11px 0;
    }
  }
  
  .go-login-btn {
    box-sizing: border-box;
    float: right;
    width: 236px;
    height: 54px;
    text-align: center;
    border-radius: 12px;
    border: 1px solid #00bebd;
    font-size: 16px;
    font-weight: 400;
    color: #00a6a7;
    line-height: 22px;
    padding: 15px 0;
    transition: all 0.2s linear;
  }
}
</style>

