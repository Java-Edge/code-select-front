<template>
  <div class="container">
    <ul class="menu-ul">
      <li @click="changeMenu(item)" :class="{active:currentMenu===item.id}" v-for="item in menuData" :key="item.id"
          class="li-item"><a>{{ item.name }}</a>
        <ul v-if="item.children" class="child-ul">
          <li @click="changeMenu(cItem)" v-for="cItem in item.children" :key="cItem.id" class="cli-item">{{
              cItem.name
            }}
            <span v-if="cItem.tag" class="green">{{ cItem.tag }}</span></li>
        </ul>
      </li>
    </ul>
    <SubMenu v-if="currentMenu===1"/>
    <slot></slot>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import SubMenu from './SubMenu.vue';

const menuData = [{name: "首页", id: 1}, {
  name: "题库",
  id: 2,
  children: [{name: "专项练习", id: 11, pId: 2}, {name: "公司真题", id: 12, tag: "笔试", pId: 2}, {
    name: "公司真题",
    id: 13,
    tag: "面试",
    pId: 2
  }, {name: "在线编程", id: 14, pId: 2}]
}, {name: "面试", id: 3}, {name: "简历", id: 4}]
const currentMenu = ref(1)
const changeMenu = (item) => currentMenu.value = item.pId || item.id
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 56px;
  margin: 10px 0px;
  margin-left: 0px !important;
  background-color: #fff;
  border-radius: 10px;
}

.menu-ul {
  display: flex;
  height: 100%;
  align-items: center;
}

.li-item {
  padding: 0 12px;
  cursor: pointer;
  position: relative;
  font-size: 18px;
  height: 56px;
  line-height: 56px;

  a:hover {
    color: #32ca99;
  }
}

li.active {
  color: #32ca99
}

li.active::after {
  position: absolute;
  content: "";
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: #32ca99;
}

.li-item:hover .child-ul {
  display: block;
  z-index: 999;
}

.child-ul {
  display: none;
  position: absolute;
  top: 60px;
  width: 150px;
  border-radius: 5px;
  background: #fff;

  .cli-item {
    border-radius: 4px;
    color: #333;
    cursor: pointer;
    padding: 0 12px;
    line-height: 36px;
    list-style: none;
    margin: 0;
    outline: 0;
    display: flex;
    align-items: center;
  }

  .cli-item:hover {
    background-color: #eefaf7;
    color: #32ca99;
  }

  .green {
    background: #eefaf7;
    border-radius: 4px;
    color: #32ca99;
    font-size: 14px;
    font-weight: 400;
    height: 18px;
    line-height: 18px;
    margin-left: 4px;
    text-align: center;
    width: 32px;

  }
}</style>
