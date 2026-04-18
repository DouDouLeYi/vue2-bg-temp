// ─────────────────────────────────────────
// UserForm.vue — 抽屉内的业务组件示例
// ─────────────────────────────────────────
<template>
  <div style="padding: 20px">
    <el-form ref="formRef" :model="ruleForm"  label-width="100px" class="demo-ruleForm" >
<!--      <BaseComponent  :span="24" prop="date16">
        <el-date-picker v-model="ruleForm.date16" type="date" placeholder="选择日期" style="width: 100%;" />
      </BaseComponent>-->
      <TRDate v-model="ruleForm.date16" label="活动时间1" id="date16" :rules="rules.date16" :test="true"/>
      <TRDate v-model="ruleForm.date17" label="活动时间2" id="date17" :rules="rules.date17"/>
      <!-- 活动时间特殊处理 -->
<!--      <el-form-item label="活动时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker v-model="ruleForm.date1" type="date" placeholder="选择日期" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker v-model="ruleForm.date2" placeholder="选择时间" style="width: 100%;" />
          </el-form-item>
        </el-col>
      </el-form-item>

      &lt;!&ndash; 循环渲染其他表单项 &ndash;&gt;
      <el-form-item
        v-for="item in formItems"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
      >
        &lt;!&ndash; 输入框 &ndash;&gt;
        <el-input
          v-if="item.type === 'input'"
          v-model="ruleForm[item.prop]"
          :placeholder="item.placeholder"
          :type="item.inputType || 'text'"
        />

        &lt;!&ndash; 选择器 &ndash;&gt;
        <el-select
          v-else-if="item.type === 'select'"
          v-model="ruleForm[item.prop]"
          :placeholder="item.placeholder"
        >
          <el-option
            v-for="option in item.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>

        &lt;!&ndash; 开关 &ndash;&gt;
        <el-switch
          v-else-if="item.type === 'switch'"
          v-model="ruleForm[item.prop]"
        />

        &lt;!&ndash; 复选框组 &ndash;&gt;
        <el-checkbox-group
          v-else-if="item.type === 'checkbox-group'"
          v-model="ruleForm[item.prop]"
        >
          <el-checkbox
            v-for="option in item.options"
            :key="option.value"
            :label="option.value"
            :name="item.prop"
          >{{ option.label }}</el-checkbox>
        </el-checkbox-group>

        &lt;!&ndash; 单选框组 &ndash;&gt;
        <el-radio-group
          v-else-if="item.type === 'radio-group'"
          v-model="ruleForm[item.prop]"
        >
          <el-radio
            v-for="option in item.options"
            :key="option.value"
            :label="option.value"
          >{{ option.label }}</el-radio>
        </el-radio-group>
      </el-form-item>-->

      <!-- 按钮区域 -->
      <div style="text-align: center">
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button @click="resetForm">重置</el-button>
        <TRButton :formRef="$refs.formRef"/>
<!--        <div id="app" @click="showSimple">点击简单提示</div>-->
      </div>
    </el-form>
  </div>
</template>

<script>
import { TRButton, BaseComponent, TRDate } from '@/views/SchemaRender/assembly'


export default {
  name: 'UserForm',
  components: { TRDate, BaseComponent, TRButton },
  props: {
    userId: Number // 由 componentProps 传入
  },
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        date16: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        date16: [
          { required: true, message: '请选择活动时间', trigger: 'change' }
        ],
        date17: [
          { required: true, message: '请选择活动时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'change' }
        ]
      },
      // 表单项配置
      formItems: [
        {
          prop: 'name',
          label: '活动名称',
          type: 'input',
          placeholder: '请输入活动名称'
        },
        {
          prop: 'region',
          label: '活动区域',
          type: 'select',
          placeholder: '请选择活动区域',
          options: [
            { label: '区域一', value: 'shanghai' },
            { label: '区域二', value: 'beijing' }
          ]
        },
        {
          prop: 'delivery',
          label: '即时配送',
          type: 'switch'
        },
        {
          prop: 'type',
          label: '活动性质',
          type: 'checkbox-group',
          options: [
            { label: '美食/餐厅线上活动', value: '美食/餐厅线上活动' },
            { label: '地推活动', value: '地推活动' },
            { label: '线下主题活动', value: '线下主题活动' },
            { label: '单纯品牌曝光', value: '单纯品牌曝光' }
          ]
        },
        {
          prop: 'resource',
          label: '特殊资源',
          type: 'radio-group',
          options: [
            { label: '线上品牌商赞助', value: '线上品牌商赞助' },
            { label: '线下场地免费', value: '线下场地免费' }
          ]
        },
        {
          prop: 'desc',
          label: '活动形式',
          type: 'input',
          inputType: 'textarea',
          placeholder: '请填写活动形式'
        }
      ]
    }
  },
  created() {
    if (this.userId) this.fetchUser()
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
          this.$emit('confirm', this.ruleForm)
          console.log('表单提交成功:', this.ruleForm)
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
