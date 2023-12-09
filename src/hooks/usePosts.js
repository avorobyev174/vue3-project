import axios from 'axios'
import { ref, onMounted } from 'vue'

export default function usePosts(limit) {
  const posts = ref([])
  const totalPages = ref(0)
  const isLoading = ref(true)
  const fetching = async () => {
    try {
      isLoading.value = true        
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: 1,
          _limit: limit,
        }
      })
      posts.value = response.data
      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)           
    } catch (e) {
      alert(e)
    } finally {
      isLoading.value = false
    }  
  }

  onMounted(fetching) 

  return {
    posts, isLoading, totalPages
  }  
}