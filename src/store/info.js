const info = {
    namespaced: true,
    /* 
    1.分类vuex仓库
    2.commitarticle功能
    */
    state: {
        searchtext:null,
        isuser:false,
        tempuid:'',
    },
    getters: {
        searchtext: state => {
            let searchtext = state.searchtext
            if (!searchtext) {
                searchtext = JSON.parse(window.localStorage.getItem('searchtext')) || null
            }
            return searchtext
        },
        isuser: state => {
            let isuser = state.isuser
            if (!isuser) {
                isuser = JSON.parse(window.localStorage.getItem('isuser')) || null
            }
            return isuser
        },
        tempuid: state => {
            let tempuid = state.tempuid
            if (!tempuid) {
                tempuid = JSON.parse(window.localStorage.getItem('tempuid')) || null
            }
            return tempuid
        },

    },
    mutations: {
        setSearchText: (state, searchtext) => {
            state.searchtext = searchtext;
            window.localStorage.setItem('searchtext', JSON.stringify(searchtext))
        },
        setIsUser: (state, isuser) => {
            state.isuser = isuser;
            window.localStorage.setItem('isuser', JSON.stringify(isuser))
        },
        setTempuid: (state, setTempuid) => {
            state.setTempuid = setTempuid;
            window.localStorage.setItem('setTempuid', JSON.stringify(setTempuid))
        },
    },
    actions: {}
}
export default info