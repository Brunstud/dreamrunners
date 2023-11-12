<template>
    <div class="app-navbar">
      <router-link to="/" class="logo-link">
        <img class="logo"  src="@/assets/yueji.jpg" alt="Logo">
      </router-link>
  
      <div class="nav-links">
        <router-link to="/main" class="nav-link">{{ NabvarName[0][currentLanguage] }}</router-link>
        <div class="nav-divider">|</div>
        <router-link to="/latterns/0001" class="nav-link">{{ NabvarName[1][currentLanguage] }}</router-link>
        <div class="nav-divider">|</div>
        <router-link to="/fly-latterns" class="nav-link">{{ NabvarName[2][currentLanguage] }}</router-link>
        <div class="nav-divider">|</div>
        <router-link to="/regist" class="nav-link">{{ NabvarName[3][currentLanguage] }}</router-link>
        <div class="nav-divider">|</div>
        <router-link to="/login" class="nav-link">{{ NabvarName[4][currentLanguage] }}</router-link>
        <div class="nav-divider">|</div>
        <router-link to="/user" class="nav-link">{{ NabvarName[5][currentLanguage] }}</router-link>
      </div>
      
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppNavbar',
    data() {
      return {
        //导航提示词
        NabvarName:[
          {Chinese:"爱尔奎特", English:"Arcueid", Louis:"Main"},
          {Chinese:"希耶尔", English:"Ciel", Louis:"Catch Latterns"},
          {Chinese:"远野秋叶", English:"Akiya", Louis:"Fly Latterns"},
          {Chinese:"琥珀", English:"kohaku", Louis:"Regist"},
          {Chinese:"翡翠", English:"Hisui", Louis:"Login"},
          {Chinese:"弓冢五月", English:"Satsuki", Louis:"User"},
        ]
      };
    },
    //返回当前语言
    computed: {
      currentLanguage() {
        return this.$store.getters.curLanguage;
      },
    },
  };
  </script>
  
  <style scoped>
  .app-navbar {
    background: #2c3e50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px;
  }
  
  .logo {
    width: 50px; /* 设置 logo 的大小 */
    height: auto; /* 根据宽度自动调整高度 */
  }
  
  .nav-links {
    display: flex;
    align-items: center;
  }
  
  .nav-link {
    color: #fff; /* 设置字体颜色为白色 */
    margin: 0 10px; /* 为每个链接添加间距 */
    text-decoration: none;
  }
  
  .nav-divider {
    color: #fff; /* 设置竖线颜色为白色 */
    margin: 0 5px; /* 为竖线添加间距 */
  }
  </style>