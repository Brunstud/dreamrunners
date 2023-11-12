<template>
  <div class="home">
  <router-link to="/main">
    <div class="image-container" :style="{ backgroundImage: 'url(' + currentImage + ')' }"></div>
  </router-link>
    <div class="content">
      <h1>{{ currentTexts.h1[currentLanguage] }}</h1>
      <p>{{ currentTexts.p[currentLanguage] }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  //设置背景图和文字
  data() {
    return {
      //图片及文字
      images: [
        require('@/assets/background1.png'), // 使用require导入图片
        require('@/assets/background2.png'),
        require('@/assets/boy_fly_lattern.png'),
        require('@/assets/girl_fly_lattern.jpg'),
        require('@/assets/girl_dusk.jpg'),
      ],
      texts: [
        {
          h1: {Chinese:'欢迎来到月之世界', English:'Welcome to Our Website'}, 
          p: {Chinese:'--人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。--', English:'We provide high-quality products and services to meet your needs.'}, 
        },
        {
          h1: {Chinese:'今日月色独美', English:'Good Moonlight'}, 
          p: {Chinese:'--生存，还是毁灭--', English:'To be or not to be, that is a question.'},
        },
        {
          h1: {Chinese:'放飞希望', English:'Fly Our Hopes'},
          p: {Chinese:'--点击任意位置开始新的旅程--', English:'Click anywhere to start this great journey.'},
        },
        {
          h1: {Chinese:'放飞梦想', English:'Fly Our Dreams'},
          p: {Chinese:'--点击任意位置开始新的旅程--', English:'Click anywhere to start this great journey.'},
        },
        {
          h1: {Chinese:'希望激涌成河', English:'Hopes Pouring into Stream'},
          p: {Chinese:'--点击任意位置开始新的旅程--', English:'Click anywhere to start this great journey.'},
        },
        // Add more text sets as needed
      ],
      currentImageIndex: 0,
    }
  },
  //返回当前背景及文字
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    },
    currentTexts() {
      return this.texts[this.currentImageIndex];
    },
    currentLanguage() {
      return this.$store.getters.curLanguage;
    },
  },
  //时间控制，切换图片及文字
  methods: {
    setRandomImage() {
      const randomIndex = Math.floor(Math.random() * this.images.length);
      this.currentImageIndex = randomIndex;
    },
  },
  //钩子函数
  created() {
    // 自动切换背景图片
    this.setRandomImage();
    // 显示音频按钮
    this.$store.commit('showAudioButton');
  },
};
</script>

<style scoped>
.home {
  position: relative;
  height: 100vh; /* Set the container height to 100% of viewport height */
}

.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.content {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  color: #333;
  text-shadow: 1px 1px 2px #fff;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}
</style>