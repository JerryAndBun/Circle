import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/user.js'
import info from '@/store/info.js'
import video from '@/store/video.js'

Vue.use(Vuex);

export default new Vuex.Store(
    {
        modules: {
            user,
            info,
        }
    }
)