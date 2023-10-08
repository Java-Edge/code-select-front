<template>
  <div class="course-navigation">
    <!--   筛选框   -->
    <div class="job-search-wrapper">
      <div class="job-search-box clearfix">
        <div class="job-search-form">
          <span @click="openDialog" class="city-label">
            {{ name||cityJson.locationCity.name }}
          </span>
          <div class="search-input-box">
            <div class="input-wrap input-wrap-text">
              <input
                autocomplete="on"
                spellcheck="false"
                type="text"
                placeholder="搜索职位、公司"
                class="input"
              />
            </div>
            <!-- <a href="javascript:;" class="search-map-btn">地图</a> -->
          </div>
          <a href="javascript:;" class="search-btn">搜索</a>
        </div>
        <city-dialog ref="cityDialog" @confirm="confirm"/>
        <a @click="$router.push('/login')" class="go-login-btn">登录，查看更多岗位</a>
      </div>
      <!-- <div class="search-condition-wrapper clearfix">
        <div class="city-area-select">
          <div class="city-area-current">
            <i class="ui-icon-location"></i
            ><span class="area-current-text">重庆</span>
          </div>
          <div class="city-area-dropdown">
            <ul class="city-area-tab">
              <li ka="job_filter_tab_city" class="active">城市和区域</li>
              <li ka="job_filter_tab_subway" class="">地铁</li>
            </ul>
            <div class="area-dropdown-item">
              <ul class="dropdown-city-list">
                <li ka="sel-city-100010000" class="">全国</li>
                <li ka="sel-city-101010100" class="">北京</li>
                <li ka="sel-city-101020100" class="">上海</li>
                <li ka="sel-city-101280100" class="">广州</li>
                <li ka="sel-city-101280600" class="">深圳</li>
                <li ka="sel-city-101210100" class="">杭州</li>
                <li ka="sel-city-101030100" class="">天津</li>
                <li ka="sel-city-101110100" class="">西安</li>
                <li ka="sel-city-101190400" class="">苏州</li>
                <li ka="sel-city-101200100" class="">武汉</li>
                <li ka="sel-city-101230200" class="">厦门</li>
                <li ka="sel-city-101250100" class="">长沙</li>
                <li ka="sel-city-101270100" class="">成都</li>
                <li ka="sel-city-101180100" class="">郑州</li>
                <li ka="sel-city-101040100" class="active">重庆</li>
                <li>其它城市</li>
              </ul>
            </div>
            <div class="area-dropdown-item">
              <div class="area-select-wrapper">
                <div class="area-select-container">
                  <ul class="dropdown-area-list">
                    <li>不限</li>
                    <li ka="sel-business-0" class="">渝中区</li>
                    <li ka="sel-business-1" class="">垫江县</li>
                    <li ka="sel-business-2" class="">涪陵区</li>
                    <li ka="sel-business-3" class="">丰都县</li>
                    <li ka="sel-business-4" class="">万州区</li>
                    <li ka="sel-business-5" class="">城口县</li>
                    <li ka="sel-business-6" class="">大足区</li>
                    <li ka="sel-business-7" class="">綦江区</li>
                    <li ka="sel-business-8" class="">巫溪县</li>
                    <li ka="sel-business-9" class="">北碚区</li>
                    <li ka="sel-business-10" class="">巫山县</li>
                    <li ka="sel-business-11" class="">南岸区</li>
                    <li ka="sel-business-12" class="">奉节县</li>
                    <li ka="sel-business-13" class="">九龙坡区</li>
                    <li ka="sel-business-14" class="">云阳县</li>
                    <li ka="sel-business-15" class="">沙坪坝区</li>
                    <li ka="sel-business-16" class="">江北区</li>
                    <li ka="sel-business-17" class="">忠县</li>
                    <li ka="sel-business-18" class="">大渡口区</li>
                    <li ka="sel-business-19" class="">南川区</li>
                    <li ka="sel-business-20" class="">永川区</li>
                    <li ka="sel-business-21" class="">合川区</li>
                    <li ka="sel-business-22" class="">江津区</li>
                    <li ka="sel-business-23" class="">彭水苗族土家族自治县</li>
                    <li ka="sel-business-24" class="">长寿区</li>
                    <li ka="sel-business-25" class="">黔江区</li>
                    <li ka="sel-business-26" class="">酉阳土家族苗族自治县</li>
                    <li ka="sel-business-27" class="">秀山土家族苗族自治县</li>
                    <li ka="sel-business-28" class="">巴南区</li>
                    <li ka="sel-business-29" class="">渝北区</li>
                    <li ka="sel-business-30" class="">石柱土家族自治县</li>
                    <li ka="sel-business-31" class="">璧山区</li>
                    <li ka="sel-business-32" class="">铜梁区</li>
                    <li ka="sel-business-33" class="">武隆区</li>
                    <li ka="sel-business-34" class="">梁平区</li>
                    <li ka="sel-business-35" class="">开州区</li>
                    <li ka="sel-business-36" class="">荣昌区</li>
                    <li ka="sel-business-37" class="">潼南区</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="condition-industry-select">
          <div class="current-select">
            <span class="placeholder-text">公司行业</span>
          </div>
          <div class="filter-select-dropdown" style="display: none">
            <ul>
              <li class="clearfix">
                <span class="label">互联网/IT/电子/通信</span>
                <div class="select-list">
                  <a href="javascript:;" ka="sel-industry-0" class=""
                    >电子商务<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-1" class=""
                    >游戏<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-2" class=""
                    >媒体<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-3" class=""
                    >广告营销<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-4" class=""
                    >数据服务<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-5" class=""
                    >医疗健康<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-6" class=""
                    >生活服务<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-7" class=""
                    >O2O<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-8" class=""
                    >旅游<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-9" class=""
                    >分类信息<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-10" class=""
                    >音乐/视频/阅读<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-11" class=""
                    >在线教育<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-12" class=""
                    >社交网络<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-13" class=""
                    >人力资源服务<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-14" class=""
                    >企业服务<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-15" class=""
                    >信息安全<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-16" class=""
                    >新零售<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-17" class=""
                    >智能硬件<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-18" class=""
                    >移动互联网<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-19" class=""
                    >互联网<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-20" class=""
                    >计算机软件<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-21" class=""
                    >计算机硬件<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-22" class=""
                    >计算机服务<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-23" class=""
                    >通信/网络设备<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-24" class=""
                    >运营商/增值服务<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-25" class=""
                    >电子/半导体/集成电路<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-26" class=""
                    >消费电子<i class="ui-icon-check"></i
                  ></a>
                </div>
              </li>
              <li class="clearfix">
                <span class="label">广告/传媒/文化/体育</span>
                <div class="select-list">
                  <a href="javascript:;" ka="sel-industry-27" class=""
                    >广告/公关/会展<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-28" class=""
                    >新闻/出版<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-29" class=""
                    >广播/影视<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-30" class=""
                    >文化/体育/娱乐<i class="ui-icon-check"></i
                  ></a>
                </div>
              </li>
              <li class="clearfix">
                <span class="label">金融</span>
                <div class="select-list">
                  <a href="javascript:;" ka="sel-industry-31" class=""
                    >银行<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-32" class=""
                    >保险<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-33" class=""
                    >证券/期货<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-34" class=""
                    >基金<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-35" class=""
                    >信托<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-36" class=""
                    >互联网金融<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-37" class=""
                    >投资/融资<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-38" class=""
                    >租赁/拍卖/典当/担保<i class="ui-icon-check"></i
                  ></a>
                </div>
              </li>
              <li class="clearfix">
                <span class="label">教育培训</span>
                <div class="select-list">
                  <a href="javascript:;" ka="sel-industry-39" class=""
                    >学前教育<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-40" class=""
                    >院校<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-41" class=""
                    >培训机构<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-42" class=""
                    >学术/科研<i class="ui-icon-check"></i
                  ></a>
                </div>
              </li>
              <li class="clearfix">
                <span class="label">制药/医疗</span>
                <div class="select-list">
                  <a href="javascript:;" ka="sel-industry-43" class=""
                    >制药<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-44" class=""
                    >医疗/护理/卫生<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-45" class=""
                    >医疗设备/器械<i class="ui-icon-check"></i
                  ></a>
                </div>
              </li>
              <li class="clearfix">
                <span class="label">交通/物流/贸易/零售</span>
                <div class="select-list">
                  <a href="javascript:;" ka="sel-industry-46" class=""
                    >交通/运输<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-47" class=""
                    >物流/仓储<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-48" class=""
                    >批发/零售<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-49" class=""
                    >贸易/进出口<i class="ui-icon-check"></i
                  ></a>
                </div>
              </li>
              <li class="clearfix">
                <span class="label">专业服务</span>
                <div class="select-list">
                  <a href="javascript:;" ka="sel-industry-50" class=""
                    >咨询<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-51" class=""
                    >法律<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-52" class=""
                    >翻译<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-53" class=""
                    >人力资源服务<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-54" class=""
                    >财务/审计/税务<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-55" class=""
                    >检测/认证<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-56" class=""
                    >专利/商标/知识产权<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-57" class=""
                    >其他专业服务<i class="ui-icon-check"></i
                  ></a>
                </div>
              </li>
              <li class="clearfix">
                <span class="label">房地产/建筑</span>
                <div class="select-list">
                  <a href="javascript:;" ka="sel-industry-58" class=""
                    >房地产开发<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-59" class=""
                    >工程施工<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-60" class=""
                    >建筑设计<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-61" class=""
                    >装修装饰<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-62" class=""
                    >建材<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-63" class=""
                    >地产经纪/中介<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-64" class=""
                    >物业服务<i class="ui-icon-check"></i
                  ></a>
                </div>
              </li>
              <li class="clearfix">
                <span class="label">汽车</span>
                <div class="select-list">
                  <a href="javascript:;" ka="sel-industry-65" class=""
                    >汽车生产<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-66" class=""
                    >汽车零部件<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-67" class=""
                    >4S店/后市场<i class="ui-icon-check"></i
                  ></a>
                </div>
              </li>
              <li class="clearfix">
                <span class="label">机械/制造</span>
                <div class="select-list">
                  <a href="javascript:;" ka="sel-industry-68" class=""
                    >机械设备/机电/重工<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-69" class=""
                    >仪器仪表/工业自动化<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-70" class=""
                    >原材料及加工/模具<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-71" class=""
                    >印刷/包装/造纸<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-72" class=""
                    >船舶/航空/航天<i class="ui-icon-check"></i
                  ></a>
                </div>
              </li>
              <li class="clearfix">
                <span class="label">消费品</span>
                <div class="select-list">
                  <a href="javascript:;" ka="sel-industry-73" class=""
                    >食品/饮料/烟酒<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-74" class=""
                    >日化<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-75" class=""
                    >服装/纺织/皮革<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-76" class=""
                    >家具/家电/家居<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-77" class=""
                    >玩具/礼品<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-78" class=""
                    >珠宝/首饰<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-79" class=""
                    >工艺品/收藏品<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-80" class=""
                    >办公用品及设备<i class="ui-icon-check"></i
                  ></a>
                </div>
              </li>
              <li class="clearfix">
                <span class="label">服务业</span>
                <div class="select-list">
                  <a href="javascript:;" ka="sel-industry-81" class=""
                    >餐饮<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-82" class=""
                    >酒店<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-83" class=""
                    >旅游<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-84" class=""
                    >美容/美发<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-85" class=""
                    >婚庆/摄影<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-86" class=""
                    >其他服务业<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-87" class=""
                    >休闲/娱乐<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-88" class=""
                    >回收/维修<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-89" class=""
                    >家政服务<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-90" class=""
                    >宠物服务<i class="ui-icon-check"></i
                  ></a>
                </div>
              </li>
              <li class="clearfix">
                <span class="label">能源/化工/环保</span>
                <div class="select-list">
                  <a href="javascript:;" ka="sel-industry-91" class=""
                    >石油/石化<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-92" class=""
                    >化工<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-93" class=""
                    >矿产/地质<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-94" class=""
                    >采掘/冶炼<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-95" class=""
                    >电力/热力/燃气/水利<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-96" class=""
                    >新能源<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-97" class=""
                    >环保<i class="ui-icon-check"></i
                  ></a>
                </div>
              </li>
              <li class="clearfix">
                <span class="label">政府/非盈利机构/其他</span>
                <div class="select-list">
                  <a href="javascript:;" ka="sel-industry-98" class=""
                    >政府/公共事业<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-99" class=""
                    >非盈利机构<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-100" class=""
                    >农/林/牧/渔<i class="ui-icon-check"></i></a
                  ><a href="javascript:;" ka="sel-industry-101" class=""
                    >其他行业<i class="ui-icon-check"></i
                  ></a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="condition-position-select">
          <div class="current-select">
            <span class="placeholder-text">职位类型</span>
          </div>
          <div class="filter-select-dropdown" style="display: none">
            <ul>
              <li ka="sel-position-0">不限</li>
              <li class="">互联网/AI<i class="icon-arrow"></i></li>
              <li class="">电子/电气/通信<i class="icon-arrow"></i></li>
              <li class="">产品<i class="icon-arrow"></i></li>
              <li class="">运营/客服<i class="icon-arrow"></i></li>
              <li class="">销售<i class="icon-arrow"></i></li>
              <li class="">人力/行政/法务<i class="icon-arrow"></i></li>
              <li class="">财务/审计/税务<i class="icon-arrow"></i></li>
              <li class="">生产制造<i class="icon-arrow"></i></li>
              <li class="">生活服务/零售<i class="icon-arrow"></i></li>
              <li class="">餐饮<i class="icon-arrow"></i></li>
              <li class="">酒店/旅游<i class="icon-arrow"></i></li>
              <li class="">教育培训<i class="icon-arrow"></i></li>
              <li class="">设计<i class="icon-arrow"></i></li>
              <li class="">房地产/建筑<i class="icon-arrow"></i></li>
              <li class="">影视/传媒<i class="icon-arrow"></i></li>
              <li class="">市场/公关/广告<i class="icon-arrow"></i></li>
              <li class="">物流/仓储/司机<i class="icon-arrow"></i></li>
              <li class="">采购/贸易<i class="icon-arrow"></i></li>
              <li class="">汽车<i class="icon-arrow"></i></li>
              <li class="">医疗健康<i class="icon-arrow"></i></li>
              <li class="">金融<i class="icon-arrow"></i></li>
              <li class="">咨询/翻译/法律<i class="icon-arrow"></i></li>
              <li class="">能源/环保/农业<i class="icon-arrow"></i></li>
              <li class="">高级管理<i class="icon-arrow"></i></li>
              <li class="">其他<i class="icon-arrow"></i></li>
            </ul>
          </div>
        </div>
        <div class="condition-filter-select">
          <div class="current-select">
            <span class="placeholder-text">求职类型</span>
          </div>
          <div class="filter-select-dropdown" style="display: none">
            <ul>
              <li ka="sel-jobType-0" class="">
                不限<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-jobType-1901" class="">
                全职<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-jobType-1903" class="">
                兼职<i class="ui-icon-check"></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="condition-filter-select">
          <div class="current-select">
            <span class="placeholder-text">工作经验</span>
          </div>
          <div class="filter-select-dropdown" style="display: none">
            <ul>
              <li ka="sel-exp-0" class="">不限<i class="ui-icon-check"></i></li>
              <li ka="sel-exp-108" class="">
                在校生<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-exp-102" class="">
                应届生<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-exp-101" class="">
                经验不限<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-exp-103" class="">
                1年以内<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-exp-104" class="">
                1-3年<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-exp-105" class="">
                3-5年<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-exp-106" class="">
                5-10年<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-exp-107" class="">
                10年以上<i class="ui-icon-check"></i>
              </li>
            </ul>
          </div>
        </div>

        <div class="condition-filter-select">
          <div class="current-select">
            <span class="placeholder-text">薪资待遇</span>
          </div>
          <div class="filter-select-dropdown" style="display: none">
            <ul>
              <li ka="sel-salary-0" class="">
                不限<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-salary-402" class="">
                3K以下<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-salary-403" class="">
                3-5K<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-salary-404" class="">
                5-10K<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-salary-405" class="">
                10-20K<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-salary-406" class="">
                20-50K<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-salary-407" class="">
                50K以上<i class="ui-icon-check"></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="condition-filter-select">
          <div class="current-select">
            <span class="placeholder-text">学历要求</span>
          </div>
          <div class="filter-select-dropdown" style="display: none">
            <ul>
              <li ka="sel-degree-0" class="">
                不限<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-degree-209" class="">
                初中及以下<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-degree-208" class="">
                中专/中技<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-degree-206" class="">
                高中<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-degree-202" class="">
                大专<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-degree-203" class="">
                本科<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-degree-204" class="">
                硕士<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-degree-205" class="">
                博士<i class="ui-icon-check"></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="condition-filter-select">
          <div class="current-select">
            <span class="placeholder-text">公司规模</span>
          </div>
          <div class="filter-select-dropdown" style="display: none">
            <ul>
              <li ka="sel-scale-0" class="">
                不限<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-scale-301" class="">
                0-20人<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-scale-302" class="">
                20-99人<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-scale-303" class="">
                100-499人<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-scale-304" class="">
                500-999人<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-scale-305" class="">
                1000-9999人<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-scale-306" class="">
                10000人以上<i class="ui-icon-check"></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="condition-filter-select">
          <div class="current-select">
            <span class="placeholder-text">融资阶段</span>
          </div>
          <div class="filter-select-dropdown" style="display: none">
            <ul>
              <li ka="sel-stage-0" class="">
                不限<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-stage-801" class="">
                未融资<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-stage-802" class="">
                天使轮<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-stage-803" class="">
                A轮<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-stage-804" class="">
                B轮<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-stage-805" class="">
                C轮<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-stage-806" class="">
                D轮及以上<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-stage-807" class="">
                已上市<i class="ui-icon-check"></i>
              </li>
              <li ka="sel-stage-808" class="">
                不需要融资<i class="ui-icon-check"></i>
              </li>
            </ul>
          </div>
        </div>
        <a href="javascript:;" ka="empty-filter" class="clear-search-btn"
          >清空筛选条件</a
        >
      </div> -->
    </div>
    <div class="filter-box">
      <div class="filter-box1">
        <div
          class="filter-item"
          @click="handleFilterSelect('校招')"
          :class="{ active: activeMenu === '校招' }"
        >
          校招
        </div>
        <div
          class="filter-item"
          @click="handleFilterSelect('社招')"
          :class="{ active: activeMenu === '社招' }"
        >
          社招
        </div>
      </div>
      <div class="time-filter-box">
        <el-select
          v-model="timeValue"
          placeholder="年限"
          style="width: 240px"
          multiple
        >
          <el-option
            v-for="item in timeRange"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="salary-filter-box">
        <el-select
          v-model="salaryValue"
          placeholder="薪资"
          style="width: 240px"
        >
          <el-option
            v-for="item in salaryRange"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <!-- 内容区域 -->
    <div style="font-size: 30px; text-align: center; margin-top: 30px">
      -- 招聘列表 --
    </div>
    <!-- 课程详情区域 -->
    <RecruitList :recruits="recruits" />
  </div>
