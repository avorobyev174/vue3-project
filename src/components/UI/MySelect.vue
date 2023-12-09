<template>
  <select
    :value="modelValue"
    @change="changeOptions"
  >
    <option value="" disabled>Выберите из списка</option>
    <option 
      v-for="{ name, value } in options" 
      :value="value" 
      :key="value"
    >{{ name }}</option>
  </select>
</template>

<script>
  export default {
    name: 'MySelect',
    props: {
      modelValue: {
        type: String,
      },
      options: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      changeOptions(event) {
        this.$emit('update:modelValue', event.target.value)
      }
    }
  }
</script>

<style scoped>

</style>