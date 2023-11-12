<template>
    <div class="content">
      <audio ref="audio"></audio>
      <button @click="toggleLanguage">
        <div v-if='currentLanguage=="Chinese"'><strong>CN</strong>/EN</div>
        <div v-else-if='currentLanguage=="English"'>CN/<strong>EN</strong></div>
        <div v-else>{{ this.$store.getters.curLanguage }}</div>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppLanguage',
    //返回当前语言
    computed: {
      currentLanguage() {
        return this.$store.getters.curLanguage;
      },
    },
    //切换语言
    methods: {
      toggleLanguage() {
        this.$store.commit('togLanguage');
      },
    },
  };
  </script>
  
  <style scoped>
  .content {
    position: absolute;
    top: 94%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 2;
    color: #333;
    text-shadow: 1px 1px 2px #fff;
  }
  
  /*音频按钮*/
  button {
    background-color: #3498db00;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  button:hover {
    background-color: rgba(93, 209, 153, 0.6);
  }
  </style>