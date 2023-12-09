import axios from 'axios'

export const postModule = {
  state: () => ({
    posts: [],
    isLoading: false,
    selectedSort: '',
    searchQuery: '',
    sortOptions: [
      { value: 'title', name: 'По названию' },
      { value: 'body', name: 'По содержимому' },
      { value: 'id', name: 'По Id' },
    ],
    page: 1,
    limit: 10,
    totalPages: 0
  }),
  getters: {
    sortedPost(state) {
      return state.posts.slice(0).sort((post1, post2) => {
        return state.selectedSort === 'id'
          ? post1[state.selectedSort] - post2[state.selectedSort]
          : post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      })
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPost.filter(({ title }) => title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    }
  },
  mutations: {  
    setPosts(state, posts) {
      state.posts = posts
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    setPage(state, page) {
      state.page = page
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    }
  },
  actions: {
    async fetchPosts({ state, commit, dispatch }) {
      try {
        commit('setLoading', true)        
        const { data, headers } = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit,
          }
        })       
        commit('setTotalPages', Math.ceil(headers['x-total-count'] / state.limit))  
        commit('setPosts', data) 
      } catch (e) {
        alert(e)
      } finally {
        commit('setLoading', false)      
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit('setPage', state.page + 1 )    
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit,
          }
        })
        commit('setPosts', [ ...state.posts, ...data ]) 
      } catch (e) {
        alert(e)
      } 
    },
  },
  namespaced: true
}