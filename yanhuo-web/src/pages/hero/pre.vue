<template>
    <div class="sidebar">
      <div class="sidebar-header">
        <!-- 可在此处放置标题、Logo等头部元素 -->
        <h3>侧边栏标题</h3>
      </div>
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li v-for="(item, index) in menuItems" :key="index" :class="{ 'active': item.isActive }">
            <a href="#" @click.prevent="activateMenuItem(item)">
              <span>{{ item.label }}</span>
              <!-- 如果需要，可以添加图标或其他辅助元素 -->
              <i v-if="item.hasSubmenu" class="fas fa-angle-right"></i>
            </a>
            <!-- 子菜单（如果存在） -->
            <ul v-if="item.hasSubmenu && item.isActive" class="submenu">
              <li v-for="(subItem, subIndex) in item.subMenu" :key="subIndex">
                <a href="#">{{ subItem.label }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

    </div>

  </template>
  
  <script>

  import { Waterfall } from "vue-waterfall-plugin-next";
import "vue-waterfall-plugin-next/dist/style.css";

  export default {
    data() {
      return {
        activeMenuItem: null,
        menuItems: [
          {
            label: '广州市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '深圳市',
            isActive: false,
            hasSubmenu: true,
          },
          {
            label: '珠海市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '汕头市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '佛山市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '韶光市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '湛江市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '肇庆市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '江门市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '茂名市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '惠州市',
            isActive: false,
            hasSubmenu: false,
          },          
          {
            label: '梅州市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '汕尾市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '河源市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '阳江市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '清远市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '东莞市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '中山市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '潮州市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '揭阳市',
            isActive: false,
            hasSubmenu: false,
          },
          {
            label: '云浮市',
            isActive: false,
            hasSubmenu: false,
          },
          // 添加更多菜单项...
        ],
      };
    },
    methods: {
      activateMenuItem(item) {
        this.menuItems.forEach((menuItem) => {
          menuItem.isActive = menuItem === item;
        });
        this.activeMenuItem = item;
      },
    },
  };

  
  </script>


// 横向布局
  <style scoped>
  .sidebar {
    position: fixed; /* 或者 absolute，取决于布局需求 */
    top: 0;
    left: 0;
    height: 100vh;
    width: 200px; /* 调整为所需的宽度 */
    background-color: #f8f9fa;
    overflow-y: auto;
  }

  .sidebar-header {
    padding: 1rem;
    text-align: center;
    background-color: #dee2e6;
  }

  .nav-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .nav-list li {
    position: relative;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  .nav-list li:hover,
  .nav-list li.active {
    background-color: #e9ecef;
  }

  .nav-list li a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .nav-list li i {
    margin-left: 0.5rem;
  }

  .submenu {
    position: absolute;
    top: 0;
    left: 100%;
    min-width: 150px;
    background-color: #f8f9fa;
    box-shadow: 0 ¼ 6px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  .submenu li {
    padding: 0.5rem;
  }

  .submenu li a {
    padding: 0;
    color: #343a40;
  }

  .submenu li a:hover {
    background-color: #e9ecef;
  }
  </style>



// 竖向 布局

<!--<style scoped>-->
<!--.sidebar {-->
<!--  position: fixed; /* 或者 absolute，取决于布局需求 */-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  height: 100vh;-->
<!--  width: 200px; /* 维持所需的宽度 */-->
<!--  background-color: #f8f9fa;-->
<!--  overflow-y: auto;-->
<!--  display: flex;-->
<!--  flex-direction: column; /* 使内容竖向排列 */-->
<!--}-->

<!--.sidebar-header {-->
<!--  padding: 1rem;-->
<!--  text-align: center;-->
<!--  background-color: #dee2e6;-->
<!--  flex-shrink: 0; /* 防止 header 收缩 */-->
<!--}-->

<!--.nav-list {-->
<!--  list-style-type: none;-->
<!--  padding: 0;-->
<!--  margin: 0;-->
<!--  flex: 1; /* 让 nav-list 占据剩余空间 */-->
<!--}-->

<!--.nav-list li {-->
<!--  padding: 0.5rem 1rem;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.nav-list li:hover,-->
<!--.nav-list li.active {-->
<!--  background-color: #e9ecef;-->
<!--}-->

<!--.nav-list li a {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  text-decoration: none;-->
<!--  color: inherit;-->
<!--}-->

<!--.nav-list li i {-->
<!--  margin-left: 0.5rem;-->
<!--}-->

<!--.submenu {-->
<!--  position: absolute;-->
<!--  top: 0;-->
<!--  left: 100%;-->
<!--  min-width: 150px;-->
<!--  background-color: #f8f9fa;-->
<!--  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);-->
<!--  z-index: 1;-->
<!--}-->

<!--.submenu li {-->
<!--  padding: 0.5rem;-->
<!--}-->

<!--.submenu li a {-->
<!--  padding: 0;-->
<!--  color: #343a40;-->
<!--}-->

<!--.submenu li a:hover {-->
<!--  background-color: #e9ecef;-->
<!--}-->
<!--</style>-->
