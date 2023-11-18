<template>
  <div class="home"  :style="{ backgroundImage: 'url(' + background + ')' }">
    <div class="overlay"></div>
    <div class="content">
      <h1>{{ lattern.title }}</h1>
      <p>{{ lattern.poster.username }}</p>
    </div>
    <el-input 
      type="textarea" 
      :rows="8" 
      placeholder="此处返回结果" 
      v-model="lattern.content" 
      class="textarea" 
      readonly
    > 
    </el-input>
    <el-button type="primary" class="return-button" @click="goBack">{{ prompts.return[currentLanguage] }}</el-button> 
    <el-button type="primary" class="next-button" @click="goNext">{{ prompts.next[currentLanguage] }}</el-button> 
  </div>
</template>

<script>
import axios from "axios"; 
export default {
  name: 'LatternsRead',
  //留言序号
  props: ['id'],
  //设置背景图和文字
  data() {
    return {
      //图片及文字
      background: require('@/assets/girl_dusk.jpg'),
      texts:{ h1: 'Fly Our Hopes', p: 'Some different description here.' },
      //提示语
      prompts:{
        return: {Chinese:'返回',   English:'Return', Louis:'BACK'},
        next: {Chinese:'下一盏',   English:'Next', Louis:'NEXT'},
      },
      //留言信息
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
  },
  //时间控制，切换图片及文字
  methods: {
    onCatchLattern() { 
      console.log("submit! get"); 
      axios.get("api/latterns/") 
        .then((res) => { 
          //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致 
      //axios.get('http://127.0.0.1:8000/latterns',)
        //.then(res => {
          //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致 
          const latternCaught  = res.data.find(lattern => lattern.No === this.id); 
          if (latternCaught)
            this.lattern = latternCaught; 
          else
            console.log("fail catching lattern"); //在console中看到数据 
          console.log(this.lattern); //在console中看到数据 
        }) 
        .catch(() => { 
          alert("lattern-catch-wrong"); 
        });
    },
    //返回上一个页面
    goBack() {
      this.$router.go(-1);
      // 或者使用 this.$router.back();
    },
    //下一盏灯
    goNext() {
      this.$router.push('/main');
    },
  },
  //钩子函数
  created() {
    this.onCatchLattern();
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
  top: 24%;
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
.textarea {
  width: 400px;
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

.textarea input[readonly]{
  background-color: #e25959; /* 只读时的背景颜色 */
  color: #666; /* 只读时的文字颜色 */
  border-color: #ccc; /* 只读时的边框颜色 */
  cursor: not-allowed; /* 鼠标样式设置为不可点击 */
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

.return-button {
  position: absolute;
  text-align: center;
  left: 42%;
  top: 70%;
}

.next-button {
  position: absolute;
  text-align: center;
  left: 52%;
  top: 70%;
}
</style>