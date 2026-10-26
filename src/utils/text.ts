/**
 * 文本处理工具
 * 去除 HTML 标签并压缩空白，返回纯文本。供列表摘要 / 卡片预览复用，
 * 取代各组件中散落的内联 HTML 清洗正则（此前在
 * article-interview.vue 模板中出现两处重复）。
 */

/**
 * 去除 HTML 标签、回车、换行与多余空白，返回纯文本。
 * 另清理截断产生的残缺标签头（如 `<imgstyle="width:18px...`，牛客表情
 * 图标在入库截断后留下无 `>` 闭合的片段，普通标签正则匹配不到）。
 * @param html 原始 HTML 字符串
 * @returns 清洗后的纯文本
 */
export function stripHtml(html?: string | null): string {
  if (!html) return ''
  return String(html)
    .replace(/<\/?[a-zA-Z][^>]*>/g, '')
    .replace(/<[a-zA-Z][^>]*$/g, '')
    .replace(/\r|\n|\s*/g, '')
}
