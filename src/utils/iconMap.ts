const SIMPLE_ICONS_CDN = 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons';

/**
 * svgrepo.com 有防盗链(返回403)，浏览器无法直接加载。
 * 将其图标 URL 映射为 jsdelivr CDN 上的 simple-icons（无防盗链）。
 * 值为空字符串表示无对应品牌图标，回退到本地默认图标。
 */
const SVGREPO_ICON_MAP: Record<string, string> = {
  // 技术博客
  'https://www.svgrepo.com/show/353443/aws.svg': `${SIMPLE_ICONS_CDN}/amazonwebservices.svg`,
  'https://www.svgrepo.com/show/185785/blog.svg': '', // 京东高工/宝玉 - 通用博客图标，回退本地默认
  'https://www.svgrepo.com/show/452062/microsoft.svg': `${SIMPLE_ICONS_CDN}/microsoft.svg`,
  'https://www.svgrepo.com/show/354152/oracle.svg': `${SIMPLE_ICONS_CDN}/oracle.svg`,
  'https://www.svgrepo.com/show/353894/ibm.svg': `${SIMPLE_ICONS_CDN}/ibm.svg`,
  'https://www.svgrepo.com/show/353812/google-gmail.svg': `${SIMPLE_ICONS_CDN}/gmail.svg`,
  'https://www.svgrepo.com/show/349541/uber.svg': `${SIMPLE_ICONS_CDN}/uber.svg`,
  'https://www.svgrepo.com/show/448224/facebook.svg': `${SIMPLE_ICONS_CDN}/facebook.svg`,
  // 图片处理
  'https://www.svgrepo.com/logo.svg': '', // SVG Repo 站点自身 logo，回退本地默认
  // UI设计
  'https://www.svgrepo.com/show/448222/figma.svg': `${SIMPLE_ICONS_CDN}/figma.svg`,
  // 云服务
  'https://www.svgrepo.com/show/353564/cloudflare.svg': `${SIMPLE_ICONS_CDN}/cloudflare.svg`,
  'https://www.svgrepo.com/show/332219/aliyun.svg': `${SIMPLE_ICONS_CDN}/alibabacloud.svg`,
  // 社区论坛
  'https://www.svgrepo.com/show/354386/stackoverflow-icon.svg': `${SIMPLE_ICONS_CDN}/stackoverflow.svg`,
  'https://www.svgrepo.com/show/303260/tiktok-logo-logo.svg': `${SIMPLE_ICONS_CDN}/tiktok.svg`,
  'https://www.svgrepo.com/show/349436/linkedin.svg': `${SIMPLE_ICONS_CDN}/linkedin.svg`,
  'https://www.svgrepo.com/show/303443/sina-weibo-1-logo.svg': `${SIMPLE_ICONS_CDN}/sinaweibo.svg`,
  'https://www.svgrepo.com/show/452115/telegram.svg': `${SIMPLE_ICONS_CDN}/telegram.svg`,
  'https://www.svgrepo.com/show/475689/twitter-color.svg': `${SIMPLE_ICONS_CDN}/x.svg`,
  'https://www.svgrepo.com/show/475684/spotify-color.svg': `${SIMPLE_ICONS_CDN}/spotify.svg`,
  'https://www.svgrepo.com/show/452094/reddit.svg': `${SIMPLE_ICONS_CDN}/reddit.svg`,
  'https://www.svgrepo.com/show/353655/discord-icon.svg': `${SIMPLE_ICONS_CDN}/discord.svg`,
  // 官方技术
  'https://www.svgrepo.com/show/373848/mysql.svg': `${SIMPLE_ICONS_CDN}/mysql.svg`,
  'https://www.svgrepo.com/show/355193/redhat.svg': `${SIMPLE_ICONS_CDN}/redhat.svg`,
};

/**
 * 非 svgrepo 的已知失败 URL 替换（403/404/超时等）。
 * 值为空字符串表示无替代源，回退到本地默认图标。
 */
