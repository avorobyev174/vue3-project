import Main from '@/pages/Main.vue'
import { createRouter, createWebHistory } from 'vue-router'
import UserPosts from '@/pages/UserPosts.vue'
import About from '@/pages/About.vue'
import PostPage from '@/components/PostPage.vue'
import UserPostsStore from '@/pages/UserPostsStore.vue'
import UserPostsComposition from '@/pages/UserPostsComposition.vue'

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component: UserPosts
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/posts/:id',
    component: PostPage
  },
  {
    path: '/store',
    component: UserPostsStore
  },
  {
    path: '/composition',
    component: UserPostsComposition
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router