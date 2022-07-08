const info = {
  namespaced: true,
  /* 
    1.分类vuex仓库
    2.commitarticle功能
    */
  state: {
    searchtext: null,
    isuser: false,
    tempuid: '',
    toast_list: [],
    is_show_all_input:false
  },
  getters: {
    is_show_all_input: (state) => {
      let is_show_all_input = state.is_show_all_input
      if (!is_show_all_input) {
        is_show_all_input = JSON.parse(window.localStorage.getItem('is_show_all_input')) || null
      }
      return is_show_all_input
    },
    toast_list: (state) => {
      let toast_list = state.toast_list
      if (!toast_list) {
        toast_list = JSON.parse(window.localStorage.getItem('toast_list')) || null
      }
      return toast_list
    },
    searchtext: (state) => {
      let searchtext = state.searchtext
      if (!searchtext) {
        searchtext = JSON.parse(window.localStorage.getItem('searchtext')) || null
      }
      return searchtext
    },
    isuser: (state) => {
      let isuser = state.isuser
      if (!isuser) {
        isuser = JSON.parse(window.localStorage.getItem('isuser')) || null
      }
      return isuser
    },
    tempuid: (state) => {
      let tempuid = state.tempuid
      if (!tempuid) {
        tempuid = JSON.parse(window.localStorage.getItem('tempuid')) || null
      }
      return tempuid
    },
  },
  mutations: {
    setSearchText: (state, is_show_all_input) => {
      state.is_show_all_input = is_show_all_input
      window.localStorage.setItem('is_show_all_input', JSON.stringify(is_show_all_input))
    },
    toast_list: (state, payload) => {
      // alert(Array.isArray(state.toast_list))
      if (payload.type == 'push') {
        state.toast_list.push(payload.content)
        window.localStorage.setItem('toast_list', JSON.stringify(state.toast_list))
      } else {
        state.toast_list = []
        window.localStorage.setItem('toast_list', JSON.stringify(state.toast_list))
      }
    },
    setSearchText: (state, searchtext) => {
      state.searchtext = searchtext
      window.localStorage.setItem('searchtext', JSON.stringify(searchtext))
    },
    setIsUser: (state, isuser) => {
      state.isuser = isuser
      window.localStorage.setItem('isuser', JSON.stringify(isuser))
    },
    setTempuid: (state, setTempuid) => {
      state.setTempuid = setTempuid
      window.localStorage.setItem('setTempuid', JSON.stringify(setTempuid))
    },
  },
  actions: {},
}
export default info
