<template>
  <input 
    class="input" 
    type="text" 
    :value="modelValue"
    @input="updateInput"
  >
</template>

<script>
  export default {
    name: 'MyInput',
    props: {
      modelValue: [ String, Number ]
    },
    methods: {
      updateInput(evt) {
        this.$emit('update:modelValue', evt.target.value)
      }
    }
  }
</script>

<style scoped>
  .input {
    width: 100%;
    border: 1px solid black;
    padding: 10px 15px;
    margin-top: 15px;
  }
</style>