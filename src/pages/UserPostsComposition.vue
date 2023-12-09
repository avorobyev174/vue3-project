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
      ></post-form>
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      v-if="!isLoading"
    />
    <div v-else>Идет загрузка....</div>
  </div>
</template>
<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import usePosts from '../hooks/usePosts'
import useSortedPosts from '../hooks/useSortedPosts'
import useSortedAndSearchedPosts from '../hooks/useSortedAndSearchedPosts'

export default {
  components: {
    PostForm,
    PostList,
  },
  data: () => ({
    dialogVisible: false,
  }),
  setup(props) {
    const { posts, isLoading, totalPages } = usePosts(10)
    const { selectedSort, sortOptions, sortedPosts } = useSortedPosts(posts)
    const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts)

    return {
      posts, isLoading, totalPages, selectedSort, sortOptions, sortedPosts, searchQuery, sortedAndSearchedPosts
    }
  },  
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