</template>
  
  <script>
import RecruitList from "./recruit-list.vue"; // Import the CourseList component
import CityDialog from "./compontents/cityDialog.vue";
import data from "./city.json";
export default {
  name: "RecruitNavigation",
  components: {
    RecruitList,
    CityDialog,
  },
  data() {
    return {
      cityJson: data,
      name:'',
      activeMenu: "home", // 默认选中首页
      recruits: [], // 所有课程数据，从后端获取或静态定义
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        loop: true,
        autoplay: {
          delay: 3000,
        },
      },
      carouselData: [
        {
          id: 1,
          image:
            "https://csdn-blog-picture.oss-cn-guangzhou.aliyuncs.com/img/image-20230709183838817.png",
        },
        {
          id: 2,
          image: "https://via.placeholder.com/800x300?text=Slide%202",
        },
        {
          id: 3,
          image: "https://via.placeholder.com/800x300?text=Slide%203",
        },
        // 更多轮播图数据
      ],
      img: require("@/assets/background.jpg"),
      timeRange: [
        {
          value: "1",
          label: "1年",
        },
        {
          value: "3",
          label: "3年",
        },
        {
          value: "5",
          label: "5年",
        },
      ],
      timeValue: [],
      salaryRange: [
        {
          value: "10000",
          label: "10k",
        },
        {
          value: "20000",
          label: "20k",
        },
        {
          value: "30000",
          label: "30k",
        },
      ],
      salaryValue: "",
      recruitList: [
        {
          title: "后端开发工程师",
          salary: "11-18k*20薪 ",
          companyName: "交行金科",
          positionTags: [
            "上海",
            "1-3年",
            "本科",
            "java",
            "软件开发",
            "后端开发",
          ],
          companyTags: ["金融", "未融资", "500-999人"],
        },
        {
          title: "后端开发工程师",
          salary: "11-18k*20薪 ",
          companyName: "交行金科",
          positionTags: [
            "上海",
            "1-3年",
            "本科",
            "java",
            "软件开发",
            "后端开发",
          ],
          companyTags: ["金融", "未融资", "500-999人"],
        },
      ],
    };
  },
  computed: {
    recruitRows() {
      // 将所有课程按每行4个进行分组
      const rows = [];
      for (let i = 0; i < this.recruits.length; i += 4) {
        rows.push(this.recruits.slice(i, i + 4));
      }
      return rows;
    },
  },
  created() {
    this.getCourses();
    this.getFiveCourse();
  },
  methods: {
    openDialog() {
      this.$refs.cityDialog.showDialog()
    },
    confirm(item){
      this.name=item.name
    },
    handleMenuSelect(index) {
      this.activeMenu = index; // 更新选中的菜单项
      // 可根据不同的菜单项进行相应的页面跳转或其他操作
    },
    getCourses() {
      let condition;
      condition = {
        pageNo: 1,
        pageSize: 20,
        param: {
          companyId: "",
          careerJobId: "",
        },
      };
      this.$axios
        .post(
          "/back/recruit/selectByCondition",
          condition
          // ,
          //     {
          //         headers: {
          //             "Authorization": this.$store.getters.getToken
          //         }
          //     }
        )
        .then((response) => {
          let result = response.data.result;
          this.recruits = result.records;
          this.total = result.total;

          console.log(this.recruits);
        });
    },
    getFiveCourse() {
      this.$axios
        .get(
          "/back/sourceCourse/getFiveCourse"
          // ,
          //     {
          //         headers: {
          //             "Authorization": this.$store.getters.getToken
          //         }
          //     }
        )
        .then((response) => {
          const courses = response.data.result;
          console.log(response);
          this.carouselData = courses;
          // this.$message({
          //     type: 'success',
          //     message: response.data.message
          // });
          console.log(this.courses);
        });
    },
    handleFilterSelect(value) {
      console.log(value);
    },
  },
};
</script>
  
