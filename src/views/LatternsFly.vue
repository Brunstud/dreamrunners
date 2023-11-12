<template>
  <div class="home" :style="{ backgroundImage: 'url(' + background + ')' }">
    <div class="overlay"></div>
    <div class="content">
      <h1>{{ lattern.title }}</h1>
      <p>{{ lattern.content }}</p>
    </div>
    <el-form :inline="true" :model="lattern" size="small" class="form-container">
      <p>{{ prompts.lattern[currentLanguage] }}</p>
      <div><el-form-item>
        <el-input
          class="input textarea"
          v-model="lattern.title"
          :placeholder="prompts.title[currentLanguage]"
          :maxlength="titleMaxLength"
        ></el-input>
      </el-form-item></div>
      <div><el-form-item>
        <el-input
          class="input textarea"
          :rows="8" 
          v-model="lattern.content"
          :placeholder="prompts.content[currentLanguage]"
          :maxlength="contentMaxLength"
        ></el-input>
      </el-form-item></div>
    </el-form>
    <el-button type="primary" class="center-button" @click="onFlyLattern">{{ prompts.release[currentLanguage] }}</el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'LatternsFly',
  //设置背景图和文字
  data() {
    return {
      //图片及文字
      background: require('@/assets/girl_fly_lattern.jpg'),
      texts:{ h1: 'Fly Our Hopes', p: 'Some different description here.' },
      //提示语
      prompts:{
        lattern: {Chinese:'愿灯笼', English:'lattern of hope', Louis:'INPUT'},
        title:   {Chinese:'笼题',   English:'what i name', Louis:'TITLE'},
        content: {Chinese:'笼中语', English:'what i say', Louis:'CONTENT'},
        release: {Chinese:'放飞',   English:'Fly', Louis:'POST'},
      },
      //留言信息
      titleMaxLength: 20, // 限制笼题最大字符数
      contentMaxLength: 500, // 限制笼中语最大字符数
      lattern: {
        No: "0001", 
        title: "Dreaming", 
        content: "a sweet dream", 
        poster: {uid: "123456", username: "Pretty"},
      },
    }
  },
  //返回当前背景及文字
  computed: {
    currentLanguage() {
      return this.$store.getters.curLanguage;
    },
    // 计算属性，动态返回标题的剩余字数
    remainingTitleChars() {
      return this.titleMaxLength - this.lattern.title.length;
    },
    // 计算属性，动态返回内容的剩余字数
    remainingContentChars() {
      return this.contentMaxLength - this.lattern.content.length;
    },
  },
  //时间控制，切换图片及文字
  methods: {
    onFlyLattern() { 
      console.log("submit! FlyLattern"); 
      axios 
        .post("api/latterns/", this.lattern) 
        .then((res) => { 
        //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致 
      //axios
        //.post('http://127.0.0.1:8000/latterns/',this.lattern）
        //.then(res => {
          //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致 
          console.log(res.data); //在console中看到数据 
          console.log(this.lattern); //在console中看到数据 
        }) 
        .catch(() => { 
          alert("lattern-fly-wrong"); 
        }); 
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
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  color: rgb(124, 222, 240);
  text-shadow: 1px 1px 2px rgb(247, 242, 170);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

/*留言显示框*/
.form-container {
  position: absolute;
  text-align: center;
  top: 36%;
  color: rgb(240, 221, 124);
  text-shadow: 1px 1px 2px rgb(247, 242, 170);
}

/* 添加样式以美化输入框 */
.input {
  width: 400px; /* 根据需要调整宽度 */
  margin-bottom: 10px; /* 根据需要调整外边距 */
}

.textarea {
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease-in-out;
}

.textarea:focus {
  border-color: #5c8df7; /* 边框聚焦时的颜色 */
  outline: none;
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
  text-align: center;
  top: 70%;
}
</style>