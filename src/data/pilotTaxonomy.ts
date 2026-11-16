/**
 * P1 三层导航模型：场景（scene）-> 主题（topic）-> 细分（subcategory）。
 *
 * 细分归属按“主题 + 条目名”显式登记，避免关键词猜测导致误分；
 * 新增条目未登记时会落到“其他”，可在同一主题内直接补充名单。
 */

export interface SceneDefinition {
  key: string
  name: string
  description: string
  topics: string[]
}

/** 首页场景顺序；主题顺序也由 scenes[].topics 决定。 */
export const SCENES: SceneDefinition[] = [
  { key: 'ai', name: 'AI 助手与模型', description: '对话、编程智能体与模型服务', topics: ['智能体', '大模型'] },
  { key: 'dev', name: 'AI 开发与基础设施', description: 'API、MCP、框架与官方文档', topics: ['开发者平台', 'MCP', '官方技术'] },
  { key: 'design', name: '设计与内容创作', description: '界面设计、图像视频与文档', topics: ['UI设计', '图片处理', '文档处理'] },
  { key: 'work', name: '效率与资源', description: '工具、网盘与云服务', topics: ['工具', '网盘', '云服务'] },
  { key: 'learn', name: '学习与社区', description: '博客、社区、研究与课程', topics: ['技术博客', '社区论坛', '研究机构', '培训/课程/机构'] },
]

export const TOPIC_ORDER: string[] = SCENES.reduce<string[]>((list, scene) => list.concat(scene.topics), [])

export const SCENE_BY_TOPIC: Record<string, string> = SCENES.reduce<Record<string, string>>(
  (map, scene) => {
    scene.topics.forEach((topic) => {
      map[topic] = scene.key
    })
    return map
  },
  {}
)

