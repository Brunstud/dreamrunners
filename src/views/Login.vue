<template>
    <div class="home"  :style="{ backgroundImage: 'url(' + background + ')' }">
      <div class="overlay"></div>
      <div class="content">
        <h1>{{ texts.h1[currentLanguage] }}</h1>
        <p>{{ texts.p[currentLanguage] }}</p>
        <el-form :model="formData" ref="form" :rules="rules" label-width="80px" class="custom-label">
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
          <el-form-item>
            <el-button type="primary" class="center-button" @click="toRegistPage">{{currentLanguage == 'Chinese' ? "注册" : "Regist"}}</el-button>
            <el-button type="primary" class="center-button" @click="onSubmitLogin">{{currentLanguage == 'Chinese' ? "登录" : "Login"}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: 'LoginPage',
    //设置背景图和文字
    data() {
      return {
        //图片及文字
        background: require('@/assets/latterns_building.jpg'),
        texts:{ 
          h1: {Chinese:'放飞希望', English:'Fly Our Hopes', Louis:'用户登录'}, 
          p: {Chinese:'进入我的漫天星空', English:'Enter my starry sky', Louis:'User Login Interface'}, 
        },
        //提示词
        // 提示词根据语言切换
        abbr:{
          username: {Chinese:'账号', English:'Username', Louis:'Username'},
          password: {Chinese:'密码', English:'Password', Louis:'Password'},
        },
        prompts:{
          username: {Chinese:'请输入账号', English:'Enter your username', Louis:'Username'},
          password: {Chinese:'请输入密码', English:'Enter your password', Louis:'Password'},
        },
        //输入信息
        userData: {
          uid: '',
          nickname: '',
          brief: '',
          password: '',
        },
        formData: {
          username: '',
          password: '',
        },
        rules: {
          username: [{ required: true, message: '请输入账号', trigger: 'blur' },
                     { validator: this.validateUsername, trigger: 'blur' },],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' },
                     { validator: this.validatePassword, trigger: 'blur' },],
        },
        //判断变量
        usernameVaild: false,
        passwordMatch: false,
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
      toRegistPage() {
        //跳转注册页面
        this.$router.push('/regist');
      },
      onSubmitLogin() { 
        console.log(this.$refs.form); // Check if $refs is defined and contains the form reference
        this.$refs.form.validate(valid => {
          if (valid) {
            // 所有验证通过，可以提交表单
            // 执行提交逻辑（登录）
            // 你可以通过 this.$store.commit 调用 mutation
            this.$store.commit('setUserLogin', this.userData);
            //完成登录，跳转主页
            this.$router.push('/main');
          } else {
            this.$message.error('请正确填写表单');
          }
        });
      },
      validateUsername(rule, value, callback) {
        // 账号验证逻辑，与数据库查重
        axios.get("api/users/") 
          .then((res) => { 
            //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致 
        //axios.get('http://127.0.0.1:8000/users',)
          //.then(res => {
            //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致 
            const userFound  = res.data.find(user => user.username === value); 
            this.usernameVaild = userFound;
            this.userData.uid = userFound.uid;
            this.userData.nickname = userFound.nickname;
            this.userData.brief = userFound.brief;
            this.userData.password = userFound.password;
          }) 
          .catch(() => { 
            alert("nickname-check-wrong"); 
          });
        callback();
      },
      validatePassword(rule, value, callback) {
        // 密码验证逻辑，可以根据需求自定义
        // 例如，检查密码是否符合一定的要求，比如长度、包含字母和数字等
        if (value == this.userData.password)
            this.passwordMatch = true;
        else
            this.passwordMatch = false;
        if (!this.usernameVaild || !this.passwordMatch) {
          callback(new Error('账号和密码不匹配'));
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
    
    text-align: center;
    top: 70%;
  }
  </style>