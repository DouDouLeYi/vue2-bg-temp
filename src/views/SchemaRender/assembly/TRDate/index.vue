<script>
import BaseComponent from '@/views/SchemaRender/assembly/BaseComponent.vue'
import formMixin from '@/views/SchemaRender/mixins/formMixin'

export default {
  name: 'TRDate',
  components: { BaseComponent },
  mixins: [formMixin],
  props: {
    value: {
      type: [Date]
    }
    // id: {
    //   type: String,
    //   default: ''
    // },
    // label: {
    //   type: String,
    //   default: ''
    // },
    // rules: {
    //   type: Array,
    //   default: () => []
    // },
    // span: {
    //   type: Number,
    //   default: 12
    // }
  },
  mounted() {
    // console.log('Component mounted.', this.$attrs)
  }
}
</script>

<template>
  <BaseComponent v-bind="$attrs">
    <el-date-picker
      v-model="innerValue"
      type="date"
      placeholder="选择日期"
      style="width: 100%"
    />
  </BaseComponent>
</template>

<style scoped lang="scss"></style>
