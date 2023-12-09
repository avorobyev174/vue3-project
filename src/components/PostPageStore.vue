<template>
  <div>
    <h1>{{ $store.state.likes }}</h1>
    <h1>{{ $store.getters.doubleLikes }}</h1>
    <div>
      <my-button @click="$store.commit('incLikes')">+</my-button>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

</style>