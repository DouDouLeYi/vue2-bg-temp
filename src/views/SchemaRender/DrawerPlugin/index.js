import Vue from 'vue'
import DrawerComponent from './index.vue'

/**
 * 函数式调用 Drawer
 *
 * 用法一：普通调用
 *   import { openDrawer } from '@/components/GlobalDrawer'
 *   openDrawer({ title: '详情', component: MyForm, componentProps: { id: 1 } })
 *
 * 用法二：Promise 模式（等待确认/取消结果）
 *   const result = await openDrawer({ title: '编辑', component: MyForm, showFooter: true })
 *
 * 用法三：挂载到 Vue 原型（在 main.js 中注册后）
 *   this.$drawer({ title: '设置', component: SettingPanel })
 *
 * @param {Object} options - 配置项（同 GlobalDrawer props）
 * @returns {Promise}
 */
function openDrawer(options = {}) {
  return new Promise((resolve, reject) => {
    // 1. 用 Vue.extend 创建构造器
    const DrawerConstructor = Vue.extend(DrawerComponent)

    // 2. 实例化，传入 propsData
    const instance = new DrawerConstructor({
      propsData: {
        ...options,
        eId: 'drawer-container-' + Date.now(),
        resolve,
        reject
      }
    })

    // 3. 挂载到临时 DOM
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    instance.$mount(mountNode)
    // 4. 打开抽屉
    instance.open()
  })
}

/**
 * 安装插件，挂载到 Vue.prototype
 * 在 main.js 中: Vue.use(DrawerPlugin)
 */
const DrawerPlugin = {
  install(Vue) {
    Vue.prototype.$drawer = openDrawer
  }
}

export { openDrawer, DrawerPlugin }
export default DrawerPlugin
