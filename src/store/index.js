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
        username:'',
        userpassword:'',
        sum:0,
    },
    getters:{
        // islogin
        // bigusername:state=>state.username,
        // biguserpassword:state=>state.userpassword
    },
    mutations:{
        setUsername:(state,payload)=>{
            state.username=payload;
        },
        setUserPassword:(state,UserPassword)=>{
            state.userpassword=UserPassword;
        }
    },
    actions:{}
})