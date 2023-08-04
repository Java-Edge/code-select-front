<template>
    <div id="app" class="course-navigation">
        <Header/>
        <router-view class="body"/>
        <Footer/>
    </div>
</template>
<script>
  import Header from './views/Header.vue'; // Import the Header component
  import Footer from './views/Footer.vue'; // Import the Footer component
  
  
  export default {
    name: "RecruitNavigation",
    components: {
      Header, // Register the Header component
      Footer, // Register the Footer component
      // ... Rest of your components ...
    },
  
  };
  </script>
  
<style scoped>
    #app {
        /* position: absolute; */
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
  .body {
    min-height: 800px;
  }
  .course-navigation {
    max-width: 1600px;
    margin: 0 auto;
  }
</style>
