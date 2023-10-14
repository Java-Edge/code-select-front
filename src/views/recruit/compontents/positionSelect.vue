<template>
  <div
    class="condition-position-select"
    :class="{ open: visable }"
    @mouseenter="changeVisable(true)"
    @mouseleave="changeFatherVisable(false)"
  >
    <div class="current-select">
      <span class="placeholder-text">职业类型</span>
    </div>
    <div
      class="filter-select-dropdown"
      @mouseenter="changeVisable(true, 'child')"
      @mouseleave="changeVisable(false)"
    >
      <ul>
        <li v-for="item in list.data" :key="item.code">
          {{ item.name }}
          <i class="icon-arrow"></i>
        </li>
      </ul>
      <div class="condition-position-detail">
        <span class="condition-position-title">互联网/AI</span>
        <div class="condition-position-grandson">
          <span class="condition-position-label">后端开发</span>
          <div class="condition-position-list">
            <a href="javascript:;" ka="sel-position-100101" class="">Java</a
            ><a href="javascript:;" ka="sel-position-100102" class="">C/C++</a
            ><a href="javascript:;" ka="sel-position-100103" class="">PHP</a
            ><a href="javascript:;" ka="sel-position-100109" class="">Python</a
            ><a href="javascript:;" ka="sel-position-100106" class="">C#</a
            ><a href="javascript:;" ka="sel-position-100107" class="">.NET</a
            ><a href="javascript:;" ka="sel-position-100116" class="">Golang</a
            ><a href="javascript:;" ka="sel-position-100114" class="">Node.js</a
            ><a href="javascript:;" ka="sel-position-100108" class="">Hadoop</a
            ><a href="javascript:;" ka="sel-position-100121" class=""
              >语音/视频/图形开发</a
            ><a href="javascript:;" ka="sel-position-100124" class=""
              >GIS工程师</a
            ><a href="javascript:;" ka="sel-position-100125" class=""
              >区块链工程师</a
            ><a href="javascript:;" ka="sel-position-100123" class=""
              >全栈工程师</a
            ><a href="javascript:;" ka="sel-position-100199" class=""
              >其他后端开发</a
            >
          </div>
        </div>
        <div class="condition-position-grandson">
          <span class="condition-position-label">前端/移动开发</span>
          <div class="condition-position-list">
            <a href="javascript:;" ka="sel-position-100901" class=""
              >前端开发工程师</a
            ><a href="javascript:;" ka="sel-position-100202" class="">Android</a
            ><a href="javascript:;" ka="sel-position-100203" class="">iOS</a
            ><a href="javascript:;" ka="sel-position-100209" class="">U3D</a
            ><a href="javascript:;" ka="sel-position-100211" class="">UE4</a
            ><a href="javascript:;" ka="sel-position-100210" class="">Cocos</a
            ><a href="javascript:;" ka="sel-position-100212" class=""
              >技术美术</a
            ><a href="javascript:;" ka="sel-position-100208" class=""
              >JavaScript</a
            >
          </div>
        </div>
        <div class="condition-position-grandson">
          <span class="condition-position-label">测试</span>
          <div class="condition-position-list">
            <a href="javascript:;" ka="sel-position-100301" class=""
              >测试工程师</a
            ><a href="javascript:;" ka="sel-position-100309" class=""
              >软件测试</a
            ><a href="javascript:;" ka="sel-position-100302" class=""
              >自动化测试</a
            ><a href="javascript:;" ka="sel-position-100303" class=""
              >功能测试</a
            ><a href="javascript:;" ka="sel-position-100305" class=""
              >测试开发</a
            ><a href="javascript:;" ka="sel-position-100308" class=""
              >硬件测试</a
            ><a href="javascript:;" ka="sel-position-100307" class=""
              >游戏测试</a
            ><a href="javascript:;" ka="sel-position-100304" class=""
              >性能测试</a
            ><a href="javascript:;" ka="sel-position-100310" class=""
              >渗透测试</a
            ><a href="javascript:;" ka="sel-position-100306" class=""
              >移动端测试</a
            >
          </div>
        </div>
        <div class="condition-position-grandson">
          <span class="condition-position-label">运维/技术支持</span>
          <div class="condition-position-list">
            <a href="javascript:;" ka="sel-position-100401" class=""
              >运维工程师</a
            ><a href="javascript:;" ka="sel-position-100405" class=""
              >IT技术支持</a
            ><a href="javascript:;" ka="sel-position-100403" class=""
              >网络工程师</a
            ><a href="javascript:;" ka="sel-position-100407" class=""
              >网络安全</a
            ><a href="javascript:;" ka="sel-position-100404" class=""
              >系统工程师</a
            ><a href="javascript:;" ka="sel-position-100402" class=""
              >运维开发工程师</a
            ><a href="javascript:;" ka="sel-position-100406" class=""
              >系统管理员</a
            ><a href="javascript:;" ka="sel-position-100409" class="">DBA</a
            ><a href="javascript:;" ka="sel-position-100408" class=""
              >系统安全</a
            ><a href="javascript:;" ka="sel-position-100410" class=""
              >技术文档工程师</a
            >
          </div>
        </div>
        <div class="condition-position-grandson">
          <span class="condition-position-label">人工智能</span>
          <div class="condition-position-list">
            <a href="javascript:;" ka="sel-position-101306" class="">图像算法</a
            ><a href="javascript:;" ka="sel-position-100117" class=""
              >自然语言处理算法</a
            ><a href="javascript:;" ka="sel-position-101310" class=""
              >大模型算法</a
            ><a href="javascript:;" ka="sel-position-100104" class=""
              >数据挖掘</a
            ><a href="javascript:;" ka="sel-position-101311" class=""
              >规控算法</a
            ><a href="javascript:;" ka="sel-position-101312" class=""
              >SLAM算法</a
            ><a href="javascript:;" ka="sel-position-100118" class=""
              >推荐算法</a
            ><a href="javascript:;" ka="sel-position-100115" class=""
              >搜索算法</a
            ><a href="javascript:;" ka="sel-position-101305" class=""
              >语音算法</a
            ><a href="javascript:;" ka="sel-position-101309" class=""
              >风控算法</a
            ><a href="javascript:;" ka="sel-position-101307" class=""
              >算法研究员</a
            ><a href="javascript:;" ka="sel-position-100120" class=""
              >算法工程师</a
            ><a href="javascript:;" ka="sel-position-101301" class=""
              >机器学习</a
            ><a href="javascript:;" ka="sel-position-101302" class=""
              >深度学习</a
            ><a href="javascript:;" ka="sel-position-101308" class=""
              >自动驾驶系统工程师</a
            ><a href="javascript:;" ka="sel-position-130121" class=""
              >数据标注/AI训练师</a
            >
          </div>
        </div>
        <div class="condition-position-grandson">
          <span class="condition-position-label">销售技术支持</span>
          <div class="condition-position-list">
            <a href="javascript:;" ka="sel-position-101201" class=""
              >售前技术支持</a
            ><a href="javascript:;" ka="sel-position-101202" class=""
              >售后技术支持</a
            ><a href="javascript:;" ka="sel-position-101299" class=""
              >销售技术支持</a
            ><a href="javascript:;" ka="sel-position-160303" class=""
              >客户成功</a
            >
          </div>
        </div>
        <div class="condition-position-grandson">
          <span class="condition-position-label">数据</span>
          <div class="condition-position-list">
            <a href="javascript:;" ka="sel-position-100511" class=""
              >数据分析师</a
            ><a href="javascript:;" ka="sel-position-100508" class=""
              >数据开发</a
            ><a href="javascript:;" ka="sel-position-100507" class=""
              >数据仓库</a
            ><a href="javascript:;" ka="sel-position-100506" class=""
              >ETL工程师</a
            ><a href="javascript:;" ka="sel-position-100104" class=""
              >数据挖掘</a
            ><a href="javascript:;" ka="sel-position-100512" class=""
              >数据架构师</a
            ><a href="javascript:;" ka="sel-position-100514" class=""
              >爬虫工程师</a
            ><a href="javascript:;" ka="sel-position-100122" class=""
              >数据采集</a
            >
          </div>
        </div>
        <div class="condition-position-grandson">
          <span class="condition-position-label">技术项目管理</span>
          <div class="condition-position-list">
            <a href="javascript:;" ka="sel-position-100601" class=""
              >项目经理/主管</a
            ><a href="javascript:;" ka="sel-position-100603" class=""
              >项目助理</a
            ><a href="javascript:;" ka="sel-position-100604" class=""
              >项目专员</a
            ><a href="javascript:;" ka="sel-position-100606" class=""
              >实施工程师</a
            ><a href="javascript:;" ka="sel-position-100605" class=""
              >实施顾问</a
            ><a href="javascript:;" ka="sel-position-100607" class=""
              >需求分析工程师</a
            ><a href="javascript:;" ka="sel-position-100817" class=""
              >硬件项目经理</a
            >
          </div>
        </div>
        <div class="condition-position-grandson">
          <span class="condition-position-label">高端技术职位</span>
          <div class="condition-position-list">
            <a href="javascript:;" ka="sel-position-100701" class="">技术经理</a
            ><a href="javascript:;" ka="sel-position-100704" class="">架构师</a
            ><a href="javascript:;" ka="sel-position-100702" class=""
              >技术总监</a
            ><a href="javascript:;" ka="sel-position-100705" class="">CTO</a
            ><a href="javascript:;" ka="sel-position-100703" class=""
              >测试经理</a
            ><a href="javascript:;" ka="sel-position-100707" class=""
              >技术合伙人</a
            ><a href="javascript:;" ka="sel-position-100706" class=""
              >运维总监</a
            >
          </div>
        </div>
        <div class="condition-position-grandson">
          <span class="condition-position-label">其他技术职位</span>
          <div class="condition-position-list">
            <a href="javascript:;" ka="sel-position-101101" class=""
              >其他技术职位</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const list = reactive({
  data: [
    {
      code: 100000,
      name: "互联网/IT/电子/通信",
      tip: null,
      subLevelModelList: [
        {
          code: 100001,
          name: "电子商务",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100002,
          name: "游戏",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100003,
          name: "媒体",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100004,
          name: "广告营销",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100005,
          name: "数据服务",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100006,
          name: "医疗健康",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100007,
          name: "生活服务",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100008,
          name: "O2O",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100009,
          name: "旅游",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100010,
          name: "分类信息",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100011,
          name: "音乐/视频/阅读",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100012,
          name: "在线教育",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100013,
          name: "社交网络",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100014,
          name: "人力资源服务",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100015,
          name: "企业服务",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100016,
          name: "信息安全",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100017,
          name: "新零售",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100018,
          name: "智能硬件",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100019,
          name: "移动互联网",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100020,
          name: "互联网",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100021,
          name: "计算机软件",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100022,
          name: "计算机硬件",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100023,
          name: "计算机服务",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100024,
          name: "通信/网络设备",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100025,
          name: "运营商/增值服务",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100026,
          name: "电子/半导体/集成电路",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100027,
          name: "消费电子",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
      ],
      firstChar: null,
      pinyin: null,
      rank: 0,
      mark: 0,
      positionType: 0,
      cityType: 0,
      capital: 0,
      color: null,
      recruitmentType: null,
      cityCode: null,
      regionCode: 0,
      value: null,
    },
    {
      code: 100100,
      name: "广告/传媒/文化/体育",
      tip: null,
      subLevelModelList: [
        {
          code: 100101,
          name: "广告/公关/会展",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100102,
          name: "新闻/出版",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100103,
          name: "广播/影视",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100104,
          name: "文化/体育/娱乐",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
      ],
      firstChar: null,
      pinyin: null,
      rank: 0,
      mark: 0,
      positionType: 0,
      cityType: 0,
      capital: 0,
      color: null,
      recruitmentType: null,
      cityCode: null,
      regionCode: 0,
      value: null,
    },
    {
      code: 100200,
      name: "金融",
      tip: null,
      subLevelModelList: [
        {
          code: 100201,
          name: "银行",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100202,
          name: "保险",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100203,
          name: "证券/期货",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100204,
          name: "基金",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100205,
          name: "信托",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100206,
          name: "互联网金融",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100207,
          name: "投资/融资",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100208,
          name: "租赁/拍卖/典当/担保",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
      ],
      firstChar: null,
      pinyin: null,
      rank: 0,
      mark: 0,
      positionType: 0,
      cityType: 0,
      capital: 0,
      color: null,
      recruitmentType: null,
      cityCode: null,
      regionCode: 0,
      value: null,
    },
    {
      code: 100300,
      name: "教育培训",
      tip: null,
      subLevelModelList: [
        {
          code: 100301,
          name: "学前教育",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100302,
          name: "院校",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100303,
          name: "培训机构",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100304,
          name: "学术/科研",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
      ],
      firstChar: null,
      pinyin: null,
      rank: 0,
      mark: 0,
      positionType: 0,
      cityType: 0,
      capital: 0,
      color: null,
      recruitmentType: null,
      cityCode: null,
      regionCode: 0,
      value: null,
    },
    {
      code: 100400,
      name: "制药/医疗",
      tip: null,
      subLevelModelList: [
        {
          code: 100401,
          name: "制药",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100402,
          name: "医疗/护理/卫生",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100403,
          name: "医疗设备/器械",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
      ],
      firstChar: null,
      pinyin: null,
      rank: 0,
      mark: 0,
      positionType: 0,
      cityType: 0,
      capital: 0,
      color: null,
      recruitmentType: null,
      cityCode: null,
      regionCode: 0,
      value: null,
    },
    {
      code: 100500,
      name: "交通/物流/贸易/零售",
      tip: null,
      subLevelModelList: [
        {
          code: 100501,
          name: "交通/运输",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100502,
          name: "物流/仓储",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100503,
          name: "批发/零售",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100504,
          name: "贸易/进出口",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
      ],
      firstChar: null,
      pinyin: null,
      rank: 0,
      mark: 0,
      positionType: 0,
      cityType: 0,
      capital: 0,
      color: null,
      recruitmentType: null,
      cityCode: null,
      regionCode: 0,
      value: null,
    },
    {
      code: 100600,
      name: "专业服务",
      tip: null,
      subLevelModelList: [
        {
          code: 100601,
          name: "咨询",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100602,
          name: "法律",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100603,
          name: "翻译",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100604,
          name: "人力资源服务",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100605,
          name: "财务/审计/税务",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100606,
          name: "检测/认证",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100607,
          name: "专利/商标/知识产权",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100608,
          name: "其他专业服务",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
      ],
      firstChar: null,
      pinyin: null,
      rank: 0,
      mark: 0,
      positionType: 0,
      cityType: 0,
      capital: 0,
      color: null,
      recruitmentType: null,
      cityCode: null,
      regionCode: 0,
      value: null,
    },
    {
      code: 100700,
      name: "房地产/建筑",
      tip: null,
      subLevelModelList: [
        {
          code: 100701,
          name: "房地产开发",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100702,
          name: "工程施工",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100703,
          name: "建筑设计",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100704,
          name: "装修装饰",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100705,
          name: "建材",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100706,
          name: "地产经纪/中介",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100707,
          name: "物业服务",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
      ],
      firstChar: null,
      pinyin: null,
      rank: 0,
      mark: 0,
      positionType: 0,
      cityType: 0,
      capital: 0,
      color: null,
      recruitmentType: null,
      cityCode: null,
      regionCode: 0,
      value: null,
    },
    {
      code: 100800,
      name: "汽车",
      tip: null,
      subLevelModelList: [
        {
          code: 100801,
          name: "汽车生产",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100802,
          name: "汽车零部件",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100803,
          name: "4S店/后市场",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
      ],
      firstChar: null,
      pinyin: null,
      rank: 0,
      mark: 0,
      positionType: 0,
      cityType: 0,
      capital: 0,
      color: null,
      recruitmentType: null,
      cityCode: null,
      regionCode: 0,
      value: null,
    },
    {
      code: 100900,
      name: "机械/制造",
      tip: null,
      subLevelModelList: [
        {
          code: 100901,
          name: "机械设备/机电/重工",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100902,
          name: "仪器仪表/工业自动化",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100903,
          name: "原材料及加工/模具",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100904,
          name: "印刷/包装/造纸",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 100905,
          name: "船舶/航空/航天",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
      ],
      firstChar: null,
      pinyin: null,
      rank: 0,
      mark: 0,
      positionType: 0,
      cityType: 0,
      capital: 0,
      color: null,
      recruitmentType: null,
      cityCode: null,
      regionCode: 0,
      value: null,
    },
    {
      code: 101000,
      name: "消费品",
      tip: null,
      subLevelModelList: [
        {
          code: 101001,
          name: "食品/饮料/烟酒",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101002,
          name: "日化",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101003,
          name: "服装/纺织/皮革",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101004,
          name: "家具/家电/家居",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101005,
          name: "玩具/礼品",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101006,
          name: "珠宝/首饰",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101007,
          name: "工艺品/收藏品",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101008,
          name: "办公用品及设备",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
      ],
      firstChar: null,
      pinyin: null,
      rank: 0,
      mark: 0,
      positionType: 0,
      cityType: 0,
      capital: 0,
      color: null,
      recruitmentType: null,
      cityCode: null,
      regionCode: 0,
      value: null,
    },
    {
      code: 101100,
      name: "服务业",
      tip: null,
      subLevelModelList: [
        {
          code: 101101,
          name: "餐饮",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101102,
          name: "酒店",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101103,
          name: "旅游",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101104,
          name: "美容/美发",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101105,
          name: "婚庆/摄影",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101106,
          name: "其他服务业",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101107,
          name: "休闲/娱乐",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101108,
          name: "回收/维修",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101109,
          name: "家政服务",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101110,
          name: "宠物服务",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
      ],
      firstChar: null,
      pinyin: null,
      rank: 0,
      mark: 0,
      positionType: 0,
      cityType: 0,
      capital: 0,
      color: null,
      recruitmentType: null,
      cityCode: null,
      regionCode: 0,
      value: null,
    },
    {
      code: 101200,
      name: "能源/化工/环保",
      tip: null,
      subLevelModelList: [
        {
          code: 101201,
          name: "石油/石化",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101202,
          name: "化工",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101203,
          name: "矿产/地质",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101204,
          name: "采掘/冶炼",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101205,
          name: "电力/热力/燃气/水利",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101206,
          name: "新能源",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101207,
          name: "环保",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
      ],
      firstChar: null,
      pinyin: null,
      rank: 0,
      mark: 0,
      positionType: 0,
      cityType: 0,
      capital: 0,
      color: null,
      recruitmentType: null,
      cityCode: null,
      regionCode: 0,
      value: null,
    },
    {
      code: 101300,
      name: "政府/非盈利机构/其他",
      tip: null,
      subLevelModelList: [
        {
          code: 101301,
          name: "政府/公共事业",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101302,
          name: "非盈利机构",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101303,
          name: "农/林/牧/渔",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
        {
          code: 101304,
          name: "其他行业",
          tip: null,
          subLevelModelList: null,
          firstChar: null,
          pinyin: null,
          rank: 0,
          mark: 0,
          positionType: 0,
          cityType: 0,
          capital: 0,
          color: null,
          recruitmentType: null,
          cityCode: null,
          regionCode: 0,
          value: null,
        },
      ],
      firstChar: null,
      pinyin: null,
      rank: 0,
      mark: 0,
      positionType: 0,
      cityType: 0,
      capital: 0,
      color: null,
      recruitmentType: null,
      cityCode: null,
      regionCode: 0,
      value: null,
    },
  ],
});
const visable = ref(false);
const isChild = ref(false);
const changeVisable = (val, child) => {
  visable.value = val;
  isChild.value = child && val;
};
const changeFatherVisable = () => {
  setTimeout(() => {
    if (!isChild.value) {
      visable.value = false;
    }
  }, 50);
};
</script>

<style lang="scss" scoped>
.condition-position-select {
  float: left;
  margin-top: 20px;
  margin-right: 20px;
  position: relative;
  background: #f8f8f8;
  border-radius: 4px;
  overflow: hidden;
  .current-select {
    position: relative;
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    color: #222;
    line-height: 20px;
    padding: 6px 24px 6px 12px;
    cursor: pointer;
    transition: all 0.2s linear;
    .placeholder-text {
      display: inline-block;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
    }
  }
  .current-select:after {
    content: " ";
    position: absolute;
    top: 12px;
    right: 12px;
    width: 4px;
    height: 7px;
    background: url(@/assets/arrow.png) -6px -16px/10px auto no-repeat;
    transform: rotate(90deg);
    z-index: 1;
  }
  .filter-select-dropdown {
    display: flex;
    position: absolute;
    width: 778px;
    top: 40px;
    left: 0;
    z-index: 4;
    border-radius: 8px;
    transition: opacity 0.2s linear;
    ul {
      width: 168px;
      padding: 4px 8px;
      max-height: 286px;
      overflow: auto;
      overflow: overlay;
      flex-shrink: 0;
      background: #fff;
      border-radius: 8px;
      border: 1px solid #ededed;
      li {
        position: relative;
        display: block;
        font-size: 14px;
        font-weight: 400;
        color: #333;
        line-height: 20px;
        padding: 8px 16px 8px 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        border-radius: 4px;
        background: #fff;
        transition: all 0.2s linear;
        .icon-arrow {
          position: absolute;
          top: 15px;
          right: 8px;
          width: 4px;
          height: 7px;
          background: url(@/assets/arrow.png) -6px -16px/10px auto no-repeat;
          z-index: 1;
        }
      }
      li:hover {
        color: #00a6a7;
        background: #f8f8f8;
        font-weight: 500;
      }
      li:hover .icon-arrow {
        background-position: -6px -8px;
      }
    }
    .condition-position-detail {
      width: 610px;
      padding: 4px 0;
      background: #fff;
      border: 1px solid #ededed;
      border-radius: 12px;
      overflow: auto;
      overflow: overlay;
      height: 286px;
      .condition-position-title {
        display: block;
        font-size: 16px;
        font-weight: 500;
        color: #12141a;
        line-height: 22px;
        padding: 12px 16px 4px;
      }
      .condition-position-grandson {
        padding: 12px 0 0 10px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        .condition-position-label {
          display: block;
          flex-shrink: 0;
          float: left;
          width: 122px;
          font-size: 13px;
          color: #666;
          line-height: 18px;
          padding-left: 6px;
          word-break: break-all;
          box-sizing: border-box;
        }
        .condition-position-list {
          margin-left: -10px;
          flex: 1;
          overflow: hidden;
          border-bottom: 1px solid #f0f3fa;
          a {
            float: left;
            display: block;
            margin-bottom: 12px;
            margin-left: 10px;
            margin-right: 10px;
            font-size: 13px;
            color: #222;
            line-height: 18px;
            cursor: pointer;
            transition: all 0.2s linear;
          }
        }
      }
    }
  }
}

.condition-position-select.open {
  background: #e5f8f8;
  overflow: visible;
}
.condition-position-select.open .current-select:after {
  background-position: -6px -8px;
  transform: rotate(270deg);
}
.condition-position-select
  .filter-select-dropdown
  .condition-position-detail
  .condition-position-list {
  color: #00a6a7;
}
.condition-position-select.open:after {
  content: " ";
}
.condition-position-select:after {
  content: none;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  height: 8px;
  z-index: 4;
  background: transparent;
}
</style>