const FAILED_URL_MAP: Record<string, string> = {
  'https://opencode.ai/docs/_astro/logo-dark.DOStV66V.svg': `${SIMPLE_ICONS_CDN}/opencode.svg`,
  'https://junie.jetbrains.com/favicon.ico': `${SIMPLE_ICONS_CDN}/jetbrains.svg`,
  'https://seekvectorlogo.com/wp-content/uploads/2019/02/jrebel-vector-logo-small.png': `${SIMPLE_ICONS_CDN}/perforce.svg`,
  'https://brandlogos.net/wp-content/uploads/2025/02/deepseek_logo_icon-logo_brandlogos.net_s5bgc-512x389.png': `${SIMPLE_ICONS_CDN}/deepseek.svg`,
  'https://www.infoq.com//favicon.ico': `${SIMPLE_ICONS_CDN}/infoq.svg`,
  'https://allvectorlogo.com/img/2019/05/infoq-logo.png': `${SIMPLE_ICONS_CDN}/infoq.svg`,
  'https://xz.aliyun.com/favicon.ico': `${SIMPLE_ICONS_CDN}/alibabacloud.svg`,
  'https://www.vibecodeapp.com/favicon.ico': 'https://www.vibecodeapp.com/icon.png?4f25e4542cbcb521', // 站点实际 icon 路径
};

/**
 * 无 img 条目按名称映射图标（所有 URL 均已验证可访问）。
 * 优先使用 simple-icons CDN（SVG 矢量图），无对应品牌时使用站点 favicon。
 */
