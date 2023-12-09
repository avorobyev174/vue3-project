<template>
  <div 
    class="dialog"
    v-if="show"
    @click="hideDialog"
  >
    <div 
      class="dialog__content"
      @click.stop
    >
      <slot/>
    </div>
  </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin';

  export default {
    name: 'MyDialog',
    // props: {
    //   show: {
    //     tpye: Boolean,
    //     default: false
    //   }
    // },
    mixins: [ toggleMixin ],
    // methods: {
    //   hideDialog() {
    //     this.$emit('update:show', false)
    //   }
    // }
  }
</script>

<style scoped>
  .dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0 , 0.5);
    position: fixed;
    display: flex;
  }

  .dialog__content {
    margin: auto;
    background: white;
    border-radius: 10px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
  }
</style>