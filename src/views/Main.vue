<template>
  <div class="home"  :style="{ backgroundImage: 'url(' + background + ')' }">
    <div class="content">
      <h1>{{ texts.h1 }}</h1>
      <p>{{ texts.p }}</p>
    </div>
    <div class="image-container" :ref="imageUrl" @mousemove="handleMouseMove">
      <img
        :src="imageUrl" :style="{ opacity: isHovered ? 0 : 1 }" 
        alt="红灯笼"
        @mouseover="showImage"
        @mouseout="hideImage"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MainPage',
  //设置背景图和文字
  data() {
    return {
      //图片及文字
      background: require('@/assets/boy_fly_lattern.png'),
      texts:{ h1: 'Fly Our Hopes', p: 'Some different description here.' },
      imageUrl: require('@/assets/lattern2.png'),
      isHovered: false,
    }
  },
  //返回计算值
  computed: {
  },
  //方法函数
  methods: {
    showImage() {
      this.isHovered = true;
    },
    hideImage() {
      this.isHovered = false;
    },
    handleMouseMove(event) {
      // 获取鼠标相对于图片容器的位置
      const x = event.offsetX;
      const y = event.offsetY;

      // 获取图片的DOM元素
      const imageElement = this.$el.querySelector('.image-container img');

      // 获取图片的Canvas上下文
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);

      // 获取鼠标所在像素的颜色信息
      const pixel = ctx.getImageData(x, y, 1, 1).data;

      // 判断像素是否透明，如果是透明则设置 isHovered 为 false
      if (pixel[3] === 0) {
        this.isHovered = false;
      }
    },
  },
  //钩子函数
  created() {
    // 隐藏音频按钮
    this.$store.commit('hideAudioButton');
  },
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

  /* 背景图片层叠顺序在App.vue中定义的背景之上 */
  z-index: 1;
}

.image-container {
  position: absolute;
  top: 0;
  left: 0;
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