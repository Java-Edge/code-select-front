<template>
  <div class="left-sidebar">
    <!-- <h3>编程语言分类</h3> -->
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
