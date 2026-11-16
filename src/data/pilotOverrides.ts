/**
 * P0 前端数据兜底。
 *
 * 线上 pilot 表仍是旧数据：分类错放、2 条乱码、1 条空链接、个人后台入口混入
 * 公共分类、少量链接已失效。后端修正数据前，先在读取层做一次可审计的归一化，
 * 避免把脏数据直接摊到首页。后端修完后，删除本文件并把 pilot.vue 的
 * normalizePilotList 调用去掉即可。
 */

/** 首页分类展示顺序；未知分类会追加到末尾。 */
export const CATEGORY_ORDER = [
  '智能体',
  '研究机构',
  '技术博客',
  '文档处理',
  '网盘',
  '图片处理',
  '大模型',
  '开发者平台',
  'UI设计',
  '培训/课程/机构',
  '云服务',
  '工具',
  'MCP',
  '社区论坛',
  '官方技术',
]

/** 后端入库编码错误，前端显式兜底（不要只依赖 fixMojibakeName 的启发式）。 */
export const NAME_FIXES: Record<string, string> = {
  'æµ·èžºAI': '海螺AI',
  'é‡åä½': '量子位',
}

/** 已确认失效、但有可用替代地址的链接。 */
export const LINK_FIXES: Record<string, string> = {
  'https://cangsdarm.github.io/illustrate/quic': 'https://cangsdarm.github.io/illustrate/',
  'https://dolphinscheduler.apache.org/zh-cn': 'https://dolphinscheduler.apache.org/',
}

/**
 * P0 直接隐藏的条目：
 * - Gmail 收件箱是个人入口，不应出现在公共导航；
 * - Dify 在“智能体”已有入口，技术博客下的是官网首页重复项；
 * - TODO 的 link 为空。
 */
export const HIDDEN_LINKS = new Set<string>([
  'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox',
  'https://dify.ai/',
])

/**
 * 飞书这条实际指向一个掘金个人主页（链接与名称不符），
 * 且掘金已有公共入口，直接隐藏避免误导。
 */
export const HIDDEN_NAMES = new Set<string>(['TODO', 'Gmail', '飞书'])

/**
 * 已确认错放的链接，以 link 为 key，避免名称大小写/乱码变化导致匹配失效。
 */
export const MOVES: Record<string, string> = {
  'https://ollama.com/': '大模型',
  'https://anythingllm.com/': '大模型',
  'https://work.trae.cn/': '智能体',
  'https://www.codebuddy.cn/work/': '智能体',
  'https://genie.codebuddy.ai/': '智能体',
  'https://www.workbuddy.ai/app': '智能体',
  'https://app.uiboy.com/': 'UI设计',
  'https://www.processon.com/login': 'UI设计',
  'https://chromewebstore.google.com/': '工具',
  // soft.ithome.com 是软件下载站，不是资讯博客（P1 修正）。
  'https://soft.ithome.com/': '工具',
  'https://www.ithome.com.tw/news': '技术博客',
  'https://www.jenius.cn/chat': '智能体',
  'https://seektool.ai/': '工具',
  'https://www.x-mol.com/': '研究机构',
  'https://www.canva.com/': 'UI设计',
  'https://jimeng.jianying.com/ai-tool/home/': '图片处理',
  'https://klingai.com/': '图片处理',
  'https://kling.ai': '图片处理',
  'https://chat.stepfun.com/chats/new': '大模型',
  'https://www.stepfun.com/studio/audio?tab=speech-recognition': '大模型',
  'https://llmstxt.org/': '官方技术',
  'https://pai.video/': '图片处理',
  'https://www.liblib.tv/': '图片处理',
  'https://z-lib.gd/': '工具',
  'https://skills.sh/': '智能体',
  'https://skillmarket.space/': '智能体',
  'https://clawhub.ai/': '智能体',
}

/** 链接不稳定或带长参数、但名称稳定的条目，用名称兜底。 */
export const MOVE_BY_NAME: Record<string, string> = {
  IT全学科自学: '培训/课程/机构',
  乐享知识库: '文档处理',
  // P1：AI 平台/框架归入开发者平台
  'Hugging Face': '开发者平台',
  crewai: '开发者平台',
  vellum: '开发者平台',
  rivet: '开发者平台',
  codesandbox: '开发者平台',
  'Gemini Enterprise Agent Platform': '开发者平台',
  brave: '开发者平台',
  'Emergent AI': '开发者平台',
  humain沙特AI: '开发者平台',
  bigmodel: '开发者平台',
  阿里瓴羊: '开发者平台',
  百度云Skills: '开发者平台',
  // P1：智能体/办公类归入智能体
  ManusApp: '智能体',
  ManusWeb: '智能体',
  aiagentstore: '智能体',
  askcodi: '智能体',
  codebuddy: '智能体',
  skywork: '智能体',
  traework: '智能体',
  // P1：图像/视频与素材
  runway: '图片处理',
  水印云: '图片处理',
  RunningHub: '图片处理',
  seeklogo: '图片处理',
  seekvectorlogo: '图片处理',
  // P1：工具与资源
  DETools: '工具',
  JetBrains: '工具',
  devv: '工具',
  theinsaneapp: '工具',
  // P1：官方文档与厂商博客
  微软: '官方技术',
  Postman: '官方技术',
  阿里云国际: '官方技术',
  // P1：技术媒体/博客
  InfoQ: '技术博客',
  'Infoq-CN': '技术博客',
  QCon: '技术博客',
  medium: '技术博客',
  移动支付网: '技术博客',
  devpress: '技术博客',
  Quastor: '技术博客',
  theregister: '技术博客',
  // P1：社区与课程
  slideshare: '社区论坛',
  先知社区: '社区论坛',
  云栖大会: '社区论坛',
  substack: '社区论坛',
  飞行社: '社区论坛',
  全球产品经理: '社区论坛',
  极客时间: '培训/课程/机构',
  educative: '培训/课程/机构',
  enjoyalgorithms: '培训/课程/机构',
  designgurus: '培训/课程/机构',
  greatfrontend: '培训/课程/机构',
  慕课网: '培训/课程/机构',
}

/** 搜索别名：解决“中文名搜不到英文名/拼音”的问题。key 一律小写。 */
export const SEARCH_ALIASES: Record<string, string[]> = {
  千问: ['qwen', '通义', 'tongyi'],
  qwen: ['千问', '通义', 'tongyi'],
  kimi: ['moonshot', '月之暗面'],
  豆包: ['doubao'],
  腾讯元宝: ['yuanbao'],
  智谱清言: ['glm', 'zhipu', '智谱'],
  文心快码: ['comate', 'baidu'],
  海螺ai: ['hailuo', 'minimax'],
  量子位: ['qbitai'],
  即梦ai: ['jimeng'],
  可灵ai: ['kling'],
  可灵: ['kling'],
  通义灵码: ['lingma', 'tongyi'],
  商汤小浣熊: ['sensetime', 'sensechat'],
  deepseek: ['深度求索'],
  cursor: ['ai ide', '编程'],
  trae: ['字节', '编程'],
  claude: ['anthropic'],
  chatgpt: ['openai'],
  gemini: ['google'],
}
