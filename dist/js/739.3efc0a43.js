"use strict";(self["webpackChunkjekedao_front"]=self["webpackChunkjekedao_front"]||[]).push([[739],{739:function(t,e,n){n.r(e),n.d(e,{default:function(){return u}});var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"home",style:{backgroundImage:"url("+t.background+")"}},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"content"},[e("h1",[t._v(t._s(t.lattern.title))]),e("p",[t._v(t._s(t.lattern.poster.username))])]),e("el-input",{staticClass:"textarea",attrs:{type:"textarea",rows:8,placeholder:"此处返回结果",readonly:""},model:{value:t.lattern.content,callback:function(e){t.$set(t.lattern,"content",e)},expression:"lattern.content"}}),e("el-button",{staticClass:"center-button",attrs:{type:"primary"},on:{click:t.goBack}},[t._v(t._s(t.prompts.return[t.currentLanguage]))])],1)},r=[],s=n(804),o={name:"LatternsCatch",props:["id"],data(){return{background:n(7723),texts:{h1:"Fly Our Hopes",p:"Some different description here."},prompts:{return:{Chinese:"返回",English:"Return",Louis:"BACK"}},lattern:{No:"0001",title:"Dreaming",content:"a sweet dream",poster:{uid:"123456",username:"Pretty"}}}},computed:{currentLanguage(){return this.$store.getters.curLanguage}},methods:{onCatchLattern(){console.log("submit! get"),s.Z.get("api/latterns/").then((t=>{const e=t.data.find((t=>t.No===this.id));e?this.lattern=e:console.log("fail catching lattern"),console.log(this.lattern)})).catch((()=>{alert("lattern-catch-wrong")}))},goBack(){this.$router.go(-1)}},created(){this.onCatchLattern(),this.$store.commit("hideAudioButton")}},c=o,l=n(1001),i=(0,l.Z)(c,a,r,!1,null,"22adba16",null),u=i.exports}}]);
//# sourceMappingURL=739.3efc0a43.js.map