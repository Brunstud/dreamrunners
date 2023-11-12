//const { defineConfig } = require('@vue/cli-service')
//module.exports = defineConfig({
  //transpileDependencies: true
//})
//网站部署到github pages
      const { defineConfig } = require('@vue/cli-service')
      module.exports = defineConfig({
        transpileDependencies: true,
        lintOnSave: false,
        publicPath: process.env.NODE_ENV === 'production' ? '/dreamrunners' : '/'
      })