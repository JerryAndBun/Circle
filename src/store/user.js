const user = {
    namespaced: true,
    /* 
    1.分类vuex仓库
    2.commitarticle功能
    */
    state: {
        avatar:'',
        createdAt:'',
        email: '',
        fans:0,
        focusOn:0,
        videos:0,
        nickname: '',
        signature:'',
        uid: '',
        islogin: '',
        token:'',
    },
    getters: {
        avatar: state => {
            let avatar = state.avatar
            if (!avatar) {
                avatar = JSON.parse(window.localStorage.getItem('avatar')) || null
            }
            return avatar
        },
        createdAt: state => {
            let createdAt = state.createdAt
            if (!createdAt) {
                createdAt = JSON.parse(window.localStorage.getItem('createdAt')) || null
            }
            return createdAt
        },
        email: state => {
            let email = state.email
            if (!email) {
                email = JSON.parse(window.localStorage.getItem('email')) || null
            }
            return email
        },
        fans: state => {
            let fans = state.fans
            if (!fans) {
                fans = JSON.parse(window.localStorage.getItem('fans')) || 0
            }
            return fans
        },
        focusOn: state => {
            let focusOn = state.focusOn
            if (!focusOn) {
                focusOn = JSON.parse(window.localStorage.getItem('focusOn')) || 0
            }
            return focusOn
        },
        videos: state => {
            let videos = state.videos
            if (!videos) {
                videos = JSON.parse(window.localStorage.getItem('videos')) || 0
            }
            return videos
        },
        nickname: state => {
            let nickname = state.nickname
            if (!nickname) {
                nickname = JSON.parse(window.localStorage.getItem('nickname')) || null
            }
            return nickname
        },
        signature: state => {
            let signature = state.signature
            if (!signature) {
                signature = JSON.parse(window.localStorage.getItem('signature')) || null
            }
            return signature
        },
        uid: state => {
            let uid = state.uid
            if (!uid) {
                uid = JSON.parse(window.localStorage.getItem('uid')) || null
            }
            return uid
        },
        islogin: state => {
            let islogin = state.islogin
            if (!islogin) {
                islogin = JSON.parse(window.localStorage.getItem('islogin')) || null
            }
            return islogin
        },
        token: state => {
            let token = state.token
            if (!token) {
                token = JSON.parse(window.localStorage.getItem('token')) || null
            }
            return token
        },
    },
    mutations: {
        setAvatar: (state, avatar) => {
            state.avatar = avatar;
            window.localStorage.setItem('avatar', JSON.stringify(avatar))
        },
        setcreatedAt: (state, createdAt) => {
            state.createdAt = createdAt;
            window.localStorage.setItem('createdAt', JSON.stringify(createdAt))
        },
        setEmail: (state, email) => {
            state.email = email;
            window.localStorage.setItem('email', JSON.stringify(email))
        },
        setFans: (state, fans) => {
            state.fans = fans;
            window.localStorage.setItem('fans', JSON.stringify(fans))
        },
        setFocusOn: (state, focusOn) => {
            state.focusOn = focusOn;
            window.localStorage.setItem('focusOn', JSON.stringify(focusOn))
        },
        setVideos: (state, videos) => {
            state.videos = videos;
            window.localStorage.setItem('videos', JSON.stringify(videos))
        },
        setNickname: (state, nickname) => {
            state.nickname = nickname;
            window.localStorage.setItem('nickname', JSON.stringify(nickname))
        },
        setSignature: (state, signature) => {
            state.signature = signature;
            window.localStorage.setItem('signature', JSON.stringify(signature))
        },
        setUid: (state, uid) => {
            state.uid = uid;
            window.localStorage.setItem('uid', JSON.stringify(uid))
        },
        setIsLogin: (state, islogin) => {
            state.islogin = islogin;
            window.localStorage.setItem('islogin', JSON.stringify(islogin))
        },
        setToken: (state, token) => {
            state.token = token;
            window.localStorage.setItem('token', JSON.stringify(token))
        },
    },
    actions: {}
}
export default user