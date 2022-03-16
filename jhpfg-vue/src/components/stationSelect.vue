<template>
  <el-cascader
    v-model="value"
    :options="options"
    :props="{ expandTrigger: 'hover' }"
    filterable
    @change="handleChange"
  ></el-cascader>
</template>

<script>
export default {
  props:{
    value:Array
  },
  data() {
    return {
      options: [
        {
          value: "互联网技术",
          label: "互联网技术",
          children: [
            {
              value: "后端开发",
              label: "后端开发",
            },
            {
              value: "Java",
              label: "Java",
            },
            {
              value: "测试工程师",
              label: "测试工程师",
            },
            {
              value: "web前端",
              label: "web前端",
            },
            {
              value: "运维工程师",
              label: "运维工程师",
            },
            {
              value: "项目管理",
              label: "项目管理",
            },
            {
              value: "数据开发",
              label: "数据开发",
            },
            {
              value: "PHP",
              label: "PHP",
            },
            {
              value: "软件测试",
              label: "软件测试",
            },
            {
              value: "IT技术支持",
              label: "IT技术支持",
            },
            {
              value: "Android",
              label: "Android",
            },
            {
              value: "C#/.NET",
              label: "C#/.NET",
            },
            {
              value: "实施工程师",
              label: "实施工程师",
            },
            {
              value: "IOS",
              label: "IOS",
            },
            {
              value: "C++",
              label: "C++",
            },
            {
              value: "网络工程师",
              label: "网络工程师",
            },
            {
              value: "数据挖掘/机器学习",
              label: "数据挖掘/机器学习",
            },
            {
              value: "数据分析师",
              label: "数据分析师",
            },
            {
              value: "Python",
              label: "Python",
            },
            {
              value: "U3D/COCOS2DX",
              label: "U3D/COCOS2DX",
            },
            {
              value: "项目助理",
              label: "项目助理",
            },
            {
              value: "IT硬件",
              label: "IT硬件",
            },
            {
              value: "Golang",
              label: "Golang",
            },
            {
              value: "网络安全",
              label: "网络安全",
            },
            {
              value: "算法工程师",
              label: "算法工程师",
            },
            {
              value: "语音/视频/图形开发",
              label: "语音/视频/图形开发",
            },
            {
              value: "嵌入式",
              label: "嵌入式",
            },
            {
              value: "自然语言处理",
              label: "自然语言处理",
            },
            {
              value: "Node.js",
              label: "Node.js",
            },
            {
              value: "自动化",
              label: "自动化",
            },
          ],
        },
        {
          value: "互联网运营",
          label: "互联网运营",
          children: [
            {
              value: "网络客服",
              label: "网络客服",
            },
            {
              value: "直播运营",
              label: "直播运营",
            },
            {
              value: "内容运营",
              label: "内容运营",
            },
            {
              value: "产品运营",
              label: "产品运营",
            },
            {
              value: "新媒体",
              label: "新媒体",
            },
            {
              value: "用户运营",
              label: "用户运营",
            },
            {
              value: "电商运营",
              label: "电商运营",
            },
            {
              value: "游戏运营",
              label: "游戏运营",
            },
            {
              value: "文案策划",
              label: "文案策划",
            },
          ],
        },
        {
          value: "市场/传媒",
          label: "市场/传媒",
          children: [
            {
              value: "创意/策划/公共",
              label: "创意/策划/公共",
            },
            {
              value: "市场营销",
              label: "市场营销",
            },
            {
              value: "新闻/编辑",
              label: "新闻/编辑",
            },
            {
              value: "摄影/摄像",
              label: "摄影/摄像",
            },
            {
              value: "广告设计",
              label: "广告设计",
            },
            {
              value: "影视管理/发行",
              label: "影视管理/发行",
            },
            {
              value: "网络推广",
              label: "网络推广",
            },
            {
              value: "主持人/主播/DJ",
              label: "主持人/主播/DJ",
            },
            {
              value: "剪辑师",
              label: "剪辑师",
            },
            {
              value: "后期制作",
              label: "后期制作",
            },
            {
              value: "导演/编剧",
              label: "导演/编剧",
            },
          ],
        },
        {
          value: "设计",
          label: "设计",
          children: [
            {
              value: "UI设计师",
              label: "UI设计师",
            },
            {
              value: "视觉设计师",
              label: "视觉设计师",
            },
            {
              value: "平面设计",
              label: "平面设计",
            },
            {
              value: "美工",
              label: "美工",
            },
            {
              value: "游戏/动画设计",
              label: "游戏/动画设计",
            },
            {
              value: "用户体验/交互",
              label: "用户体验/交互",
            },
            {
              value: "CAD设计/制图",
              label: "CAD设计/制图",
            },
            {
              value: "3D设计师",
              label: "3D设计师",
            },
            {
              value: "插画师",
              label: "插画师",
            },
            {
              value: "原画师",
              label: "原画师",
            },
            {
              value: "服装/纺织设计",
              label: "服装/纺织设计",
            },
            {
              value: "工业设计",
              label: "工业设计",
            },
          ],
        },
        {
          value: "销售",
          label: "销售",
          children: [
            {
              value: "销售专员",
              label: "销售专员",
            },
            {
              value: "市场营销",
              label: "市场营销",
            },
            {
              value: "店员/营业员",
              label: "店员/营业员",
            },
            {
              value: "销售经理",
              label: "销售经理",
            },
            {
              value: "销售顾问",
              label: "销售顾问",
            },
            {
              value: "门店店长",
              label: "门店店长",
            },
            {
              value: "导购",
              label: "导购",
            },
          ],
        },
        {
          value: "人力行政",
          label: "人力行政",
          children: [
            {
              value: "行政专员/助理",
              label: "行政专员/助理",
            },
            {
              value: "人力资源专员/助理",
              label: "人力资源专员/助理",
            },
            {
              value: "招聘",
              label: "招聘",
            },
            {
              value: "后勤",
              label: "后勤",
            },
            {
              value: "前台",
              label: "前台",
            },
            {
              value: "助理",
              label: "助理",
            },
          ],
        },
        {
          value: "物流/仓储/运输",
          label: "物流/仓储/运输",
          children: [
            {
              value: "仓储",
              label: "仓储",
            },
            {
              value: "运输",
              label: "运输",
            },
            {
              value: "仓库管理员",
              label: "仓库管理员",
            },
            {
              value: "物流专员",
              label: "物流专员",
            },
            {
              value: "快递/配送",
              label: "快递/配送",
            },
            {
              value: "仓库文员",
              label: "仓库文员",
            },
          ],
        },
        {
          value: "互联网产品",
          label: "互联网产品",
          children: [
            {
              value: "产品经理",
              label: "产品经理",
            },
            {
              value: "产品专员",
              label: "产品专员",
            },
            {
              value: "用户研究",
              label: "用户研究",
            },
          ],
        },
        {
          value: "教育培训",
          label: "教育培训",
          children: [
            {
              value: "教师",
              label: "教师",
            },
            {
              value: "课程顾问",
              label: "课程顾问",
            },
            {
              value: "职业培训",
              label: "职业培训",
            },
            {
              value: "幼教",
              label: "幼教",
            },
            {
              value: "家教",
              label: "家教",
            },
          ],
        },
        {
          value: "财务金融",
          label: "财务金融",
          children: [
            {
              value: "财会/审计",
              label: "财会/审计",
            },
            {
              value: "银行",
              label: "银行",
            },
            {
              value: "互联网金融",
              label: "互联网金融",
            },
            {
              value: "投融资",
              label: "投融资",
            },
            {
              value: "会计",
              label: "会计",
            },
            {
              value: "风控",
              label: "风控",
            },
            {
              value: "出纳",
              label: "出纳",
            },
            {
              value: "保险",
              label: "保险",
            },
            {
              value: "证券/基金",
              label: "证券/基金",
            },
            {
              value: "投资顾问",
              label: "投资顾问",
            },
          ],
        },
        {
          value: "房地产/建筑",
          label: "房地产/建筑",
          children: [
            {
              value: "工程造价",
              label: "工程造价",
            },
            {
              value: "建筑设计师",
              label: "建筑设计师",
            },
            {
              value: "物业经理",
              label: "物业经理",
            },
            {
              value: "城规/园林",
              label: "城轨/园林",
            },
            {
              value: "土木/土建/结构工程师",
              label: "土木/土建/结构工程师",
            },
          ],
        },
        {
          value: "酒店/餐饮/旅游",
          label: "酒店/餐饮/旅游",
          children: [
            {
              value: "服务员",
              label: "服务员",
            },
            {
              value: "厨师",
              label: "厨师",
            },
            {
              value: "餐饮店长",
              label: "餐饮店长",
            },
            {
              value: "酒店前台",
              label: "酒店前台",
            },
            {
              value: "旅游服务",
              label: "旅游服务",
            },
            {
              value: "导游/讲解员",
              label: "导游/讲解员",
            },
          ],
        },
        {
          value: "采购/外贸",
          label: "采购/外贸",
          children: [
            {
              value: "采购",
              label: "采购",
            },
            {
              value: "外贸文员",
              label: "外贸文员",
            },
            {
              value: "外贸业务员",
              label: "外贸业务员",
            },
            {
              value: "贸易跟单",
              label: "贸易跟单",
            },
            {
              value: "单证员",
              label: "单证员",
            },
          ],
        },
        {
          value: "电子/电气",
          label: "电子/电气",
          children: [
            {
              value: "硬件工程师",
              label: "硬件工程师",
            },
            {
              value: "通信技术工程师",
              label: "通信技术工程师",
            },
            {
              value: "电子工程师",
              label: "电子工程师",
            },
            {
              value: "电气/自动化",
              label: "电气/自动化",
            },
          ],
        },
        {
          value: "质量/生产管理",
          label: "质量/生产管理",
          children: [
            {
              value: "质检",
              label: "质检",
            },
            {
              value: "生产营运",
              label: "生产营运",
            },
            {
              value: "生产计划管理",
              label: "生产计划管理",
            },
            {
              value: "质量管理",
              label: "质量管理",
            },
          ],
        },
        {
          value: "机械/汽车",
          label: "机械/汽车",
          children: [
            {
              value: "工艺工程师",
              label: "工艺工程师",
            },
            {
              value: "机械工程师",
              label: "机械工程师",
            },
            {
              value: "汽车美容",
              label: "汽车美容",
            },
            {
              value: "设备维护",
              label: "设备维护",
            },
            {
              value: "汽车服务顾问",
              label: "汽车服务顾问",
            },
            {
              value: "机械结构工程师",
              label: "机械结构工程师",
            },
            {
              value: "汽车工程师",
              label: "汽车工程师",
            },
            {
              value: "机械制图",
              label: "机械制图",
            },
            {
              value: "机械设计师",
              label: "机械设计师",
            },
          ],
        },
        {
          value: "生物/医疗",
          label: "生物/医疗",
          children: [
            {
              value: "健康整形",
              label: "健康整形",
            },
            {
              value: "医疗销售",
              label: "医疗销售",
            },
            {
              value: "医师/医技",
              label: "医师/医技",
            },
            {
              value: "医疗器械",
              label: "医疗器械",
            },
            {
              value: "护士",
              label: "护士",
            },
            {
              value: "生物制药",
              label: "生物制药",
            },
            {
              value: "医药研发",
              label: "医药研发",
            },
          ],
        },
        {
          value: "法律/翻译/咨询",
          label: "法律/翻译/咨询",
          children: [
            {
              value: "咨询/调研",
              label: "咨询/调研",
            },
            {
              value: "法务",
              label: "法务",
            },
            {
              value: "市场调研",
              label: "市场调研",
            },
            {
              value: "律师",
              label: "律师",
            },
            {
              value: "翻译",
              label: "翻译",
            },
          ],
        },
        {
          value: "化学化工",
          label: "化学化工",
          children: [
            {
              value: "化工工程师",
              label: "化工工程师",
            },
            {
              value: "实验室技术员",
              label: "实验室技术员",
            },
            {
              value: "化学分析",
              label: "化学分析",
            },
            {
              value: "食品/饮料研发",
              label: "食品/饮料研发",
            },
            {
              value: "材料工程师",
              label: "材料工程师",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleChange(value) {
      this.$emit("setStationValue", this.value);
    },
  },
};
</script>

<style>
</style>