// 表单组件公共混入
export default {
  // 所有组件都需要关闭属性透传
  inheritAttrs: false,
  // 所有组件共用的 v-model 代理计算属性
  computed: {
    innerValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
