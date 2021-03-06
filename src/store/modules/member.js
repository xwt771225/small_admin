import {requestMemberList} from "../../util/request"
const state = {
    //列表的数据
    list: []

}

const mutations = {

    changeList(state, list) {
        state.list = list
    }
    //修改list
}

const actions = {
    requestList({ commit } ) {
        requestMemberList().then(res=>{
            commit("changeList",res.data.list)
        })
    }
}

const getters = {
    list(state){
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}