const NAME_ICON_MAP: Record<string, string> = {
  // simple-icons 品牌图标
  'warp': `${SIMPLE_ICONS_CDN}/warp.svg`,
  'Google SRE': `${SIMPLE_ICONS_CDN}/google.svg`,
  'google Blog': `${SIMPLE_ICONS_CDN}/google.svg`,
  'mitchellh': `${SIMPLE_ICONS_CDN}/hashicorp.svg`,
  'codesandbox': `${SIMPLE_ICONS_CDN}/codesandbox.svg`,
  'Canva': `${SIMPLE_ICONS_CDN}/canva.svg`,
  'theregister': `${SIMPLE_ICONS_CDN}/theregister.svg`,
  'minimax-ai.chat': `${SIMPLE_ICONS_CDN}/minimax.svg`,
  'Mind Maps': `${SIMPLE_ICONS_CDN}/miro.svg`,
  'Nginx配置生成': `${SIMPLE_ICONS_CDN}/digitalocean.svg`,
  '淘宝Nginx': `${SIMPLE_ICONS_CDN}/nginx.svg`,
  'Bark-Voice-Cloning': `${SIMPLE_ICONS_CDN}/github.svg`,
  'MCP集仓库': `${SIMPLE_ICONS_CDN}/github.svg`,
  'Linux内核源码': `${SIMPLE_ICONS_CDN}/elixir.svg`,
  'welm blog': `${SIMPLE_ICONS_CDN}/wechat.svg`,
  // 站点 favicon（已验证 HTTP 200）
  '阮一峰': 'https://www.ruanyifeng.com/favicon.ico',
  'TDesign': 'https://tdesign.tencent.com/favicon.ico',
  '酷壳': 'https://coolshell.org/favicon.ico',
  '优设': 'https://www.uisdc.com/favicon.ico',
  '小报童': 'https://xiaobot.net/favicon.ico',
  '可灵': 'https://kling.ai/favicon.ico',
  '可灵AI': 'https://klingai.com/favicon.ico',
  '即梦AI': 'https://jimeng.jianying.com/favicon.ico',
  '有赞': 'https://tech.youzan.com/favicon.ico',
  'javadoop': 'https://www.javadoop.com/favicon.ico',
  'AIHub': 'https://www.aihub.cn/favicon.ico',
  'bigmodel': 'https://www.bigmodel.cn/favicon.ico',
  '程序员-四火': 'https://www.raychase.net/favicon.ico',
  'A姐分享': 'https://www.ahhhhfs.com/favicon.ico',
  '码农书籍网': 'https://www.manongbook.com/favicon.ico',
  '易转换': 'https://www.easeconvert.com/favicon.ico',
  '爱给': 'https://www.aigei.com/favicon.ico',
  'x-mol学术': 'https://www.x-mol.com/favicon.ico',
  'Programming Books': 'https://www.programmingbooks.dev/favicon.ico',
  'matt skills': 'https://www.aihero.dev/favicon.ico',
  'chrisrichardson': 'https://www.chrisrichardson.net/favicon.ico',
  'horstmann blog': 'https://horstmann.com/favicon.ico',
  'angiejones-blog': 'https://angiejones.tech/favicon.ico',
  'glaforge-blog': 'https://glaforge.dev/favicon.ico',
  'YAML格式校验': 'https://www.yamllint.com/favicon.ico',
  'webcatalog': 'https://webcatalog.io/favicon.ico',
  'zread': 'https://zread.ai/favicon.ico',
  'skillhub': 'https://skillhub.cn/favicon.ico',
  'askcodi': 'https://askcodi.com/favicon.ico',
  'air': 'https://air.dev/favicon.ico',
  'charlielabs': 'https://charlielabs.ai/favicon.ico',
  'chatppt': 'https://www.chatppt.cn/favicon.ico',
  'greptile': 'https://app.greptile.com/favicon.ico',
  'macz': 'https://www.macz.com/favicon.ico',
  'MAC萌新网': 'https://www.macxin.com/favicon.ico',
  // 第二批：simple-icons 品牌图标
  'traeworkCN': `${SIMPLE_ICONS_CDN}/trae.svg`,
  'traework': `${SIMPLE_ICONS_CDN}/trae.svg`,
  '产品经理的无限游戏': `${SIMPLE_ICONS_CDN}/gitbook.svg`,
  'QCon': `${SIMPLE_ICONS_CDN}/infoq.svg`,
  '图解网络协议': `${SIMPLE_ICONS_CDN}/github.svg`,
  '编程电子书': `${SIMPLE_ICONS_CDN}/github.svg`,
  '高级图片编辑器': `${SIMPLE_ICONS_CDN}/photopea.svg`,
  // 第二批：站点 favicon / 页面 icon（均已验证 HTTP 200）
  '深入高可用系统原理与设计': 'https://www.thebyte.com.cn/assets/favicon.ico',
  'coderbee笔记': 'https://coderbee.cn/favicon.ico',
  'Tim Dettmers': 'https://i0.wp.com/timdettmers.com/wp-content/uploads/2025/12/cropped-profile_2026_400x400.png?fit=32%2C32&ssl=1',
  'IT全学科自学': 'https://shimo.im/favicon.ico',
  'ASPOSE图片拼接': 'https://products.aspose.app/imaging/shared/img/favicon.ico',
  'svg2png': 'https://svgtopng.com/images/favicon.svg',
  'Character AI': 'https://character.ai/favicon.ico',
  '夸克AI': 'https://gw.alicdn.com/imgextra/i3/O1CN018r2tKf28YP7ev0fPF_!!6000000007944-2-tps-48-48.png',
  'aiagentstore': 'https://aiagentstore.ai/logo.png',
  'lmarena': 'https://lmarena.ai/favicon.ico',
  'arena-ai': 'https://arena.ai/favicon.ico',
  '微设资源库': 'https://www.wszyk.cn/wp-content/uploads/2021/12/wszyk_favicon.ico',
  '点金工具箱': 'https://www.feishu.cn/favicon.ico',
  'AI产品榜': 'https://www.feishu.cn/favicon.ico',
  'AI工具集录': 'https://www.feishu.cn/favicon.ico',
  '国外身份信息生成': 'https://haoweichi.com/static/home/img/favicon.ico',
  'Java反向工程网': 'http://javare.cn/favicon.ico',
  'seekvectorlogo': 'https://seekvectorlogo.com/favicon.ico',
  'seeklogo': 'https://seeklogo.com/favicon.ico',
  'mdnice': 'https://editor.mdnice.com/favicon.svg',
  'humain沙特AI': 'https://platform.node.humain.com/favicon.ico',
  'AGI掘金知识库': 'https://www.feishu.cn/favicon.ico',
  'AgentScope学习指南': 'https://www.feishu.cn/favicon.ico',
};

