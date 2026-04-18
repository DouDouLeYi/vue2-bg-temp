<script>
export default {
  name: 'BaseComponent',
  inheritAttrs: false,
  props: {
    id: {
      type: String
    },
    span: {
      type: Number,
      default: 12
    },
    value: {
      type: Object,
      default: () => ({})
    },
    label: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    }
  },
  computed: {}
}
</script>

<template>
  <el-col :span="span">
    <el-form-item
      :prop="id"
      :label="label"
      :rules="rules"
      v-bind="$attrs"
    >
      <slot />
    </el-form-item>
  </el-col>
</template>

<style scoped lang="scss"></style>
