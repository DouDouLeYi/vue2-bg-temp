// ───────────────────────────────────────── // UserForm.vue —
抽屉内的业务组件示例 // ─────────────────────────────────────────
<template>
  <div style="display: flex;flex-direction: column;height: 100%">
    <el-form
      ref="formRef"
      :model="formData"
      label-position="left"
      label-width="100px"
      class="demo-ruleForm"
      style="flex: 1;padding: 0 20px"
    >
      <template v-if="schema.mouldType">
        <component
          :is="renderComp(schema.mouldType,true)"
          :form-data="formData"
          v-bind="schema"
        />
      </template>
      <template v-for="item in schema.column" v-else>
        <component
          :is="renderComp(item.type)"
          :key="item.id"
          v-model="formData[item.id]"
          :form-data="formData"
          v-bind="item"
        />
      </template>
    </el-form>
    <!-- 按钮区域 -->
    <div v-if="schema.bottonColumn" class="buttonWrap">
      <el-button type="primary" @click="submitForm">立即创建</el-button>
      <el-button @click="resetForm">重置</el-button>
      <!--        <div id="app" @click="showSimple">点击简单提示</div>-->
    </div>
  </div>
</template>

<script>
import { TRButton, BaseComponent, TRDate } from '@/views/SchemaRender/assembly'
import TRInput from '@/views/SchemaRender/assembly/TRInput/index.vue'
import { LayoutInfo } from '@/views/SchemaRender/mock/confMock'
import { Assembly_FILIATION, TEMPLATE_TYPE } from '@/views/SchemaRender/helper'

export default {
  name: 'PageRender',
  components: { TRInput, TRDate, BaseComponent, TRButton },
  props: {
    userId: Number,
    layoutId: {
      type: String,
      default: '110'
    }
  },
  data() {
    return {
      formData: {},
      schema: {}
    }
  },
  computed: {
    renderComp() {
      return (type, isTemplate = false) => {
        if (isTemplate) {
          return TEMPLATE_TYPE[type]
        }
        return Assembly_FILIATION[type]
      }
    }
  },
  mounted() {
    this.schema = LayoutInfo[this.layoutId]
  },
  methods: {
    showSimple() {
      this.$drawer({
        beforeClose(done) {
          this.$confirm('确认关闭？未保存内容将丢失', '提示', {
            type: 'warning'
          })
            .then(() => done())
            .catch(() => {})
        },
        title: '提示',
        size: '360px',
        // 可以把纯展示组件包一层再传入
        component: {
          render(h) {
            return h('div', { style: 'padding:20px' }, '这是一段简单文字内容')
          }
        }
      })
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$emit('confirm', this.formData)
          console.log('表单提交成功:', this.formData)
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.formRef.resetFields()
    },
    fetchUser() {
      console.log('获取用户数据，userId:', this.userId)
      // 实际项目中这里应该是一个 API 请求
    },
    // 内部主动触发确认（配合 showFooter: false 自定义按钮）
    submit() {
      this.submitForm()
    }
  }
}
</script>
<style scoped>
.buttonWrap {
  text-align: center;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.03);
}
</style>
