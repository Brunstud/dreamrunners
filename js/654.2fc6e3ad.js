"use strict";(self["webpackChunkjekedao_front"]=self["webpackChunkjekedao_front"]||[]).push([[654],{654:function(t,e,s){s.r(e),s.d(e,{default:function(){return u}});var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"home",style:{backgroundImage:"url("+t.background+")"}},[e("div",{staticClass:"overlay"}),e("div",{staticClass:"content"},[e("h1",[t._v(t._s(t.texts.h1[t.currentLanguage]))]),e("p",[t._v(t._s(t.texts.p[t.currentLanguage]))])]),0==this.latterns.number?e("p",{staticClass:"msg"},[t._v(t._s(t.texts.msg[t.currentLanguage]))]):e("div",{staticClass:"lattern-container"},t._l(t.latterns.show,(function(s,n){return e("div",{key:n,staticClass:"lattern"},[e("router-link",{staticClass:"link",attrs:{to:"/latterns/"+s.No}},[e("img",{staticClass:"lattern-image",attrs:{src:t.latternImage,alt:"红灯笼"}}),e("p",[t._v(t._s(s.title))])])],1)})),0),e("el-button",{staticClass:"center-button",attrs:{type:"primary"},on:{click:t.renew}},[t._v(t._s(t.texts.catch[t.currentLanguage]))])],1)},r=[],a=(s(560),s(804)),o={name:"SkyPage",data(){return{background:s(3840),latternImage:s(4015),texts:{h1:{Chinese:"放飞希望",English:"Fly Our Hopes",Louis:"用户个人界面"},p:{Chinese:"仰望我的漫天星空",English:"Look up at my starry sky",Louis:"User Personal Interface"},msg:{Chinese:"此地无银三百两...",English:"There are many lanterns worth flying...",Louis:"something miss"},catch:{Chinese:"捕捉",English:"Catch",Louis:"FIND"},release:{Chinese:"制作一个新灯笼",English:"Make a new lantern",Louis:"POST A NEW MSG"}},latterns:{No:[],show:[],pointer:0,show_num:3,number:0}}},computed:{currentLanguage(){return this.$store.getters.curLanguage}},methods:{async findAllLatterns(){try{const t=await a.Z.get("api/latterns/");this.latterns.number=t.data.length;for(let e=0;e<t.data.length;e++)this.latterns.No.push(t.data[e].No);console.log(this.latterns.No)}catch(t){console.error("Error fetching user data:",t),alert("latterns-find-wrong")}},async findLatternsShown(){this.latterns.show.splice(0,this.latterns.show.length);for(let e=this.latterns.pointer,s=Math.min(this.latterns.pointer+this.latterns.show_num,this.latterns.number);e<s;e++)try{const t=await a.Z.get("api/latterns/"),s=t.data.find((t=>t.No===this.latterns.No[e]));console.log(s),s?this.latterns.show.push({No:s.No,title:s.title}):console.log("find-wrong-lattern-no")}catch(t){console.error("Error fetching lantern data:",t),alert("latterns-catch-wrong")}},renew(){console.log("renew"),this.latterns.show_num=Math.floor(5*Math.random())+1,this.latterns.pointer=(this.latterns.pointer+3)%this.latterns.number,this.findLatternsShown()},goBack(){this.$router.go(-1)}},mounted(){this.user=this.$store.getters.userInfo,this.findAllLatterns()},created(){this.$store.getters.userLogin||this.$router.push("/login"),this.$store.commit("hideAudioButton")}},i=o,l=s(1001),h=(0,l.Z)(i,n,r,!1,null,"14dcdd32",null),u=h.exports},4015:function(t,e,s){t.exports=s.p+"img/lattern2.23b52818.png"}}]);
//# sourceMappingURL=654.2fc6e3ad.js.map