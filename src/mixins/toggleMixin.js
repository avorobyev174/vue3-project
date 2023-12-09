export default {
  props: {
    show: {
      tpye: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false)
    }
  },
}