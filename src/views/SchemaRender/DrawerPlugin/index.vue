<template>
  <el-drawer
    :id="eId"
    :title="title"
    :visible.sync="visible"
    :size="size"
    :direction="direction"
    :before-close="handleBeforeClose"
    :append-to-body="true"
    :destroy-on-close="true"
    @closed="handleClosed"
  >
    <!-- 动态内容组件 -->
    <component
      :is="component"
      v-if="component"
      v-bind="componentProps"
      @close="close"
      @confirm="handleConfirm"
    />

    <!-- 默认插槽内容（无组件时） -->
    <div v-else class="drawer-default-content">
      <slot />
    </div>

    <!-- 底部操作栏（可选） -->
    <div v-if="showFooter" class="drawer-footer">
      <el-button @click="close">取 消</el-button>
      <el-button
        type="primary"
        :loading="confirmLoading"
        @click="handleConfirm"
      >
        确 定
      </el-button>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'GlobalDrawer',

  props: {
    eId: {
      type: String,
      default: ''
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 宽度/高度（支持百分比或 px）
    size: {
      type: String,
      default: '90%'
    },
    // 方向：rtl / ltr / ttb / btt
    direction: {
      type: String,
      default: 'rtl'
    },
    // 动态渲染的内部组件
    component: {
      type: [Object, Function],
      default: null
    },
    // 传递给内部组件的 props
    componentProps: {
      type: Object,
      default: () => ({})
    },
    // 是否显示底部按钮
    showFooter: {
      type: Boolean,
      default: false
    },
    // 关闭前的钩子，返回 false 可阻止关闭
    beforeClose: {
      type: Function,
      default: null
    },
    // resolve / reject（Promise 模式用）
    resolve: {
      type: Function,
      default: null
    },
    reject: {
      type: Function,
      default: null
    }
  },

  data() {
    return {
      visible: false,
      confirmLoading: false
    }
  },
  mounted() {
    console.log('Component mounted.', this.showFooter)
  },
  methods: {
    // 打开抽屉
    open() {
      this.visible = true
    },

    // 关闭抽屉（外部调用 / 取消）
    close() {
      this.visible = false
    },

    // 确认操作
    async handleConfirm(payload) {
      this.confirmLoading = true
      try {
        if (this.resolve) {
          await this.resolve(payload)
        }
        this.visible = false
      } catch (err) {
        // 业务层可在 resolve 中 throw 来阻止关闭
        console.warn('[GlobalDrawer] confirm error:', err)
      } finally {
        this.confirmLoading = false
      }
    },

    // el-drawer before-close 钩子
    handleBeforeClose(done) {
      if (typeof this.beforeClose === 'function') {
        const result = this.beforeClose(done)
        // 支持返回 Promise
        if (result && typeof result.then === 'function') {
          result.then(() => done()).catch(() => {})
        }
      } else {
        done()
      }
    },

    // 动画关闭完成后销毁实例
    handleClosed() {
      if (this.reject) {
        this.reject('closed')
      }
      // 延迟销毁，确保动画结束
      this.$nextTick(() => {
        this.$destroy()
        if (this.$el && this.$el.parentNode) {
          this.$el.parentNode.removeChild(this.$el)
        }
      })
    }
  }
}
</script>

<style scoped>
.drawer-default-content {
  padding: 20px;
}

.drawer-footer {
  padding: 12px 20px;
  text-align: right;
  border-top: 1px solid #ebeef5;
}
</style>
