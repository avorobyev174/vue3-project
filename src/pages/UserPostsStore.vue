<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input 
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
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
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
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
  </div>
</template>
<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    PostForm,
    PostList,
  },
  data: () => ({
    dialogVisible: false,
  }),
  mounted() {
    this.fetchPosts()   
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isLoading: state => state.post.isLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      sortOptions: state => state.post.sortOptions,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPost: 'post/sortedPost',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    })
  },
  methods: {
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    createPost(post) {
      this.posts.unshift(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts.splice(this.posts.indexOf(post), 1)
    },
    showDialog() {
      this.dialogVisible = true
    },
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