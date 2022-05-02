import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/user.js'
import video from '@/store/video.js'

Vue.use(Vuex);

export default new Vuex.Store({
    // modules: {
    //     user,
    //     video,
    // }
    state:{
        uid:'',
        islogin:false,
        nickname:'',
        userpassword:'',
        email:'',
    },
    getters:{
        nickname:state=>{
            let nickname = state.nickname
            if(!nickname){
                nickname=JSON.parse(window.localStorage.getItem('nickname'))
            }
            return nickname
        },
        userpassword:state=>{
            let userpassword = state.userpassword
            if(!userpassword){
                userpassword=JSON.parse(window.localStorage.getItem('password'))
            }
            return userpassword
        },
        nickname:state=>{
            let email = state.email
            if(!email){
                email=JSON.parse(window.localStorage.getItem('email'))
            }
            return email
        },
        uid:state=>{
            let uid = state.uid
            if(!uid){
                uid=JSON.parse(window.localStorage.getItem('uid'))
            }
            return uid
        },
        islogin:state=>{
            let islogin = state.islogin
            if(!islogin){
                islogin=JSON.parse(window.localStorage.getItem('islogin'))
            }
            return islogin
        },
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