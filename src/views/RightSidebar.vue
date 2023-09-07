<template>
    <div class="right-sidebar">
      <div class="swiper swiper-container">
        <!-- ... (slides) ... -->
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide" v-for="slide in carouselData" :key="slide.id">
            <router-link :to="`/course/${slide.id}`">
              <img :src="slide.image" alt="轮播图" class="carousel-image" />
            </router-link>
          </div>
        </div>

        <!-- If we need navigation buttons -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <!-- If we need scrollbar -->
        <div class="swiper-scrollbar"></div>

        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </template>

  <script>
  import Swiper from 'swiper';
  import { Navigation, Pagination } from 'swiper/modules';
  // import Swiper and modules styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

  export default {
    name: 'RightSidebar',
    props: {
      carouselData: {
        type: Array,
        required: true,
      },
    },
    mounted() {
      // Initialize Swiper
      const swiper = new Swiper('.swiper', {
        modules: [Navigation, Pagination],
        direction: 'horizontal', // Change back to horizontal
        loop: true,
        autoplay: {
          delay: 3000, // Set the delay between slide transitions in milliseconds (3 seconds in this example)
          disableOnInteraction: false, // Allow auto play to continue even when the user interacts with Swiper
        },

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: true, // Allow pagination bullets to be clickable
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },

        // Add the loopedSlides option to control how many slides are looped
        loopedSlides: this.carouselData.length, // Set it to the total number of slides

        // Add the slideChange event handler for looping
        on: {
          slideChange: () => {
            if (swiper.realIndex === swiper.slides.length - 1) {
              // If it reaches the last slide, manually go to the first slide
              swiper.slideTo(0, 0, true); // Set the third parameter (boolean) to false for instant transition
            }
          },
        },
      });
    },
  };
  </script>

  <style scoped>
  /* 添加样式 */
  .right-sidebar {
    flex: 1;
    padding: 20px;
    min-width: 300px;
    /* Set a minimum width for the sidebar */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* Add the following CSS styles */
.swiper-pagination {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    /* Add some margin between carousel and pagination */
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    margin: 0 5px;
    /* Adjust the space between bullets as needed */
  }

  .swiper-pagination-bullet-active {
    background-color: #555;
  }

  .swiper-container {
    width: 100%;
    height: 450px;
    margin-bottom: 20px;
    position: relative;
    /* 添加以下样式以实现水平排列 */
    display: flex;
  }

  .swiper-slide img {
    width: 100%;
    height: 95%;
  }
  </style>
