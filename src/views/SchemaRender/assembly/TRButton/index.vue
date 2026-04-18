<script>
export default {
  name: 'TRButton',
  props: {
    formRef: {
      type: Object,
      default: null
    },
    formData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    test() {
      console.log(this.formRef)
      // 直接用！
      this.formRef.validate()
    }
  }
}
</script>

<template>
  <el-button type="primary" @click="test">立即创建</el-button>
</template>

<style scoped lang="scss">

</style>
