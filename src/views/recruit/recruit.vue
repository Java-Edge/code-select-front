<template>
    <div class="course-navigation">
      <!-- 内容区域 -->
      <div style="font-size: 30px; text-align: center; margin-top: 30px;">-- 招聘列表 --</div>
      <!-- 课程详情区域 -->
      <RecruitList :recruits="recruits" />
<!--      <RecruitItem :recruit="recruitItem"></RecruitItem>-->
    </div>
  </template>
  
  <script>
  import Swiper from 'swiper';
  import { Navigation, Pagination } from 'swiper/modules';
  // import Swiper and modules styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import Header from '../Header.vue'; // Import the Header component
  import Footer from '../Footer.vue'; // Import the Footer component
  import RecruitList from './recruit-list.vue'; // Import the CourseList component
  import LeftSidebar from '../LeftSidebar.vue'; // Import the LeftSidebar component
  import RightSidebar from '../RightSidebar.vue';
  import RecruitItem from "@/views/recruit/recruit-item.vue"; // Import the RightSidebar component
  
  
  export default {
    name: "RecruitNavigation",
    components: {
      RecruitItem,
      Header, // Register the Header component
      Footer, // Register the Footer component
      RecruitList, // Register the CourseList component
      LeftSidebar,
      RightSidebar,
      // ... Rest of your components ...
    },
    data() {
      return {
        activeMenu: "home", // 默认选中首页
        recruits: [], // 所有课程数据，从后端获取或静态定义
        swiperOptions: {
          pagination: {
            el: ".swiper-pagination",
          },
          loop: true,
          autoplay: {
            delay: 3000,
          },
        },
        carouselData: [
          {
            id: 1,
            image: "https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230709183838817.png",
          },
          {
            id: 2,
            image: "https://via.placeholder.com/800x300?text=Slide%202",
          },
          {
            id: 3,
            image: "https://via.placeholder.com/800x300?text=Slide%203",
          },
          // 更多轮播图数据
        ],
        img: require("@/assets/background.jpg"),
        // recruitItem: {
        //   title: "Java实习",
        //   salary: "8-10K",
        //   companyName: "华为",
        // },
      };
    },
    computed: {
        recruitRows() {
        // 将所有课程按每行4个进行分组
        const rows = [];
        for (let i = 0; i < this.recruits.length; i += 4) {
          rows.push(this.recruits.slice(i, i + 4));
        }
        return rows;
      },
    },
    created() {
      this.getCourses();
      this.getFiveCourse();
    },
    methods: {
      handleMenuSelect(index) {
        this.activeMenu = index; // 更新选中的菜单项
        // 可根据不同的菜单项进行相应的页面跳转或其他操作
      },
      getCourses() {
        this.$axios.get('/recruit/list'
          // ,
          //     {
          //         headers: {
          //             "Authorization": this.$store.getters.getToken
          //         }
          //     }
        ).then(response => {
          const recruits = response.data.result;
          console.log('recruits', recruits)
          this.recruits = recruits;
          // this.$message({
          //     type: 'success',
          //     message: response.data.message
          // });
          console.log(this.recruits)
        })
      },
      getFiveCourse() {
        this.$axios.get('/sourceCourse/getFiveCourse'
          // ,
          //     {
          //         headers: {
          //             "Authorization": this.$store.getters.getToken
          //         }
          //     }
        ).then(response => {
          const courses = response.data.result;
          console.log(response)
          this.carouselData = courses;
          // this.$message({
          //     type: 'success',
          //     message: response.data.message
          // });
          console.log(this.courses)
        })
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
  
      // Now you can use the 'swiper' variable to interact with the Swiper instance if needed
      // swiper.slideNext(); // Example: Go to the next slide programmatically
    },
  
  
  };
  </script>
  
  <style>
  .index {
    background-color: #E9EEF3;
  }
    /* 添加样式 */
  .course-navigation {
    max-width: 1600px;
    margin: 0 auto;
  }
  
  .menu {
    display: flex;
    justify-content: center;
  }
  
  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .menu li {
    display: inline-block;
    padding: 0 20px;
    cursor: pointer;
  }
  
  .menu li.active {
    color: #ffd04b;
    border-bottom: 2px solid #ffd04b;
  }
  
  .content {
    display: flex;
    flex-wrap: wrap;
    /* Wrap the sidebar and swiper to next row if necessary */
  }
  
  .left-sidebar {
    width: 20%;
    padding: 20px;
    background-color: #f0f0f0;
  }
  
  .left-sidebar h3 {
    margin-bottom: 10px;
    font-size: 18px;
  }
  
  .left-sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .left-sidebar li {
    margin-bottom: 10px;
    cursor: pointer;
  }
  
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
    /* 背景图片样式 */
  .background-image {
    width: 1600px;
    height: 250px;
    margin-top: 50px;
  }
  
  
  .swiper-container {
    width: 100%;
    height: 300px;
    margin-bottom: 20px;
    position: relative;
    /* 添加以下样式以实现水平排列 */
    display: flex;
  }
  
  .swiper-slide img {
    width: 100%;
    height: 100%;
  }
  </style>
  