/** 每个主题的细分顺序与条目名单（名单用 | 分隔，便于逐行审阅）。 */
const SUBCATEGORY_NAMES: Record<string, Array<[string, string]>> = {
  '智能体': [
    ['通用助手', '千问|千问创作|Copilot|Merlin|monica|商汤小浣熊|海螺AI|Mike|Cue|Pi|Sesame|Genspark|库库AI|Marvis|Upstage Studio|air|Freebuff|AutoGPT|jenius|JoyAgent|ManusApp|ManusWeb'],
    ['编程智能体', 'qodo(原Codium)|devin|zcode|opencode|通义灵码|traeCN|cursor|pygma|replit|warp|notebook|文心快码|v0.dev|mulerun|pear|trae|kiro|Cline|kilo|openclaw|Letta Code|hermes-agent|Lovable|Command Code|omp|Qoder Agent|cecli|goose|Open Interpreter|Amp|Vibecode|Wabi|Junie|JoyCode|genie|askcodi|codebuddy'],
    ['低代码与工作流', 'Coze大陆|Coze国际|扣子空间|Dify|AutoGPT Platform'],
    ['技能与插件市场', 'skills|skillmarket|clawhub|虾评Skill|aiagentstore'],
    ['办公与效率', 'workbuddy|traeworkCN|workbuddyAI|traework|skywork'],
  ],
  '研究机构': [
    ['咨询与智库', '艾瑞咨询|Gartner'],
    ['学术与研究', 'tenten|x-mol学术'],
  ],
  '技术博客': [
    ['大厂工程博客', 'AWS|Google Cloud|IBM|Oracle|cloudflare|confluent|google Blog|insideJava|jetbrains|linkedin-blog|netflix-blog|uber-blog|Facebook-blog|Airbnb-Blog|Reddit-Blog|Nvidia-Blog|Google SRE|alizila|京东高工|美团|淘宝Nginx|有赞|得物技术|thoughtworks'],
    ['个人与团队博客', 'coderbee笔记|foojay|soebes|jrebel|orkes|Kislay’s Blog|angiejones-blog|birgitta开发者|chrisrichardson|glaforge-blog|horstmann blog|javadoop|mitchellh|welm blog|产品经理的无限游戏|宝玉|程序员-四火|酷壳|阮一峰|金甲虫的博客|爱思|cloudairy-blog|catpaw'],
    ['AI 研究与资讯', 'Agentic Index|AutoClaw资讯|Letta|Stategram|Superintelligence News|Tim Dettmers|Turing Post|VentureBeat|Augment Blog|huggingface-BLOG|langchain-blog|lilianweng|matt skills|sebastianraschka blog|simonwillison blog|traeBlog|深度学习笔记|量子位'],
    ['技术媒体', 'InfoQ|Infoq-CN|QCon|medium|devpress|移动支付网|IThome|VS Magazine|Dzone|opensource|secon|theregister|Quastor'],
    ['教程与文档', 'MS Learn Blog|Programming Books|baeldung|geeksforgeeks|stackoverflow-blog|脚本之家|bugsjava|ShardingSphere|Linux内核源码|MQTT技术指南|深入高可用系统原理与设计'],
  ],
  '文档处理': [
    ['PDF 工具', 'iLovePDF|轻闪PDF|Scribd'],
    ['AI 文档与表格', 'AI-Sheets|AtomStorm|乐享知识库'],
  ],
  '网盘': [
    ['个人网盘', '百度网盘|Google网盘|腾讯网盘'],
    ['资源分享', '学霸盘|网盘分享'],
  ],
  '图片处理': [
    ['在线编辑', '图片去水印|网页图片提取|九宫格切图|ASPOSE图片拼接|高级图片编辑器|Cutout.Pro|iLoveIMG|水印云'],
    ['格式转换', 'convertio|svg2png'],
    ['素材库', 'worldvectorlogo|SVG Repo|seeklogo|seekvectorlogo'],
    ['AI 生成与视频', 'PixVerse|LibTV|即梦AI|可灵AI|可灵|runway|RunningHub'],
  ],
  '大模型': [
    ['通用对话', 'ChatGPT|Claude|Gemini|Grok|Kimi|MiniMax|minimax-ai.chat|Poe|Qwen|Z.ai|Character AI|deepseek|mistral|Liquid AI|书生·浦语|商量|天工|夸克AI|智谱清言|混元|百小医|百小应|百度文心|腾讯元宝|讯飞星火|豆包|阶跃AI|G4F Chat'],
    ['模型平台与部署', 'AI Studio|Cerebras|LM Studio|OpenAI官网|TypeSafe AI|anythingllm|arena-ai|lmarena|nocode|ollama|skillhub|zhipu API|千帆|阿里云百炼|阶跃语音体验中心'],
    ['搜索与研究', 'perplexity|zread|知乎直答|秘塔搜索|纳米AI'],
  ],
  '开发者平台': [
    ['云厂商与模型 API', '火山引擎|火山方舟|硅基流动|阿里云任务中心|腾讯云 TI 平台|讯飞开放平台|NVIDIA Build|GroqCloud|Cohere 平台|微元算力|IteraCompute|地心网络|Agnes API 平台|Agnes API 平台（国际站）|Gemini Enterprise Agent Platform|阿里瓴羊|百度云Skills'],
    ['模型路由与 API 额度', 'Any Router|Taotoken|Requesty|OrcaRouter|Token Harbor|FreeAIapikey|ChatAnywhere|onomeo|肖恩AI|红狐hub|Magpie|腾讯云 TokenHub|Kimi官网|Kimi平台'],
    ['应用与数据平台', 'CAMEL-AI|Hugging Face|huggingface-spaces|Mem0|知乎数据开放平台|Intuned|ngrok|高德开放平台|Mintlify|Alpha Vantage|box by Simular|Particle|crewai|vellum|rivet|codesandbox|uniapp开发平台|brave|Emergent AI|humain沙特AI|bigmodel'],
  ],
  'UI设计': [
    ['设计工具', 'figma|excalidraw画图|whimsical画图|processon|uiboy|TDesign|comflowy|Canva'],
    ['模板与素材', 'PPT世界|优设|PPT emoji|稿定|微设资源库|花瓣网|onepagelove|爱给|one-model'],
    ['AI 演示', 'Mind Show|chatppt|AiPPT'],
  ],
  '培训/课程/机构': [
    ['在线课程', '极客时间|udemy|educative|高等教育课程平台|乐学编程课堂|优库IT资源|IT全学科自学|慕课网'],
    ['面试与技能', 'enjoyalgorithms|designgurus|greatfrontend'],
  ],
  '云服务': [
    ['云主机与存储', 'CloudFlare|腾讯云对象存储COS|Ucloud优刻得|almirant|InstaBox'],
    ['域名与办公', '阿里云域名|Google Workspace'],
  ],
  '工具': [
    ['开发辅助', 'plantUML|文本差异对比|爬虫自动脚本生成|YAML格式校验|图解网络协议|知识图谱生成|Nginx配置生成|Java反向工程网|GitHub Proxy|Github trend|gceasy|Zed|mermaidchart|boardmix|幕布|Mind Maps|multiplayer|devv|JetBrains|tavily|serpapi|Bark-Voice-Cloning|阿里开源群|国外身份信息生成'],
    ['电子书与文档', 'z-lib.gd|ZLib免费电子书|电子书格式转换|码农书籍网|书栈网|编程电子书|电子书下载大全|安娜的档案|Markdown 教程|示说|52Doc|思维导图模板下载'],
    ['软件与资源', 'Chrome 应用商店|小众软件|Win软件干货网|PC软件工具网|Mac软件工具网|MAC萌新网|macz|MAC中文|A姐分享|免翻墙下载链接|webcatalog|IT之家|DETools'],
    ['效率与办公', '帮小忙|易转换|mdnice|沉浸式翻译|通义听悟|openwrite|点金工具箱|易媒助手|转换工具网'],
    ['运营与数据', '抖音工具包|小红书工具包|视频号工具包|批量下载抖音|油管Dubbing|八爪鱼|similarweb|汇通财经|TheirStack|TGStat|charlielabs'],
    ['榜单与目录', 'AI产品榜|AI工具集录|AI Base|AIHub|模力工场|producthunt|artificialanalysis|SkillsLLM|seektool|kaggle|theinsaneapp'],
  ],
  'MCP': [
    ['MCP 平台与市场', '腾讯MCP集|MCP集仓库|MCP'],
    ['能力接入', '阶跃AI-skill'],
  ],
  '社区论坛': [
    ['开发者社区', 'CSDN|51CTO|v2ex|stackoverflow|oschina开源中国|博客园|SegmentFault|掘金|DEV Community|牛客网|HeapDump|linux.do|墨天轮|daily.dev|智源社区|cursor社区|GitHub|能力市场|sdk|ModelScope|ModelScope个人中心|吾爱破解'],
    ['云厂商社区', '华为云|腾讯云开发者|阿里云开发者'],
    ['内容与社交', 'bilibili|抖音|TikTok|微博|小红书|知乎|公众号|网易号|头条号|百家号|搜狐号|简书|linkedin|Twitter|telegram|discord|reddit|spotify|MAC爱范|知识星球|脉脉|腾讯内容开放平台'],
    ['活动与分享', 'slideshare|speakerdeck|小报童|substack|云栖大会|先知社区|全球产品经理|飞行社'],
    ['AI 社区', 'Open Agents|Agentic AI Foundation'],
  ],
  '官方技术': [
    ['语言、框架与开源', 'OpenJDK官网|SPRING 中文网|SpringCloudAlibaba|dubbo|React|PyTorch|阿里巴巴开源|atomgit|长安链'],
    ['数据库与中间件', 'MySQL|Redis|clickhouse|Hive官网|Spark2.2中文文档|RocketMQ中文|rabbitmq|elastic|DolphinScheduler|dynamic-tp|Nginx社区|即时通讯网|fastthread|淘宝数据库内核'],
    ['云平台与运维', '云原生社区官网|VMWare文档|Red-hat文档|SUSE Blog|阿里云文档|阿里云国际'],
    ['AI 与厂商文档', 'Anthropic-News|Google DeepMind Blog|Google AI|Google AI for Developers|Meta|LangChain|AgentScope|AgentScope学习指南|AGI掘金知识库|智谱AI教程|Poolside|greptile|llmstxt|AI Agent 2025|Ray|微软|Postman'],
  ],
}

export const SUBCATEGORY_ORDER: Record<string, string[]> = Object.keys(SUBCATEGORY_NAMES).reduce<
  Record<string, string[]>
>((map, topic) => {
  map[topic] = SUBCATEGORY_NAMES[topic].map(([name]) => name)
  return map
}, {})

const INDEX: Record<string, Record<string, string>> = Object.keys(SUBCATEGORY_NAMES).reduce<
  Record<string, Record<string, string>>
>((map, topic) => {
  const byName: Record<string, string> = {}
  SUBCATEGORY_NAMES[topic].forEach(([subcategory, names]) => {
    names.split('|').forEach((name) => {
      byName[name] = subcategory
    })
  })
  map[topic] = byName
  return map
}, {})

export const OTHER_SUBCATEGORY = '其他'

/** 未登记的条目返回“其他”，不会丢数据。 */
export function subcategoryOf(topic: string, name: string): string {
  return INDEX[topic]?.[name] || OTHER_SUBCATEGORY
}
