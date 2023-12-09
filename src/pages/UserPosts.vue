<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input 
      v-model="searchQuery"
      placeholder="Поиск..."
      v-focus
    ></my-input>
    <div class="app__btns">
      <my-button
        @click="showDialog" 
      >
        Создать пост
      </my-button>
      <my-select
        v-model="selectedSort"
        :options="sortOptions"
      ></my-select>
    </div>
    <my-dialog
      v-model:show="dialogVisible"
    >
      <post-form
        @create="createPost"
      ></post-form>
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isLoading"
    />
    <div v-else>Идет загрузка....</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--<div class="page__wrapper">
      <div 
        v-for="pageNumber in totalPages" 
        :key="pagpageNumbere" 
        class="page"
        :class="{ 'current-page' : page === pageNumber }"
        @click="changePage(pageNumber)"
      >{{ pageNumber }}</div>
    </div> -->
  </div>
</template>
<script>
import PostForm from '@/components/PostForm' //src
import PostList from '@/components/PostList'
import axios from 'axios'

export default {
  components: {
    PostForm,
    PostList,
  },
  data: () => ({
    posts: [],
    dialogVisible: false,
    modValue: '',
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
  mounted() {
    this.fetchPosts()   
  },
  computed: {
    sortedPost() {
      return this.posts.slice(0).sort((post1, post2) => {
        return this.selectedSort === 'id'
          ? post1[this.selectedSort] - post2[this.selectedSort]
          : post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPost.filter(({ title }) => title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // selectedSort(newVal) {
    //   this.posts.sort((post1, post2) => {
    //     return newVal === 'id'
    //       ? post1[newVal] - post2[newVal]
    //       : post1[newVal]?.localeCompare(post2[newVal])
    //   })
    // }
    // page() {
    //   this.fetchPosts()
    // }
  },  
  methods: {
    createPost(post, second) {
      this.posts.unshift(post)
      this.dialogVisible = false
    },
    removePost(post) {
      console.log(post);
      this.posts.splice(this.posts.indexOf(post), 1)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        this.isLoading = true        
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        })
        this.posts = response.data
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)           
      } catch (e) {
        alert(e)
      } finally {
        this.isLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1    
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        })
        this.posts = [ ...this.posts, ...response.data ]
      } catch (e) {
        alert(e)
      } 
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber
    //   //this.fetchPosts()
    // }
  }
}
</script>
<style>
  .app__btns {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
  }

  .page {
    border: 1px solid blue;
    padding: 10px;
  }

  .page__wrapper {
    display: flex;
    margin-top: 15px;
  }

  .current-page {
    background-color: lightblue
  }

  .observer {
    height: 30px;
    background-color: green;
  }
</style>