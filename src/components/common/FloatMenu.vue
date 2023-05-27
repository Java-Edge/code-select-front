<template>
  <ul id="menu">
    <li 
      v-for="(item, index) in menuItems" 
      :key="index"
      :title="item.name"
      :class="item.name === activeTitle ? 'active' : ''"
      @click.stop="onMenuClick(item, index)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  menuItems: {
    type: Array,
    required: true
  },
  headerOffset: {
    type: Number,
    default: 45
  }
})

const emit = defineEmits(['menuClick'])

const activeTitle = ref(null)

// 滚动到指定部分
const onMenuClick = (item, index) => {
  activeTitle.value = item.name
  
  if(item.id) {
    const element = document.querySelector(item.id)
    if(element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - props.headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }
  
  emit('menuClick', item, index)
}
</script>

<style lang="scss" scoped>
#menu {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 120px;
  height: auto;
  max-height: 100vh;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(7, 17, 27, .1);
  border-radius: 0 8px 8px 0;
  text-align: center;
  color: #6d7278;
  z-index: 3;
  user-select: none;
  
  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #d8d8d8;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
}

#menu li {
  position: relative;
  padding: 16px 0;
  cursor: pointer;
  transition: color .2s;
}

#menu li.active,
#menu li:hover {
  color: #e02020;
}

#menu li+li::after {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -30px;
  content: '';
  width: 60px;
  border: 1px solid #f3f5f7;
}
</style>