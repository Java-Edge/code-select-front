// Element Plus 按需引入（手动深引入，避免全量注册导致的体积膨胀）
// 仅注册模板实际使用的 9 个组件；ElMessage / ElMessageBox 为 JS 运行时 API，单独深引入。
// 各 style/css 自动拉取 base 与自身依赖：
//   select    → input / tag / option / option-group / scrollbar / popper
//   cascader   → input / popper / tag / cascader-panel
//   form-item  → form 不自动拉取，需单独引入
import ElIcon from 'element-plus/es/components/icon'
import ElInput from 'element-plus/es/components/input'
import ElButton from 'element-plus/es/components/button'
import ElCascader from 'element-plus/es/components/cascader'
import ElPagination from 'element-plus/es/components/pagination'
import { ElForm, ElFormItem } from 'element-plus/es/components/form'
import { ElSelect, ElOption } from 'element-plus/es/components/select'

// 组件样式（按使用面引入，依赖由各自 style/css 自动解析）
import 'element-plus/es/components/icon/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/cascader/style/css'
import 'element-plus/es/components/pagination/style/css'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'
// ElMessage / ElMessageBox 运行时弹层所需样式
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'

const ElementPlusComponents = [
  ElIcon,
  ElInput,
  ElButton,
  ElCascader,
  ElPagination,
  ElForm,
  ElFormItem,
  ElSelect,
  ElOption,
]

export default app => {
  ElementPlusComponents.forEach(component => {
    app.component(component.name, component)
  })
}