<style lang="scss" scoped>
.index {
  background-color: #e9eef3;
}
/* 添加样式 */
.course-navigation {
  max-width: 1600px;
  margin: 0 auto;
}
.filter-box {
  display: flex;
}
.filter-box1 {
  display: flex;
  margin-top: 25px;
  margin-left: 20px;
}
.recruit-list {
  display: flex;
  justify-content: center;
}
.filter-item {
  background-color: white;
  width: 60px;
  height: 33px;
  line-height: 33px;
  text-align: center;
  margin-left: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 2px;
  font-size: 15px;
  color: #606266;
}

/* 选中状态下的样式 */
.filter-item.selected {
  background-color: #007bff;
  color: #fff;
}
.time-filter-box {
  margin-top: 22px;
  margin-left: 22px;
}
.salary-filter-box {
  margin-top: 22px;
  margin-left: 22px;
}
.menu {
  display: flex;
  justify-content: center;
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  display: inline-block;
  padding: 0 20px;
  cursor: pointer;
}

.menu li.active {
  color: #ffd04b;
  border-bottom: 2px solid #ffd04b;
}

.content {
  display: flex;
  flex-wrap: wrap;
  /* Wrap the sidebar and swiper to next row if necessary */
}

.left-sidebar {
  width: 20%;
  padding: 20px;
  background-color: #f0f0f0;
}

