<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/store')" style="margin-left: 20px">Store</my-button>
      <my-button @click="$router.push('/composition')" style="margin-left: 20px">Compostion</my-button>
      <my-button @click="$router.push('/about')" style="margin-left: 20px">Обо мне</my-button>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
  .navbar {
    height: 70px;
    background-color: gray;
    box-shadow: 2px 2px 4px black;
    display: flex;
    align-items: center;
    padding: 0 15px;
  }

  .navbar__btns {
    margin-left: auto
  }
</style>