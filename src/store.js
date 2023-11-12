import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //用户登录信息
    UserLogin: true,
    USER: {
      UID: "123456",
      NICKNAME: "TEST Derby",
      BIO: "Absolutely Horse Lover!!",
    },
    //全局语言
    Lang: [
        'Chinese',
        'English',
        'Louis',
    ],
    LangIndex: 0,
    //控制音频按钮显示
    showAudioButton: true,
  },
  getters: {
    userLogin: function(state) {
      return state.UserLogin;
    },
    userInfo: function(state) {
      return state.USER;
    },
    curLanguage: function(state) {
      return state.Lang[state.LangIndex];
    },
    showAudioButton: function(state) {
      return state.showAudioButton;
    },
  },
  mutations: {
    //用户登录
    setUserLogin(state, { uid, nickname, brief }) {
      state.UserLogin = true;
      state.USER.UID = uid;
      state.USER.NICKNAME = nickname;
      state.USER.BIO = brief;
    },
    //用户登出
    setUserLogout(state) {
      state.UserLogin = false;
      state.USER.UID = "000000";//默认uid
      state.USER.NICKNAME = "逐生者";//默认昵称
      state.USER.BIO = "请多关照！";//默认简介
    },
    //切换语言
    togLanguage(state) {
        state.LangIndex = (state.LangIndex + 1) % state.Lang.length;
      },
    //显示或隐藏音频按钮
    showAudioButton(state) {
        state.showAudioButton = true;
      },
    hideAudioButton(state) {
        state.showAudioButton = false;
      },
  },
});