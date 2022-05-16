const info = {
    namespaced: true,
    /* 
    1.分类vuex仓库
    2.commitarticle功能
    */
    state: {
        searchtext:null,
        isuser:false,
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
    },
    actions: {}
}
export default info