<template>
  <div class="left-sidebar">
    <h3>编程语言分类</h3>
    <ul>
      <li
        v-for="category in menuData"
        :key="category.id"
        @mouseenter="handleCategoryHover(category.name)"
        @mouseleave="handleCategoryHover(null)"
        :class="{ active: isActive(category.name), hasSubcategories: hasSubcategories(category) }"
      >
        {{ category.name }}
        <ul class="subcategories" v-if="selectedCategory === category.name">
          <li v-for="subcategory in category.subcategories" :key="subcategory.id" @click="handleCategorySelect(subcategory.name)"
            :class="{ active: selectedCategory === subcategory.name }">
            {{ subcategory.name }}
            <ul class="sub-subcategories" v-if="selectedSubcategory === subcategory.name">
              <li v-for="item in subcategory.items" :key="item.id" @click="handleSubcategorySelect(item.name)"
                :class="{ active: selectedSubcategory === item.name }">
                {{ item.name }}
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LeftSidebar",
  data() {
    return {
      selectedCategory: null, // Default selected category
      selectedSubcategory: null, // Default selected subcategory
      menuData: [
        {
          id: 1,
          name: 'Java',
          subcategories: [
            {
              id: 1,
              name: 'Spring',
              items: ['Spring Boot', 'Spring Cloud', 'Spring Security', 'Spring Data'],
            },
            {
              id: 2,
              name: 'JavaFX',
              items: ['FXML', 'Controls', 'Event Handling', 'CSS Styling'],
            },
            {
              id: 3,
              name: 'Java Servlet',
              items: ['Servlet API', 'Servlet Lifecycle', 'HttpServletRequest', 'HttpServletResponse'],
            },
            // Add more subcategories and items for Java
          ],
        },
        {
          id: 2,
          name: 'Python',
          subcategories: [
            {
              id: 1,
              name: 'Django',
              items: ['Models', 'Views', 'Templates', 'Forms'],
            },
            {
              id: 2,
              name: 'Flask',
              items: ['Routing', 'Request Handling', 'Templates', 'Forms'],
            },
            // Add more subcategories and items for Python
          ],
        },
        {
          id: 3,
          name: 'JavaScript',
          subcategories: [
            {
              id: 1,
              name: 'React',
              items: ['Components', 'State Management', 'React Router', 'Hooks'],
            },
            {
              id: 2,
              name: 'Vue.js',
              items: ['Components', 'Directives', 'Vue Router', 'Vuex'],
            },
            // Add more subcategories and items for JavaScript
          ],
        },
        // 其他语言的分类和子分类
      ],
    };
  },
  methods: {
    handleCategorySelect(category) {
      this.selectedCategory = category;
      this.selectedSubcategory = null; // Reset the selected subcategory when selecting a new category
    },
    handleCategoryHover(category) {
      this.selectedCategory = category;
    },
    handleSubcategorySelect(subcategory) {
      this.selectedSubcategory = subcategory;
    },
    isActive(category) {
      return this.selectedCategory === category;
    },
    hasSubcategories(category) {
      return category.subcategories && category.subcategories.length > 0;
    },
  },
};
</script>

<style scoped>
/* 添加样式 */
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
  padding: 8px 16px;
  border-radius: 20px;
  transition: background-color 0.3s ease;
  position: relative;
  /* Add relative positioning to enable absolute positioning for subcategories */
}

.left-sidebar li:hover {
  background-color: #e0e0e0;
}

.left-sidebar li.active {
  background-color: #ffd04b;
  color: #333;
}

.subcategories {
  margin-left: 20px;
  position: absolute;
  top: 0;
  left: 100%;
  display: none;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  min-width: 150px;
  /* Set a minimum width for the submenu */
  padding: 8px;
  /* Add some padding to the submenu */
  border-radius: 5px;
  /* Add border-radius for a rounded appearance */
  white-space: nowrap;
  /* Prevent subcategories from wrapping to a new line */
}

.sub-subcategories {
  margin-left: 20px;
  position: absolute;
  top: 0;
  left: 100%;
  display: none;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  min-width: 150px;
  /* Set a minimum width for the submenu */
  padding: 8px;
  /* Add some padding to the submenu */
  border-radius: 5px;
  /* Add border-radius for a rounded appearance */
  white-space: nowrap;
  /* Prevent sub-subcategories from wrapping to a new line */
}

.left-sidebar li.hasSubcategories:hover .subcategories {
  display: block;
}

.subcategories li.hasSubcategories:hover .sub-subcategories {
  display: block;
}
</style>
