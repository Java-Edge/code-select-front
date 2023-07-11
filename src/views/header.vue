<template>
    <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1"> <router-link :to="`/index`">首页</router-link></el-menu-item>
            <el-submenu index="2">
                <template slot="title">VIP</template>
            </el-submenu>
            <el-menu-item index="3">学习路线</el-menu-item>
            <el-menu-item index="4">系统课</el-menu-item>
            <el-menu-item index="5">粉丝群</el-menu-item>
        </el-menu>
        <div class="line"></div>
    </el-header>
</template>
  
<script>
export default {
    name: 'Header',
    data() {
        return {
            websiteName: 'JAVA',
            contactPhone: '123-456-7890',
        };
    },
    computed: {
        currentYear() {
            return new Date().getFullYear();
        },
    },
};
</script>
  
<style>
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}
</style>
  