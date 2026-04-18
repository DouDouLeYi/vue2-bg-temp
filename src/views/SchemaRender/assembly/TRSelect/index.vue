<script>
import BaseComponent from '@/views/SchemaRender/assembly/BaseComponent.vue'
import formMixin from '@/views/SchemaRender/mixins/formMixin'

export default {
  name: 'TRSelect',
  components: { BaseComponent },
  mixins: [formMixin],
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<template>
  <BaseComponent v-bind="$attrs">
    <el-select v-model="innerValue" placeholder="请选择" style="width: 100%">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </BaseComponent>
</template>

<style scoped lang="scss"></style>
