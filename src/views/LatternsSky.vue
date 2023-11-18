<template>
    <div class="home"  :style="{ backgroundImage: 'url(' + background + ')' }">
      <div class="overlay"></div>
      <div class="content">
        <h1>{{ texts.h1[currentLanguage] }}</h1>
        <p>{{ texts.p[currentLanguage] }}</p>
      </div>

      <!-- 灯笼 -->
      <p v-if="this.latterns.number == 0" class="msg">{{ texts.msg[currentLanguage] }}</p>
      <div v-else class="lattern-container">
        <div v-for="(lattern, key) in latterns.show" :key="key" class="lattern">
          <!-- 在这里放置你的 lattern 页面链接 -->
          <router-link :to="'/latterns/' + lattern.No"  class="link">
            <img :src="latternImage" alt="红灯笼" class="lattern-image"/>
            <p>{{ lattern.title }}</p>
          </router-link>
        </div>
      </div>
  
      <!-- 刷新按钮 -->
      <el-button type="primary" class="center-button" @click="renew">{{texts.catch[currentLanguage]}}</el-button>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: 'SkyPage',
    //设置背景图和文字
    data() {
      return {
        //图片及文字
        background: require('@/assets/boy_fly_lattern.jpg'),
        latternImage: require('@/assets/lattern2.png'),
        texts:{ 
            h1: {Chinese:'放飞希望', English:'Fly Our Hopes', Louis:'用户个人界面'}, 
            p: {Chinese:'仰望我的漫天星空', English:'Look up at my starry sky', Louis:'User Personal Interface'}, 
            msg: {Chinese:'此地无银三百两...', English:'There are many lanterns worth flying...', Louis:'something miss'},
            catch: {Chinese:'捕捉',   English:'Catch', Louis:'FIND'},
            release: {Chinese:'制作一个新灯笼',   English:'Make a new lantern', Louis:'POST A NEW MSG'},
          },
        //灯笼
        latterns: {
          No:[],
          show:[],
          pointer:0,
          show_num:3,
          number:0,
        }
      }
    },
    //返回当前背景及文字
    computed: {
      currentLanguage() {
        return this.$store.getters.curLanguage;
      },
    },
    //时间控制，切换图片及文字
    methods: {
      async findAllLatterns() {
        // 找到所有灯笼序号
        try {
            const res = await axios.get(`api/latterns/`);
            this.latterns.number = res.data.length;
            for (let i=0; i<res.data.length; i++) {
                this.latterns.No.push(res.data[i].No);
            }
            console.log(this.latterns.No);
          } catch (error) {
            console.error('Error fetching user data:', error);
            alert("latterns-find-wrong");
          }
      },
      async findLatternsShown() {
        // 找到显示的所有灯笼标题;
        this.latterns.show.splice(0, this.latterns.show.length);
        for (let i=this.latterns.pointer, end=Math.min(this.latterns.pointer + this.latterns.show_num, this.latterns.number); i<end; i++) {
          try {
            const res = await axios.get(`api/latterns/`);
            const thisLattern = res.data.find(lattern => lattern.No === this.latterns.No[i]);
            console.log(thisLattern);
            if (thisLattern) {
              this.latterns.show.push({No:thisLattern.No, title:thisLattern.title});
            } else {
              console.log('find-wrong-lattern-no');
            }
          } catch (error) {
            console.error('Error fetching lantern data:', error);
            alert("latterns-catch-wrong");
          }
        }
      },
      renew() {
        console.log('renew');
        this.latterns.show_num = Math.floor(Math.random() * 5) + 1;
        this.latterns.pointer = (this.latterns.pointer + 3) % this.latterns.number;
        this.findLatternsShown();
      },
      //返回上一个页面
      goBack() {
        this.$router.go(-1);
        // 或者使用 this.$router.back();
      },
    },
    //钩子函数
    mounted() {
      // 下载用户信息
      this.user = this.$store.getters.userInfo;
      // 查询该用户历史留言
      this.findAllLatterns();

    },
    created() {
      // 尚未登录则直接跳转登录界面
      if (!this.$store.getters.userLogin)
        this.$router.push('/login');
      // 隐藏音频按钮
      this.$store.commit('hideAudioButton');
    }
  };
  </script>
  
  <style scoped>
  .home {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: center/cover no-repeat;
    background-color: rgba(255, 255, 255, 0.7); /* 背景图片透明度 */
  }
   
  .overlay {
      position: absolute;
      top: 0;
      left: 10%;
      width: 80%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5); /* 黑色半透明背景 */
      z-index: 0;
    }
  
  .content {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: rgb(124, 222, 240);
    text-shadow: 1px 1px 2px rgb(247, 242, 170);
  }
  
  .msg {
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: rgb(124, 222, 240);
    text-shadow: 1px 1px 2px rgb(247, 242, 170);
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  h2 {
    font-size: 2.0rem;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
  
  /* 灯笼 */  
  .lattern-container {
    display: flex; /* 使用 flex 布局 */
    justify-content: space-around; /* 在容器中均匀分布项目 */
    margin-right: 0px; /* 向右移动的距离，根据需要调整 */
    z-index: 1;
    }
  
    .lattern {
      /* 设置每个灯笼的样式，例如边框、边距等 */
      text-align: center;
      margin: 0 20px; /* 调整灯笼之间的间距 */
    }
  
    .lattern img {
      /* 设置图片的样式，例如大小、边框等 */
      width: 180px;
      height: 180px;
      border: 1px solid #eb2626;
      border-radius: 50%;
    }
  
    .link {
    /* 超链接样式 */
    color: #ff00bb; /* 设置链接颜色 */
    text-decoration: none; /* 去除下划线 */
    font-weight: bold; /* 设置字体加粗 */
    font-family: 'Arial', sans-serif; /* 设置字体，可以根据需要替换为其他字体 */
    font-size: 16px; /* 设置字体大小 */
  }
  
  .link:hover {
    /* 悬停时的样式 */
    color: #b000b3; /* 修改链接颜色 */
  }
  
  /*按钮*/
  button {
    background-color: rgba(52, 152, 219, 0.322);
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
  }
    
  button:hover {
    background-color: rgba(25, 170, 238, 0.777);
  }
  
  .center-button {
    position: absolute;
    left: 47%;
    text-align: center;
    top: 500px;
  }
  </style>