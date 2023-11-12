<template>
    <div class="content">
      <audio ref="audio"></audio>
      <button @click="toggleAudio" :class="{ 'center': showAudioButton, 'side': !showAudioButton }">
        {{ isAudioPlaying ? 'Pause' : 'Play' }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppMusical',
    data() {
      return {
        //音频
        audioFiles: [
        require('@/assets/audio/MOONLIGHT-B.mp3'), // 替换为你的音频文件路径
        ],
        audioCurrentTime: 0, // 保存音频播放进度
        currentAudioIndex: 0, // 用于切换当前音频
        isAudioPlaying: false, // 控制音频播放状态
      };
    },
    //返回当前BGM
    computed: {
      currentAudio() {
        return this.audioFiles[this.currentAudioIndex];
      },
      showAudioButton() {
        return this.$store.getters.showAudioButton;
      },
    },
    //时间控制，切换图片及文字
    methods: {
      currentLanguage() {
        return this.$store.getters.curLanguage;
      },
      toggleAudio() {
        const audio = this.$refs.audio;
        if (this.isAudioPlaying) {
          // 暂停音频，并保存当前播放进度
          audio.pause();
          this.audioCurrentTime = audio.currentTime;
        } else {
          // 设置音频播放进度并继续播放
          audio.src = this.currentAudio; // 配置音频文件
          audio.currentTime = this.audioCurrentTime;
          audio.play();
        }
        this.isAudioPlaying = !this.isAudioPlaying;
      },
      playNextAudio() {
        this.currentAudioIndex = (this.currentAudioIndex + 1) % this.audioFiles.length;
        const audio = this.$refs.audio;
        audio.src = this.currentAudio; // 切换音频文件
        this.audioCurrentTime = 0;
        audio.play(); // 播放下一首音频
      },
    },
    //监听函数
    mounted() {
      // 监听音频播放结束
      this.$refs.audio.addEventListener('ended', this.playNextAudio);
    },
  };
  </script>
  
  <style scoped>
  .content {
    color: #333;
    text-shadow: 1px 1px 2px #fff;
  }

  .center {
    position: absolute;
    top: 62%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 2;
  }
  
  .side {
    position: absolute;
    top: 94%;
    left: 94%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 2;
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
    background-color: #2980b9;
  }
  </style>