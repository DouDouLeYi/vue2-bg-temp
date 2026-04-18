<template>
  <div style="text-align: center">
    <el-button id="app1" @click="showDetail">点击</el-button>
    <br>
    <el-button id="app2" @click="editUser">点击编辑用户</el-button>
    <br>
    <el-button id="app3" @click="openWithGuard">点击危险前二次确认</el-button>
    <br>
    <el-button id="app4" @click="showSimple">点击简单提示</el-button>
  </div>
</template>

<script>
import { openDrawer } from '@/views/SchemaRender/DrawerPlugin'
import PageRender from '@/views/SchemaRender/pageRender.vue'

export default {
  name: 'App',
  methods: {
    showDetail() {
      this.$drawer({
        title: '用户详情',
        size: '90%',
        showFooter: false, // 显示底部确认/取消按钮
        component: PageRender,
        componentProps: { userId: 123, layoutId: '112' }
      })
    },
    // 方式 2：Promise 模式（等待确认结果）
    async editUser() {
      try {
        const formData = await this.$drawer({
          title: '编辑用户',
          size: '600px',
          component: PageRender,
          componentProps: { userId: 456 }
          // showFooter: true // 显示底部确认/取消按钮
        })
        // formData 是 confirm 时传出的 payload
        console.log(formData)
        this.$message.success('保存成功')
      } catch {
        // 用户取消，无需处理
      }
    },
    // 方式 3：关闭前二次确认
    openWithGuard() {
      openDrawer({
        title: '危险操作',
        component: PageRender,
        beforeClose(done) {
          this.$confirm('确认关闭？未保存内容将丢失', '提示', {
            type: 'warning'
          })
            .then(() => done())
            .catch(() => {})
        }
      })
    },
    // 方式 4：不传 component，走默认插槽（适合简单内容）
    // 注意：函数式调用时插槽无法传入，此模式适合组件内直接使用 <global-drawer>
    showSimple() {
      this.$drawer({
        title: '提示',
        size: '360px',
        // 可以把纯展示组件包一层再传入
        component: {
          render(h) {
            return h('div', { style: 'padding:20px' }, '这是一段简单文字内容')
          }
        }
      })
    }
  }
}
</script>
