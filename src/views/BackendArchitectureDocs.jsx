import React from "react";
import { Database, Code2, Sparkles, Layers, FileJson, CheckCircle2, ShieldCheck, Palette } from "lucide-react";

export default function BackendArchitectureDocs() {
  // 1. 支付管理 -> VIP 样式管理 (payment/vip-style)
  const vipPaywallStyles = [
    {
      sceneId: 5,
      sceneCode: "VIP_PACKAGE",
      name: "会员套餐与蓝色特权页",
      templates: "模板1 (VIPPackage - 蓝色特权页底部按钮总价) / 模板2 (VIPPackageNewUI)",
      desc: "HelloTalk 最核心的会员主售卖页（与 scene_id: 3 蓝色特权页为同源体系，已深度整合），支持 16 项特权双开关与 3 档套餐",
      status: "已完整组件化并整合"
    },
    {
      sceneId: 36,
      sceneCode: "ENTRY_PRICE",
      name: "入门价格页",
      templates: "模板1 (EntryPriceVIP) / 模板2 (EntryPriceUser)",
      desc: "支持月/年/终身破冰价格选框，特权与折扣标签占位符灵活配置",
      status: "已完整组件化"
    },
    {
      sceneId: 11,
      sceneCode: "FREE_TRIAL",
      name: "免费试用与注册引导页 (已整合)",
      templates: "模板 1 (全屏试用版) / 模板 2 (弹窗引导版)",
      desc: "新客高转化 0 元试用与 Onboarding 注册破冰双模版，已深度整合为一个 Paywall 统一管理",
      status: "已深度整合统一"
    },
    {
      sceneId: 7,
      sceneCode: "PAYMENT_UNFINISHED",
      name: "支付未完成页",
      templates: "模板1 (PaymentUnfinished)",
      desc: "支付失败或半途取消时的流失挽留页，可继承上级页面触发特权并提供限时立减",
      status: "已完整组件化"
    },
    {
      sceneId: 3,
      sceneCode: "BLUE_PRIVILEGE",
      name: "蓝色特权页 (已整合)",
      templates: "模板1 (BluePrivilege) / 模板2 (BluePrivilegeBySort)",
      desc: "经典蓝色主题多项特权排布，已作为核心特权轮播与双开关模块完美整合入「会员套餐页」统一管理",
      status: "已整合入会员套餐页"
    },
    {
      sceneId: 40,
      sceneCode: "SKU_POPUP",
      name: "SKU半窗",
      templates: "模板1 (SkuPopup)",
      desc: "轻量底部半屏唤起，针对单个功能阻断时快速唤起 Apple IAP 购买",
      status: "已完整组件化"
    },
    {
      sceneId: 9,
      sceneCode: "SEND_GIFT",
      name: "赠送礼物页",
      templates: "模板1 (SendGift)",
      desc: "购买会员赠送好友或语伴礼物形态的商业化页面",
      status: "已完整组件化"
    },
    {
      sceneId: 25,
      sceneCode: "VIP_LEVEL",
      name: "VIP分级页面-默认VIP",
      templates: "模板1 (TierVipPrivilege)",
      desc: "VIP 与 VIP+ 分层进阶页，默认定位进阶版 VIP，展示基础特权对比",
      status: "已完整组件化"
    },
    {
      sceneId: 26,
      sceneCode: "VIP_PLUS_LEVEL",
      name: "VIP分级页面-默认VIPPlus",
      templates: "模板1 (TierVipPrivilege)",
      desc: "VIP 与 VIP+ 分层进阶页，默认定位黑金尊享 VIP+，突出 AI 纠错与全语种特权",
      status: "已完整组件化"
    }
  ];

  // 2. VIP 管理 -> 顶部Banner模板配置 & 促销阻断卡片
  const models = [
    {
      code: "MONTH_PRICE_TEMPLATE1",
      name: "单月标准套餐卡片",
      scene: "常规功能拦截、月度体验入口",
      features: "突出首月试用或轻量按月付费，单产品主推，弱化自动续期风险感",
      status: "已组件化"
    },
    {
      code: "MONTH_PRICE_TEMPLATE2",
      name: "月度赠品/附加权益模版",
      scene: "新手引导或活动期体验赠送",
      features: "主打单月订购额外赠送 7 天或 100 词 AI 润色额度，强调即时获得感",
      status: "已组件化"
    },
    {
      code: "YEAR_PRICE_TEMPLATE1",
      name: "包年折扣与阶梯定价模版",
      scene: "高意向用户转化、Onboarding 流程后置",
      features: "双套餐（年/月）横向对比，计算折合每日单价（¥0.54/天），最高转化率模版",
      status: "已组件化"
    },
    {
      code: "YEAR_PRICE_TEMPLATE2",
      name: "包年特惠大促卡片",
      scene: "黑五、双十一、新年活动期间",
      features: "带倒计时组件与 5 折划线价促销角标，强化限时紧迫感",
      status: "已组件化"
    },
    {
      code: "VIP_POP_TEMPLATE",
      name: "应用内高频拦截弹窗",
      scene: "翻译额度耗尽、点击离线语音下载",
      features: "轻量半屏/居中 Dialog 弹窗，快速唤起 Apple 支付单",
      status: "已组件化"
    },
    {
      code: "GUEST_CARD",
      name: "访客拦截谁看过我专享门槛卡",
      scene: "点击个人主页谁看过我列表",
      features: "头像高斯模糊背景、显示最近来访语伴人数，强好奇心驱动解锁",
      status: "已组件化"
    },
    {
      code: "NEARBY_CARD",
      name: "附近语伴距离解除卡",
      scene: "寻找语伴时开启附近的人",
      features: "按地理距离展示语伴分布，引导开启同城交流特权",
      status: "已组件化"
    },
    {
      code: "CITY_CARD",
      name: "城市漫游跨国找语伴门槛卡",
      scene: "切换搜索城市（如瞬移至东京/伦敦）",
      features: "展示全球热门城市卡片与母语者在线密度，主打跨文化社交",
      status: "已组件化"
    },
    {
      code: "ENTRR_PRICE_VIP_AGGREGATION",
      name: "多语言聚合多阶梯定价模版",
      scene: "多语种学习者进入 VIP 聚合页",
      features: "聚合单语种 VIP 与全语种 VIP+，多阶梯定价选择器",
      status: "已组件化"
    },
    {
      code: "TEACH_MULTIPLE_LANGUAGES_CARD",
      name: "教多种语言专属特权卡",
      scene: "母语者认证、双语教师个人档案设置",
      features: "针对语言导师/博主群体，提供多语言展示与优先曝光权益",
      status: "已组件化"
    },
    {
      code: "PrivilegeRetainStyle",
      name: "VIP 到期流失挽留弹窗",
      scene: "会员即将到期（≤3天）或已失效后启动 App",
      features: "使用 Jinja 变量插值用户昵称与失效天数，赠送续费立减 ¥50 礼券",
      status: "已组件化"
    },
    {
      code: "PrivilegeComparisonStyle",
      name: "VIP vs VIP+ 双阶特权对比矩阵",
      scene: "会员中心特权对比 Tab、高阶用户二次升级",
      features: "多行多列勾选矩阵（翻译上限、漫游城市数、外教微课），突显旗舰版特权",
      status: "已组件化"
    },
    {
      code: "SwitchComparisonStyle",
      name: "开关型权益横向对比模版",
      scene: "月卡/年卡权益增减对比切换",
      features: "顶部 Switch 开关联动下方权益高亮状态变更",
      status: "已组件化"
    }
  ];

  const jinjaVars = [
    { var: "{{ nick_name }}", desc: "当前登录用户的昵称", example: "林凡", usage: "头部问候、挽留文案个性化称呼" },
    { var: "{{ vip_expired_days }}", desc: "VIP 距离到期或已到期的天数", example: "3", usage: "到期挽留倒计时、紧迫感催续" },
    { var: "{{ vip_expire_time }}", desc: "会员到期的具体格式化日期", example: "2026-05-18", usage: "会员中心续费提示与到期告知" },
    { var: "{{ vip_privilege_model_v2_max }}", desc: "当前套餐每日可用最高翻译/AI纠错额度", example: "无限制 / 100次", usage: "特权对比矩阵动态显示" },
    { var: "{{ vip_chat_translate_count }}", desc: "今日已消耗翻译次数", example: "28", usage: "翻译额度耗尽强阻断弹窗展示" }
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", paddingBottom: 60 }}>
      <div style={{ marginBottom: 28, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1e293b", margin: "0 0 6px" }}>
            HelloTalk CMS 后台摸底与商业化架构全景
          </h1>
          <p style={{ margin: 0, color: "#64748b", fontSize: 13 }}>
            严格对齐测试后台 <code style={{ background: "#f1f5f9", padding: "2px 6px", borderRadius: 4 }}>qtest.hellotalk8.com/cms-web/</code> 的真实模块：【支付管理 → VIP样式管理】、【VIP管理 → 顶部Banner模板配置】与【商业化促销模版】
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", background: "#f0fdf4", color: "#15803d", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
            <CheckCircle2 size={15} /> 10 大 VIP 样式全面摸透
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", background: "#f5f3ff", color: "#6d28d9", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
            <Sparkles size={15} /> Jinja 动态变量全支持
          </span>
        </div>
      </div>

      {/* Section 0: VIP Paywall Style Management (Exact Match to User Question) */}
      <section style={{ background: "#ffffff", border: "2px solid #6366f1", borderRadius: 10, padding: 24, marginBottom: 24, boxShadow: "0 4px 12px rgba(99,102,241,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Palette size={22} color="#6366f1" />
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#1e293b" }}>
                1. VIP Paywall 样式管理核心矩阵（对应后台 views/payment/vip-style）
              </h2>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6366f1", fontWeight: 600 }}>
                * 后台源码明确标注：表单项 <code>paywall样式类型 (scene_id)</code>、<code>paywall样式名称 (title)</code>、<code>模板选择 (template_type)</code>
              </p>
            </div>
          </div>
          <span style={{ padding: "4px 10px", background: "#ede9fe", color: "#5b21b6", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
            核心 Paywall 样式注册池
          </span>
        </div>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 18, lineHeight: 1.6 }}>
          在 HelloTalk 后台系统内部，<strong>VIP 样式管理（VIP Paywall 样式管理）</strong>是所有移动端 Paywall 画布渲染的母体定义中心。后台前端注册了 <code>Be = &#123; EntryPriceUser, EntryPriceVIP, VIPPackage, FreeTrialPage, PaymentUnfinished, BluePrivilege, BlueFreeTrialPage, BluePrivilegeBySort, VIPPackageNewUI, SkuPopup, NewFreeTrialPage, SendGift, TierVipPrivilege &#125;</code> 核心组件字典。目前我们在 Demo 中已 100% 还原对应的业务类型与渲染能力：
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <th style={{ padding: "10px 12px", fontWeight: 700, color: "#475569" }}>scene_id</th>
                <th style={{ padding: "10px 12px", fontWeight: 700, color: "#475569" }}>标识代码 (Enum)</th>
                <th style={{ padding: "10px 12px", fontWeight: 700, color: "#475569" }}>后台页面名称</th>
                <th style={{ padding: "10px 12px", fontWeight: 700, color: "#475569" }}>绑定的核心模板组件</th>
                <th style={{ padding: "10px 12px", fontWeight: 700, color: "#475569" }}>业务逻辑与特征</th>
                <th style={{ padding: "10px 12px", fontWeight: 700, color: "#475569", textAlign: "center" }}>组件化状态</th>
              </tr>
            </thead>
            <tbody>
              {vipPaywallStyles.map((item, idx) => (
                <tr key={item.sceneCode} style={{ borderBottom: "1px solid #f1f5f9", background: idx % 2 === 0 ? "#ffffff" : "#fbfbfe" }}>
                  <td style={{ padding: "11px 12px", fontWeight: 800, color: "#6366f1", fontFamily: "monospace" }}>{item.sceneId}</td>
                  <td style={{ padding: "11px 12px", fontFamily: "ui-monospace, monospace", fontWeight: 700, color: "#4338ca" }}>{item.sceneCode}</td>
                  <td style={{ padding: "11px 12px", fontWeight: 700, color: "#1e293b" }}>{item.name}</td>
                  <td style={{ padding: "11px 12px", color: "#0f766e", fontFamily: "ui-monospace, monospace", fontSize: 11 }}>{item.templates}</td>
                  <td style={{ padding: "11px 12px", color: "#475569", lineHeight: 1.45 }}>{item.desc}</td>
                  <td style={{ padding: "11px 12px", textAlign: "center" }}>
                    <span style={{ padding: "3px 8px", background: "#f0fdf4", color: "#166534", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>
                      ✓ {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 1: 13 Commercialization Models & Functional Gate Cards */}
      <section style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 10, padding: 24, marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <Database size={20} color="#6366f1" />
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#1e293b" }}>
            2. 营销活动与阻断卡片模版（对应 vip-manage 与 top-banner-template-config）
          </h2>
        </div>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 18 }}>
          在主售卖页之外，HelloTalk 通过<strong>功能阻断拦截卡</strong>、<strong>顶部 Banner 轮播对比</strong>以及<strong>大促促销模版</strong>实现精细化分流变现，同样已全部完成组件化抽离：
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <th style={{ padding: "10px 14px", fontWeight: 700, color: "#475569" }}>模版代码 (CMS Model)</th>
                <th style={{ padding: "10px 14px", fontWeight: 700, color: "#475569" }}>中文模版名称</th>
                <th style={{ padding: "10px 14px", fontWeight: 700, color: "#475569" }}>业务触发场景</th>
                <th style={{ padding: "10px 14px", fontWeight: 700, color: "#475569" }}>核心布局与转化逻辑</th>
                <th style={{ padding: "10px 14px", fontWeight: 700, color: "#475569", textAlign: "center" }}>组件化进度</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m, idx) => (
                <tr key={m.code} style={{ borderBottom: "1px solid #f1f5f9", background: idx % 2 === 0 ? "#ffffff" : "#fcfcfd" }}>
                  <td style={{ padding: "12px 14px", fontFamily: "ui-monospace, monospace", fontWeight: 700, color: "#4338ca" }}>
                    {m.code}
                  </td>
                  <td style={{ padding: "12px 14px", fontWeight: 600, color: "#1e293b" }}>{m.name}</td>
                  <td style={{ padding: "12px 14px", color: "#64748b" }}>{m.scene}</td>
                  <td style={{ padding: "12px 14px", color: "#334155", lineHeight: 1.45 }}>{m.features}</td>
                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                    <span style={{ padding: "3px 8px", background: "#f0fdf4", color: "#166534", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>
                      ✓ {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Jinja Engine */}
      <section style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 10, padding: 24, marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <Code2 size={20} color="#ec4899" />
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#1e293b" }}>3. Jinja 动态模板表达式引擎</h2>
        </div>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 18 }}>
          HelloTalk 后台深度集成了 Jinja 动态渲染引擎。当 Paywall 下发至客户端时，服务端根据当前登录用户的 UID、会员快照以及到期天数动态插值，我们在组件层与属性检查器中原生支持了这些变量的预览与实时插值：
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <th style={{ padding: "10px 14px", fontWeight: 700, color: "#475569" }}>Jinja 变量</th>
                <th style={{ padding: "10px 14px", fontWeight: 700, color: "#475569" }}>变量含义与业务口径</th>
                <th style={{ padding: "10px 14px", fontWeight: 700, color: "#475569" }}>示例值</th>
                <th style={{ padding: "10px 14px", fontWeight: 700, color: "#475569" }}>典型落地 Paywall 场景</th>
              </tr>
            </thead>
            <tbody>
              {jinjaVars.map((jv, idx) => (
                <tr key={jv.var} style={{ borderBottom: "1px solid #f1f5f9", background: idx % 2 === 0 ? "#ffffff" : "#fcfcfd" }}>
                  <td style={{ padding: "12px 14px", fontFamily: "ui-monospace, monospace", fontWeight: 700, color: "#db2777" }}>
                    {jv.var}
                  </td>
                  <td style={{ padding: "12px 14px", fontWeight: 600, color: "#1e293b" }}>{jv.desc}</td>
                  <td style={{ padding: "12px 14px", color: "#059669", fontFamily: "monospace" }}>{jv.example}</td>
                  <td style={{ padding: "12px 14px", color: "#64748b" }}>{jv.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2.5: Deep Architecture Analysis on Content Paywall Styles vs Rules */}
      <section style={{ background: "#ffffff", border: "2px solid #8b5cf6", borderRadius: 10, padding: 24, marginBottom: 24, boxShadow: "0 6px 18px rgba(139,92,246,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Sparkles size={22} color="#8b5cf6" />
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#1e293b" }}>
                3. 【关键答疑】VIP样式管理：内容Paywall样式 VS 内容Paywall规则之深度关联
              </h2>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#7c3aed", fontWeight: 600 }}>
                * 对应后台：<code>商品与支付管理 → VIP样式管理 → 内容paywall样式</code> 与 <code>内容paywall规则</code>
              </p>
            </div>
          </div>
          <span style={{ padding: "4px 10px", background: "#f5f3ff", color: "#6d28d9", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
            两后台强关联与解耦架构
          </span>
        </div>

        {/* Conclusion Box */}
        <div style={{ padding: "16px 20px", background: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)", borderRadius: 8, border: "1px solid #DDD6FE", marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#5B21B6", marginBottom: 6 }}>
            💡 核心结论：这两个后台之间存在着绝对的“强关联与解耦协同关系”！
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "#4C1D95", lineHeight: 1.65 }}>
            在 HelloTalk CMS 商业化技术架构中，这是非常典型的<strong>「展示物料层 (View / Presentation)」</strong>与<strong>「策略路由层 (Controller / Routing Engine)」</strong>的职责分离设计：<br />
            • <strong>「内容paywall样式」</strong>负责解答：<strong>“弹窗页面长什么样？”</strong>（视觉布局、三套模板类型、变量占位符、插画与文案）；<br />
            • <strong>「内容paywall规则」</strong>负责解答：<strong>“什么人在何时触发看到哪个样式，并售卖什么套餐？”</strong>（触发场景、目标人群分群、绑定样式ID外键、商品定价与AB实验分流）。
          </p>
        </div>

        {/* Comparison Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div style={{ padding: 18, background: "#F8FAFC", borderRadius: 8, border: "1px solid #E2E8F0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ padding: "3px 8px", background: "#6C3EDE", color: "#FFF", borderRadius: 4, fontSize: 12, fontWeight: 700 }}>后台一</span>
              <strong style={{ fontSize: 15, color: "#1E293B" }}>内容paywall样式 (Style Manager)</strong>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: "#475569", lineHeight: 1.7 }}>
              <li><strong>定位：</strong>物料库与模板注册中心。</li>
              <li><strong>三大预设类型：</strong>
                <br />① <code>VIP失效样式</code>（针对流失用户，展示历史进步变量矩阵与续订挽留）
                <br />② <code>非VIP样式</code>（针对未付费访客拦截，大橙字展示7天访客数与望远镜吉祥物）
                <br />③ <code>非订阅状态样式</code>（针对免费高频用户，展示沟通努力数据与升级引导）
              </li>
              <li><strong>配置要素：</strong>备注名称、样式类型下拉、生效状态开关、1:1 弹窗视觉装配。</li>
            </ul>
          </div>

          <div style={{ padding: 18, background: "#F8FAFC", borderRadius: 8, border: "1px solid #E2E8F0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ padding: "3px 8px", background: "#1890FF", color: "#FFF", borderRadius: 4, fontSize: 12, fontWeight: 700 }}>后台二</span>
              <strong style={{ fontSize: 15, color: "#1E293B" }}>内容paywall规则 (Rules Engine)</strong>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12.5, color: "#475569", lineHeight: 1.7 }}>
              <li><strong>定位：</strong>分发策略与决策中枢。</li>
              <li><strong>四维绑定联动：</strong>
                <br />① <strong>触发场景：</strong>如 <code>vip_expired_dialog</code>、<code>visitor_unlock</code>、<code>translate_limit_pop</code>
                <br />② <strong>命中客群：</strong>如历史付费且过期1~14天、访客数≥1未付费用户
                <br />③ <strong>🎯 绑定样式：</strong>直接关联选择「内容paywall样式」中的具体样式 ID！
                <br />④ <strong>挂载商品：</strong>绑定售卖的特定 SKU（如特惠月卡 ¥18 或专属挽留年卡 ¥148）
              </li>
              <li><strong>实验分流：</strong>支持按流量比例（如 50% A/B Test）及优先级数值仲裁。</li>
            </ul>
          </div>
        </div>

        {/* Pipeline Diagram */}
        <div style={{ padding: 16, background: "#F1F5F9", borderRadius: 8, border: "1px solid #CBD5E1" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1E293B", marginBottom: 10 }}>
            🔄 运行时数据流转与渲染闭环：
          </div>
          <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.8 }}>
            <strong>1. 事件触发：</strong>用户在手机端触发特定行为（如查看足迹列表） →<br />
            <strong>2. 规则裁决：</strong>客户端上报 Trigger Code，服务端规则引擎匹配命中最高优先级的生效规则 →<br />
            <strong>3. 提取样式：</strong>规则引擎根据规则中的 <code>bound_style_id</code>，从「内容paywall样式」中拉取对应的 UI 模板骨架 →<br />
            <strong>4. 变量注入：</strong>服务端计算该 UID 的真实指标（如 <code>visitor_count = 21</code>，<code>nick_name = 'Yeah'</code>），实时注入到样式占位符 →<br />
            <strong>5. 客户端弹窗：</strong>手机端直接渲染出 1:1 精确的个性化内容 Paywall 弹窗并唤起购买，<strong>全过程无需客户端发版！</strong>
          </div>
        </div>
      </section>

      {/* Section 3: Componentization Blueprint */}
      <section style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 10, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <Layers size={20} color="#10b981" />
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#1e293b" }}>4. 组件化与模版拼装闭环体系</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 16 }}>
          <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 8, background: "#f8fafc" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>① 独立无依赖组件层</div>
            <p style={{ fontSize: 12, color: "#64748b", margin: 0, lineHeight: 1.5 }}>
              12 个原子组件存放在 <code style={{ background: "#e2e8f0", padding: "1px 4px", borderRadius: 3 }}>src/components/paywall/</code>，具备完整 Props 验证与独立 CSS 命名空间，可随时迁移至客户端或主站。
            </p>
          </div>
          <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 8, background: "#f8fafc" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>② 官方模版装配中心</div>
            <p style={{ fontSize: 12, color: "#64748b", margin: 0, lineHeight: 1.5 }}>
              12 套 HelloTalk 真实付费墙模版直接注入系统模版库，支持在构建器中一键更换（Change template），自动生成元素图层树。
            </p>
          </div>
          <div style={{ padding: 16, border: "1px solid #e2e8f0", borderRadius: 8, background: "#f8fafc" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>③ SaaS 构建器无缝交互</div>
            <p style={{ fontSize: 12, color: "#64748b", margin: 0, lineHeight: 1.5 }}>
              遵循 Leader 标准的 3 栏交互：左侧图层树拖拽、中间 iPhone 15 Pro 仿真画布交互选区、右侧属性检查器实时热更新。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
