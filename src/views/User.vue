<template>
  <div class="home"  :style="{ backgroundImage: 'url(' + background + ')' }">
    <div class="overlay"></div>
    <div class="content">
      <h1>{{ texts.h1[currentLanguage] }}</h1>
      <p>{{ texts.p[currentLanguage] }}</p>
    </div>
    <!-- 用户基本信息 -->
    <div class="avatar-container">
      <img :src="AvatarImage" alt="Avatar" class="avatar-image" />
      <div class="avatar-border"></div>
    </div>
    <div class="user-info">
      <h2 class="user-name">{{ user.NICKNAME }}</h2>
      <p class="user-bio">{{texts.bio[currentLanguage]}}</p>
      <p class="user-bio">{{ user.BIO }}</p>
    </div>
    <!-- 制作灯笼 -->
    <router-link to="/fly-latterns">
      <el-button type="primary" class="center-button" @click="onFlyLattern">{{ texts.release[currentLanguage] }}</el-button>
    </router-link>

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

    <!-- 翻页箭头 -->
    <div class="arrow left" v-show="latterns.pointer > 0" @click="moveLeft"></div>
    <div class="arrow right" v-show="latterns.number - latterns.pointer > 3" @click="moveRight"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'UserPage',
  //设置背景图和文字
  data() {
    return {
      //图片及文字
      background: require('@/assets/latterns_night_sky.jpg'),
      latternImage: require('@/assets/lattern2.png'),
      texts:{ 
          h1: {Chinese:'放飞希望', English:'Fly Our Hopes', Louis:'用户个人界面'}, 
          p: {Chinese:'仰望我的漫天星空', English:'Look up at my starry sky', Louis:'User Personal Interface'}, 
          bio: {Chinese:'个人简介：', English:'Brief:', Louis:'我说：'},
          msg: {Chinese:'我的故事才刚刚开始...', English:'There are many lanterns worth flying...', Louis:'something miss'},
          release: {Chinese:'制作一个新灯笼',   English:'Make a new lantern', Louis:'POST A NEW MSG'},
        },
      //用户信息
      AvatarImage: require('@/assets/Kitasan_Black.png'),
      user: {
        UID: '123456',
        NICKNAME: 'JohnDoe',
        BIO: 'A passionate coder',
      },
      //灯笼
      latterns: {
        No:[],
        show:[],
        pointer:0,
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
    async findLatterns() {
      // 找到该用户的所有灯笼序号
      try {
          const res = await axios.get(`api/users/`);
          const thisUSER  = res.data.find(user => user.uid === this.user.UID);

          if (thisUSER) {
            this.latterns.No = Array.from(thisUSER.latterns);
            this.latterns.number = thisUSER.latterns.length;
            this.findLatternsShown();
          } else
            console.log('no-such-user');
        } catch (error) {
          console.error('Error fetching user data:', error);
          alert("latterns-find-wrong");
        }
    },
    async findLatternsShown() {
      // 找到该用户的所有灯笼标题;
      this.latterns.show.splice(0, this.latterns.show.length);
      for (let i=this.latterns.pointer, end=Math.min(this.latterns.pointer + 3, this.latterns.number); i<end; i++) {
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
    moveLeft() {
      console.log('move-left');
      this.latterns.pointer -= 3;
      this.findLatternsShown();
    },
    moveRight() {
      console.log('move-right');
      this.latterns.pointer += 3;
      this.findLatternsShown();
    },
  },
  //钩子函数
  mounted() {
    // 下载用户信息
    this.user = this.$store.getters.userInfo;
    // 查询该用户历史留言
    this.findLatterns();
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

/* 头像 */
.avatar-container {
  position: absolute;
  top: 4%; /* 距离顶部的距离 */
  left: 16%; /* 距离左侧的距离 */
  margin: 10px; /* 调整头像和页面边缘的距离 */
}
.avatar-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 150px; /* 图片宽度，根据需要调整 */
    height: 150px; /* 根据宽度自动调整高度 */
    object-fit: cover; /* 按比例截取图片，不改变比例 */
    border-radius: 10px; /* 图片的圆角效果 */
  }
.avatar-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 150px; /* 图片宽度，根据需要调整 */
    height: 150px; /* 根据宽度自动调整高度 */
    border: 2px solid #000000; /* 边框样式 */
    border-radius: 10px; /* 圆角效果，与图片一致 */
    box-sizing: border-box; /* 使边框宽度不影响容器的尺寸 */
  }

  /* 用户信息 */
.user-info {
  position: absolute;
  top: 200px; /* 距离顶部的距离 */
  left: 14%; /* 距离左侧的距离 */
}
.user-name {
  left: 50%;
  text-align: center;
  color: rgb(124, 222, 240);
  text-shadow: 1px 1px 2px rgb(247, 242, 170);
}
.user-bio {
  color: rgb(247, 247, 247);
  text-shadow: 1px 1px 2px rgb(247, 242, 170);
}

/* 灯笼 */  
.lattern-container {
  display: flex; /* 使用 flex 布局 */
  justify-content: space-around; /* 在容器中均匀分布项目 */
  margin-right: -250px; /* 向右移动的距离，根据需要调整 */
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

/* 左右箭头 */
.arrow {
  position:absolute;
  top:70%;
  width: 40px; /* 调整箭头宽度 */
  height: 40px; /* 调整箭头高度 */
  background-color: #69aaf0; /* 设置箭头颜色 */
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease; /* 添加过渡效果 */
}

.left {
  transform: rotate(180deg); /* 左箭头翻转 */
  margin-right: 10px; /* 调整箭头间距 */
  left:34%
}

.right {
  /* 右箭头样式 */
  margin-left: 10px; /* 调整箭头间距 */
  left:80%
}

.arrow:hover {
  background-color: #0056b3; /* 悬停时的颜色 */
}

/*按钮*/
button {
  background-color: rgba(52, 152, 219, 0.322);
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  z-index: 1;
}
  
button:hover {
  background-color: rgba(25, 170, 238, 0.777);
}

.center-button {
  position: absolute;
  left:16%;
  text-align: center;
  top: 500px;
}
</style>