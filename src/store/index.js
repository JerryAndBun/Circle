import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user.js'
import video from '@/store/video.js'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        uid:'',
        islogin:'',
        nickname:'',
        userpassword:'',
        email:'',
        

    },
    getters:{
        nickname:state=>{
            let nickname = state.nickname
            if(!nickname){
                nickname=JSON.parse(window.localStorage.getItem('nickname'))||null
            }
            return nickname
        },
        userpassword:state=>{
            let userpassword = state.userpassword
            if(!userpassword){
                userpassword=JSON.parse(window.localStorage.getItem('userpassword'))||null
            }
            return userpassword
        },
        nickname:state=>{
            let nickname = state.nickname
            if(!nickname){
                nickname=JSON.parse(window.localStorage.getItem('nickname'))||null
            }
            return nickname
        },
        uid:state=>{
            let uid = state.uid
            if(!uid){
                uid=JSON.parse(window.localStorage.getItem('uid'))||null
            }
            return uid
        },
        islogin:state=>{
            let islogin = state.islogin
            if(!islogin){
                islogin=JSON.parse(window.localStorage.getItem('islogin'))||null
            }
            return islogin
        },
        email:state=>{
            let email = state.email
            if(!email){
                email=JSON.parse(window.localStorage.getItem('email'))||null
            }
            return email
        }
    },
    mutations:{
        setNickname:(state,nickname)=>{
            state.nickname=nickname;
            window.localStorage.setItem('nickname',JSON.stringify(nickname))
        },
        setUserPassword:(state,userpassword)=>{
            state.userpassword=userpassword;
            window.localStorage.setItem('userpassword',JSON.stringify(userpassword))
        },
        setEmail:(state,email)=>{
            state.email=email;
            window.localStorage.setItem('email',JSON.stringify(email))
        },
        setIsLogin:(state,islogin)=>{
            state.islogin=islogin;
            window.localStorage.setItem('islogin',JSON.stringify(islogin))
        },
        setUid:(state,uid)=>{
            state.uid=uid;
            window.localStorage.setItem('uid',JSON.stringify(uid))
        },
    },
    actions:{}
})