.left-sidebar h3 {
  margin-bottom: 10px;
  font-size: 18px;
}

.left-sidebar ul {
  list-style: none;
  padding: 0;
}

.left-sidebar li {
  margin-bottom: 10px;
  cursor: pointer;
}

.right-sidebar {
  flex: 1;
  padding: 20px;
  min-width: 300px;
  /* Set a minimum width for the sidebar */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Add the following CSS styles */

.swiper-pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  /* Add some margin between carousel and pagination */
}

.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background-color: #ccc;
  border-radius: 50%;
  margin: 0 5px;
  /* Adjust the space between bullets as needed */
}

.swiper-pagination-bullet-active {
  background-color: #555;
}
/* 背景图片样式 */
.background-image {
  width: 1600px;
  height: 250px;
  margin-top: 50px;
}

.swiper-container {
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
  position: relative;
  /* 添加以下样式以实现水平排列 */
  display: flex;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
}
.input-wrap {
  position: relative;
  display: inline-block;
  min-width: 300px;
  vertical-align: middle;
  line-height: normal;
}
.job-search-wrapper {
  background: #fff;
  width: 1600px;
  margin: 20px auto 0;
  border-radius: 12px;
  padding: 24px 24px 16px;
  .job-search-box {
    margin: 0 auto;
    .job-search-form {
      position: relative;
      float: left;
      width: 1324px;
      height: 50px;
      background: #00bebd;
      border-radius: 12px;
      border: 2px solid #00bebd;
      .input-wrap {
        width: 100%;
        color: #222;
        margin-left: -1px;
      }
      .city-label {
        box-sizing: border-box;
        position: relative;
        float: left;
        background: #fff;
        width: 136px;
        font-size: 16px;
        font-weight: 400;
        color: #222;
        line-height: 22px;
        height: 50px;
        padding: 14px 24px 14px 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: 10px 0 0 10px;
        border-right: 1px solid #fff;
        cursor: pointer;
        transition: all 0.2s linear;
      }
      .city-label:after {
        content: " ";
        position: absolute;
        top: 21px;
        right: 18px;
        width: 4px;
        height: 7px;
        background: url(https://img.bosszhipin.com/static/file/2022/01vcskhm8y1652252017628.png) -6px -16px/10px
          auto no-repeat;
        transform: rotate(90deg);
        z-index: 1;
      }
      .search-input-box {
        position: relative;
        float: left;
        background: #fff;
        width: 1072px;
        border-radius: 0 10px 10px 0;
      }
      .input {
        box-sizing: border-box;
        height: 50px;
        border: none;
        box-shadow: none;
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        padding: 14px 18px;
        border-radius: 0 12px 12px 0;
      }
      .search-map-btn {
        position: absolute;
        top: 50%;
        right: 20px;
        margin-top: -12px;
        height: 24px;
        font-size: 16px;
        color: #333;
        z-index: 1;
        display: flex;
        align-items: center;
        transition: all 0.2s linear;
      }
      .search-map-btn:before {
        content: " ";
        display: block;
        width: 24px;
        height: 24px;
        margin-right: 4px;
        background: url(https://img.bosszhipin.com/static/file/2023/rnb8fa70bs1675773960493.png)
          0 0/24px auto no-repeat;
      }
      .search-btn {
        float: left;
        display: block;
        font-weight: 500;
        color: #fff;
        line-height: 28px;
        width: 116px;
        font-size: 20px;
        text-align: center;
        padding: 11px 0;
      }
    }
    .go-login-btn {
      box-sizing: border-box;
      float: right;
      width: 236px;
      height: 54px;
      text-align: center;
      border-radius: 12px;
      border: 1px solid #00bebd;
      font-size: 16px;
      font-weight: 400;
      color: #00a6a7;
      line-height: 22px;
      padding: 15px 0;
      transition: all 0.2s linear;
    }
  }
}
</style>
  