/**
 * 清洗图标 URL：
 * 1. svgrepo.com 防盗链 URL → 替换为可用 CDN 图标或清空
 * 2. 其他已知失败 URL → 替换为可用图标或清空
 * 3. URL 为空时按条目名称查找品牌图标
 */
export function sanitizeIconUrl(url: string, name: string = ''): string {
  if (url) {
    if (url in SVGREPO_ICON_MAP) return SVGREPO_ICON_MAP[url];
    if (url in FAILED_URL_MAP) return FAILED_URL_MAP[url];
    if (url.includes('svgrepo.com')) return '';
    return url;
  }
  // url 为空，按名称查找品牌图标
  if (name && name in NAME_ICON_MAP) return NAME_ICON_MAP[name];
  return '';
}

/**
 * cp1252 特殊字符（0x80-0x9F 字节对应的 Unicode）→ 原始字节值的反向映射。
 * 用于还原被 cp1252 误解码的 UTF-8 字节。
 */
const CP1252_REVERSE_MAP: Record<number, number> = {
  0x20AC: 0x80, // €
  0x201A: 0x82, // ‚
  0x0192: 0x83, // ƒ
  0x201E: 0x84, // „
  0x2026: 0x85, // …
  0x2020: 0x86, // †
  0x2021: 0x87, // ‡
  0x02C6: 0x88, // ˆ
  0x2030: 0x89, // ‰
  0x0160: 0x8A, // Š
  0x2039: 0x8B, // ‹
  0x0152: 0x8C, // Œ
  0x017D: 0x8E, // Ž
  0x2018: 0x91, // '
  0x2019: 0x92, // '
  0x201C: 0x93, // "
  0x201D: 0x94, // "
  0x2022: 0x95, // •
  0x2013: 0x96, // –
  0x2014: 0x97, // —
  0x02DC: 0x98, // ˜
  0x2122: 0x99, // ™
  0x0161: 0x9A, // š
  0x203A: 0x9B, // ›
  0x0153: 0x9C, // œ
  0x017E: 0x9E, // ž
  0x0178: 0x9F, // Ÿ
};

/**
 * 修复 mojibake 名称：UTF-8 字节被误用 cp1252 解码后又重新编码为 UTF-8。
 * 逆向操作：逐字符还原为原始字节序列，再以 UTF-8 严格模式解码。
 * 仅当还原结果包含 CJK 字符时才确认是 mojibake，否则返回原字符串。
 */
export function fixMojibakeName(name: string): string {
  // 已包含 CJK 字符的名称无需修复
  if (/[\u4e00-\u9fff]/.test(name)) return name;
  // 不含 Latin-1 补充区/cp1252 特殊字符的名称不像是 mojibake
  const looksLikeMojibake =
    /[\u00a0-\u00ff]/.test(name) ||
    /[\u0152\u0153\u0178\u017d\u017e\u0160\u0161\u0192\u02c6\u02dc\u2013-\u2026\u2030\u2039\u203a\u20ac\u2122]/.test(name);
  if (!looksLikeMojibake) return name;

  try {
    const bytes = new Uint8Array(name.length);
    for (let i = 0; i < name.length; i++) {
      const code = name.charCodeAt(i);
      if (code < 0x80) {
        bytes[i] = code;
      } else if (code in CP1252_REVERSE_MAP) {
        bytes[i] = CP1252_REVERSE_MAP[code];
      } else if (code >= 0xa0 && code <= 0xff) {
        // Latin-1 可打印区，cp1252 与 latin1 一致
        bytes[i] = code;
      } else if (code >= 0x80 && code <= 0x9f) {
        // C1 控制字符：cp1252 未定义的字节（0x81/0x8D/0x8F/0x90/0x9D）被原样保留
        bytes[i] = code;
      } else {
        // 无法映射的字符（如真正的中文），不是 mojibake
        return name;
      }
    }
    const decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    // 仅当解码结果包含 CJK 字符时才确认是 mojibake
    if (/[\u4e00-\u9fff]/.test(decoded)) return decoded;
    return name;
  } catch {
    return name;
  }
}