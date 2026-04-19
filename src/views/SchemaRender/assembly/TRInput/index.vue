<script>
import BaseComponent from '@/views/SchemaRender/assembly/BaseComponent.vue'
import formMixin from '@/views/SchemaRender/mixins/formMixin'

export default {
  name: 'TRInput',
  components: { BaseComponent },
  mixins: [formMixin],
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    formData: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    formData: {
      handler(newVal, oldVal) {
        // console.log(newVal, this.$attrs.otherParams)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
  }
}
</script>

<template>
  <BaseComponent v-bind="$attrs">
    <el-input v-model="innerValue" placeholder="请输入" v-bind="$attrs.otherOptions" />
  </BaseComponent>
</template>

<style scoped lang="scss">

</style>
