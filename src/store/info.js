const info = {
    namespaced: true,
    /* 
    1.分类vuex仓库
    2.commitarticle功能
    */
    state: {
        searchtext:'',
    },
    getters: {
        searchtext: state => {
            let searchtext = state.searchtext
            if (!searchtext) {
                searchtext = JSON.parse(window.localStorage.getItem('searchtext')) || ""
            }
            return searchtext
        },
    },
    mutations: {
        setSearchText: (state, searchtext) => {
            state.searchtext = searchtext;
            window.localStorage.setItem('searchtext', JSON.stringify(searchtext))
        },
    },
    actions: {}
}
export default info