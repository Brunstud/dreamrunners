<template>
  <div class="home"  :style="{ backgroundImage: 'url(' + background + ')' }">
    <div class="overlay"></div>
    <div class="content">
      <h1>{{ texts.h1[currentLanguage] }}</h1>
      <p>{{ texts.p[currentLanguage] }}</p>
      <el-form :model="formData" ref="form" :rules="rules" label-width="80px" class="custom-label">
        <el-form-item prop="nickname">
          <template slot="label">
            <span class="custom-label">{{ abbr.nickname[currentLanguage] }}</span>
          </template>
          <el-input v-model="formData.nickname" :placeholder="prompts.nickname[currentLanguage]"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <template slot="label">
            <span class="custom-label">{{ abbr.username[currentLanguage] }}</span>
          </template>
          <el-input v-model="formData.username" :placeholder="prompts.username[currentLanguage]"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <template slot="label">
            <span class="custom-label">{{ abbr.password[currentLanguage] }}</span>
          </template>
          <el-input v-model="formData.password" type="password" :placeholder="prompts.password[currentLanguage]"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <template slot="label">
            <span class="custom-label">{{ abbr.confirmPassword[currentLanguage] }}</span>
          </template>
          <el-input v-model="formData.confirmPassword" type="password" :placeholder="prompts.confirmPassword[currentLanguage]"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="center-button" @click="onSubmitRegist">{{currentLanguage == 'Chinese' ? "提交" : "Submit"}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'RegistPage',
  //设置背景图和文字
  data() {
    return {
      //图片及文字
      background: require('@/assets/latterns_building.jpg'),
      texts:{ 
        h1: {Chinese:'注册', English:'Regist', Louis:'用户注册'}, 
        p: {Chinese:'加入我们的逐梦派对', English:'Join our party of dream', Louis:'User Registration Interface'}, 
      },
      //提示词
      // 提示词根据语言切换
      abbr:{
        nickname: {Chinese:'昵称', English:'Nickname', Louis:'Nickname'},
        username: {Chinese:'账号', English:'Username', Louis:'Username'},
        password: {Chinese:'密码', English:'Password', Louis:'Password'},
        confirmPassword: {Chinese:'确认密码', English:'Confirm', Louis:'Confirm'},
      },
      prompts:{
        nickname: {Chinese:'请输入昵称', English:'Enter your nickname', Louis:'Nickname'},
        username: {Chinese:'请输入账号', English:'Enter your username', Louis:'Username'},
        password: {Chinese:'请输入密码', English:'Enter your password', Louis:'Password'},
        confirmPassword: {Chinese:'请确认密码', English:'Confirm your password', Louis:'Confirm Password'},
      },
      //输入信息
      formData: {
        nickname: '',
        username: '',
        password: '',
        confirmPassword: '',
      },
      rules: {
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' },
                   { validator: this.validateNickname, trigger: 'blur' },],
        username: [{ required: true, message: '请输入账号', trigger: 'blur' },
                   { validator: this.validateUsername, trigger: 'blur' },],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
                   { validator: this.validatePassword, trigger: 'blur' },],
        confirmPassword: [{ required: true, message: '请确认密码', trigger: 'blur' },
                          { validator: this.validateConfirmPassword, trigger: 'blur' },],
      },
      //判断变量
      nicknameRepeat: false,
      usernameRepeat: false,
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
    onSubmitRegist() { 
      console.log(this.$refs.form); // Check if $refs is defined and contains the form reference
      this.$refs.form.validate(valid => {
        if (valid) {
          // 所有验证通过，可以提交表单
          // 执行提交逻辑（注册）
          console.log("submit! regist"); 
          axios 
            .post("api/users/", this.formData) 
            .then((res) => { 
            //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致 
          //axios
            //.post('http://127.0.0.1:8000/latterns/',this.formData) 
           //.then(res => {
            //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致 
            console.log(res.data); //在console中看到数据 
            console.log(this.formData); //在console中看到数据 
          }) 
          .catch(() => { 
            alert("regist-submit-wrong"); 
          }); 
          //完成提交，跳转登录页面
          this.$router.push('/login');
        } else {
          this.$message.error('请正确填写表单');
        }
      });
    },
    validateNickname(rule, value, callback) {
      // 昵称验证逻辑，与数据库查重
      axios.get("api/users/") 
        .then((res) => { 
          //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致 
      //axios.get('http://127.0.0.1:8000/users',)
        //.then(res => {
          //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致 
          this.nicknameRepeat = res.data.find(user => user.nickname === value); 
        }) 
        .catch(() => { 
          alert("nickname-check-wrong"); 
        });
      if (this.nicknameRepeat) {
        callback(new Error('昵称重复'));
      } else {
        callback();
      }
    },
    validateUsername(rule, value, callback) {
      // 账号验证逻辑，与数据库查重
      axios.get("api/users/") 
        .then((res) => { 
          //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致 
      //axios.get('http://127.0.0.1:8000/users',)
        //.then(res => {
          //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致 
          this.usernameRepeat = res.data.find(user => user.username === value); 
        }) 
        .catch(() => { 
          alert("nickname-check-wrong"); 
        });
      if (value.length < 6) {
        callback(new Error('账号长度不能少于6位'));
      } else if (this.usernameRepeat) {
        callback(new Error('账号重复'));
      } else {
        callback();
      }
    },
    validatePassword(rule, value, callback) {
      // 密码验证逻辑，可以根据需求自定义
      // 例如，检查密码是否符合一定的要求，比如长度、包含字母和数字等
      if (value.length < 6) {
        callback(new Error('密码长度不能少于6位'));
      } else {
        callback();
      }
    },
    validateConfirmPassword(rule, value, callback) {
      // 确认密码验证逻辑
      if (value !== this.formData.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
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
  overflow: hidden; /* 防止黑框溢出 */
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
  top: 40%;
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

/*输入框*/
.custom-label {
  color: rgb(28, 241, 63);
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