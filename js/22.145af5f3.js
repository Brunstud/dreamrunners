"use strict";(self["webpackChunkjekedao_front"]=self["webpackChunkjekedao_front"]||[]).push([[22],{4022:function(t,e,n){n.r(e),n.d(e,{default:function(){return c}});var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"home",style:{backgroundImage:"url("+t.background+")"}},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"content"},[e("h1",[t._v(t._s(t.lattern.title))]),e("p",[t._v(t._s(t.lattern.content))])]),e("el-form",{staticClass:"form-container",attrs:{inline:!0,model:t.lattern,size:"small"}},[e("p",[t._v(t._s(t.prompts.lattern[t.currentLanguage]))]),e("div",[e("el-form-item",[e("el-input",{staticClass:"input textarea",attrs:{placeholder:t.prompts.title[t.currentLanguage],maxlength:t.titleMaxLength},model:{value:t.lattern.title,callback:function(e){t.$set(t.lattern,"title",e)},expression:"lattern.title"}})],1)],1),e("div",[e("el-form-item",[e("el-input",{staticClass:"input textarea",attrs:{rows:8,placeholder:t.prompts.content[t.currentLanguage],maxlength:t.contentMaxLength},model:{value:t.lattern.content,callback:function(e){t.$set(t.lattern,"content",e)},expression:"lattern.content"}})],1)],1)]),e("el-button",{staticClass:"return-button",attrs:{type:"primary"},on:{click:t.goBack}},[t._v(t._s(t.prompts.return[t.currentLanguage]))]),e("el-button",{staticClass:"fly-button",attrs:{type:"primary"},on:{click:t.onFlyLattern}},[t._v(t._s(t.prompts.release[t.currentLanguage]))])],1)},r=[],s=n(804),l={name:"LatternsFly",data(){return{background:n(8099),texts:{h1:"Fly Our Hopes",p:"Some different description here."},prompts:{lattern:{Chinese:"愿灯笼",English:"lattern of hope",Louis:"INPUT"},title:{Chinese:"笼题",English:"what i name",Louis:"TITLE"},content:{Chinese:"笼中语",English:"what i say",Louis:"CONTENT"},return:{Chinese:"返回",English:"Return",Louis:"BACK"},release:{Chinese:"放飞",English:"Fly",Louis:"POST"}},titleMaxLength:20,contentMaxLength:500,lattern:{No:"0001",title:"Dreaming",content:"a sweet dream",poster:{uid:"123456",username:"Pretty"}}}},computed:{currentLanguage(){return this.$store.getters.curLanguage},remainingTitleChars(){return this.titleMaxLength-this.lattern.title.length},remainingContentChars(){return this.contentMaxLength-this.lattern.content.length}},methods:{onFlyLattern(){console.log("submit! FlyLattern"),s.Z.post("api/latterns/",this.lattern).then((t=>{console.log(t.data),console.log(this.lattern)})).catch((()=>{alert("lattern-fly-wrong")}))},goBack(){this.$router.go(-1)}},created(){this.$store.commit("hideAudioButton")}},o=l,i=n(1001),u=(0,i.Z)(o,a,r,!1,null,"c7b55b4a",null),c=u.exports}}]);
//# sourceMappingURL=22.145af5f3.js.map