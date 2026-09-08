module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    // TypeScript：只做类型剥离（babel 单文件转译），不引入 ts-loader / fork-ts-checker。
    // 类型检查交由独立的 `npm run type-check` 执行，因此 dev/build 都不会因类型错误中断。
    // allExtensions:true 让 preset 对 .vue 脚本块（文件名以 .vue 结尾，默认按扩展名不匹配）
    // 与 .js 文件同样剥离类型；isTSX:false 关闭 JSX 解析，确保 .js 中的 < 比较运算符不被误判。
    ['@babel/preset-typescript', { allExtensions: true, isTSX: false, allowDeclareFields: true }]
  ]
}
