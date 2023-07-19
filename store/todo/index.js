import {TODO_API} from "../../api-config";
export const state = () => ({
  data: [],
  search: '',
  status: 0,
})
export const mutations = {
  // Data
  setData(state, data) {
    state.data = data.reverse()
  },

  deleteData(state, id) {
    state.data = state.data.filter(item => item.id !== id)
  },

  createData(state, newData) {
    state.data.unshift(newData)
  },

  updateData(state, params) {
    const index = state.data.findIndex(item => item.id === String(params.id))
    if (index !== -1) {
      state.data.splice(index, 1, params.updateData)
    }
  },

  // Search
  setSearch(state, keySearch) {
    state.search = keySearch
  },

  // Status
  setStatus(state, status) {
    state.status = status
  }
}

export const getters = {
  filterData(state) {
    const status= state.status
    const search= state.search
    if (search === '' && status === 0) {
      return state.data
    }
    else if (search !== '') {
      const keyword = search.toLowerCase()
      return state.data.filter(item => item.name.toLowerCase().includes(keyword))
    }
    else {
      return state.data.filter(item => Number(item.status) === status)
    }

  },

}
export const actions = {
   fetchDataAction({commit}) {
      return this.$axios.$get(TODO_API)
        .then((response) => {
          commit('setData', response)
        })
        .catch((error) => {
          console.log(error)
        })
   },

  deleteDataAction({commit}, id) {
     return this.$axios.$delete(TODO_API+id)
       .then((response) => {
          commit('deleteData', id)
       })
       .catch((error) => {
         console.log(error)
       })
  },

  createDataAction({commit}, newData) {
     return this.$axios.$post(TODO_API, newData)
       .then((response) => {
         commit('createData', response)
       })
       .catch((error) => {
         console.log(error)
       })
  },

  previewDataAction({commit}, id) {
     return this.$axios.$get(TODO_API+id)
       .catch((error) => {
       console.log(error)
     })
  },

   updateDataAction({commit}, params) {

     return this.$axios.$put(TODO_API+`${params.id}`, params.updateData)
      .then((response) => {
        commit('updateData', params)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
