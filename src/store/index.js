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
        // uid,
        // nickname,
        // islogin:false,
        nickname:'',
        userpassword:'',
        email:'',
    },
    getters:{
        // islogin
        // bignickname:state=>state.nickname,
        // biguserpassword:state=>state.userpassword
    },
    mutations:{
        setNickname:(state,payload)=>{
            state.nickname=payload;
        },
        setUserPassword:(state,UserPassword)=>{
            state.userpassword=UserPassword;
        },
        setEmail:(state,Email)=>{
            state.email=Email;
        }
    },
    actions:{}
})