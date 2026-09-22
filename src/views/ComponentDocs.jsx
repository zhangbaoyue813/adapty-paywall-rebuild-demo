import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, FileCode, Check } from "lucide-react";

const COMPONENTS_AUDIT_DATA = [
  {
    id: "HeaderTitle",
    name: "标题与副标题组件",
    status: "需修改 (已改造完成)",
    statusType: "warning",
    origin: "原 Demo 的 Text",
    reason: "原 Demo 只有单行静态文本；HelloTalk 核心业务必须依赖 Jinja 变量插值（如 {{nick_name}}、{{vip_expired_days}}）以及副标题与徽章支持。",
    props: ["title", "subtitle", "kicker", "align", "color", "jinjaVars"],
    rebuilt: "已重构为 HeaderTitle.jsx，原生支持 Jinja 解析与中英多语言。"
  },
  {
    id: "HeroMedia",
    name: "头图与背景视频组件",
    status: "直接可用",
    statusType: "success",
    origin: "原 Demo 的 Hero Image",
    reason: "结构完整，支持图片/视频无缝切换、渐变遮罩、圆角与自定义高度，与后台背景配置 1:1 契合。",
    props: ["mediaUrl", "mediaType", "height", "overlay", "overlayOpacity"],
    rebuilt: "已提取为独立组件 HeroMedia.jsx。"
  },
  {
    id: "CloseNavigation",
    name: "导航与关闭组件",
    status: "直接可用",
    statusType: "success",
    origin: "原 Demo 的 Close",
    reason: "符合苹果规范，提供清晰退出路径与恢复购买（Restore Purchases）入口。",
    props: ["position", "styleType", "theme", "showRestore", "onClose"],
    rebuilt: "已重构为 CloseNavigation.jsx，支持左返回/右关闭双模式。"
  },
  {
    id: "BadgeTag",
    name: "促销角标组件",
    status: "需修改 (已改造完成)",
    statusType: "warning",
    origin: "原 Demo 的 Discount 伪层",
    reason: "原 Demo 把折扣写死为固定文本，不支持胶囊标（Save 50%）、斜角彩带（Today only）等高转化变体。",
    props: ["text", "variant", "bgColor", "textColor"],
    rebuilt: "已重构为 BadgeTag.jsx，支持 pill 与 ribbon 多种形态。"
  },
  {
    id: "BenefitList",
    name: "特权卖点列表组件",
    status: "需修改 (已改造完成)",
    statusType: "warning",
    origin: "原 Demo 的 List / List Item",
    reason: "原 Demo 仅支持单列排版。HelloTalk 业务中有大量的 2x2 宫格（如附近人特权）与时间线（试用倒计）场景。",
    props: ["items", "layoutMode (vertical/grid/timeline)", "iconColor"],
    rebuilt: "已重构为 BenefitList.jsx，支持 vertical, grid, timeline 三种排版切换。"
  },
  {
    id: "ComparisonTable",
    name: "特权对比矩阵组件",
    status: "需重写 (已全新开发)",
    statusType: "danger",
    origin: "原 Demo 无此组件",
    reason: "HelloTalk VIP vs VIP+ 双阶特权是最高频的商业化升级入口，原 Demo 缺失对比表组件。",
    props: ["tiers", "features", "locale"],
    rebuilt: "已全新编写 ComparisonTable.jsx，支持 2 阶 / 3 阶勾选矩阵对比。"
  },
  {
    id: "ProductTiers",
    name: "套餐价格选择器",
    status: "需重写 (已全新开发)",
    statusType: "danger",
    origin: "原 Demo 的 Products (致命弱实现)",
    reason: "原 Demo 仅用字符串管道符 '|' 粗暴分割，不支持按天折算（¥0.38/天）、不支持多币种、无推荐选中高亮体系。",
    props: ["products", "selectedId", "layout", "onSelect"],
    rebuilt: "已彻底重写为数据驱动的标准套餐选择器 ProductTiers.jsx，支持日单价折算与推荐高亮。"
  },
  {
    id: "CountdownTimer",
    name: "限时倒计时组件",
    status: "需修改 (已改造完成)",
    statusType: "warning",
    origin: "原 Demo 的 Timer",
    reason: "原 Demo 只是静态文本倒计，倒计时归零时没有业务事件回调。",
    props: ["initialSeconds", "label", "bgColor", "textColor", "onExpire"],
    rebuilt: "已重构为 CountdownTimer.jsx，支持真实计时与 onExpire 到期回调。"
  },
  {
    id: "CTAButton",
    name: "主行动购买按钮",
    status: "需修改 (已改造完成)",
    statusType: "warning",
    origin: "原 Demo 的 Purchase Button",
    reason: "仅支持单行文字，无法呈现高转化的双行文案（主标题：立即开启试用；副标题：随后 ¥198/年，随时取消）。",
    props: ["title", "subTitle", "variant", "gradient", "loading", "onClick"],
    rebuilt: "已重构为 CTAButton.jsx，支持双行排版与 Loading 态。"
  },
  {
    id: "TrialToggle",
    name: "试用切换开关",
    status: "需修改 (已改造完成)",
    statusType: "warning",
    origin: "原 Demo 的 Toggle",
    reason: "原代码逻辑脆弱，缺乏与选中商品价位的联动。",
    props: ["enabled", "title", "subtitle", "onToggle"],
    rebuilt: "已重构为 iOS 原生质感的 TrialToggle.jsx。"
  },
  {
    id: "SocialProof",
    name: "社会背书与好评轮播",
    status: "需修改 (已改造完成)",
    statusType: "warning",
    origin: "原 Demo 的 Carousel",
    reason: "原 Demo 写死评价结构，无五星评分胶囊模式。",
    props: ["type", "reviews", "rating", "autoPlay"],
    rebuilt: "已重构为 SocialProof.jsx，支持自动翻页好评与星级背书。"
  },
  {
    id: "LegalFooter",
    name: "合规法律条款组件",
    status: "直接可用",
    statusType: "success",
    origin: "原 Demo 的 Links",
    reason: "满足苹果 App Store 审查的隐私条款与恢复购买规定。",
    props: ["termsUrl", "privacyUrl", "showRestore", "disclaimer"],
    rebuilt: "已提取并规范化为 LegalFooter.jsx。"
  }
];

export default function ComponentDocs() {
  return (
    <div className="component-docs-page p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          HelloTalk 通用 Paywall 组件清单与现有代码评估报告
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          逐项比对 GitHub 仓库 AI 扒下的代码 vs HelloTalk 真实业务需求，明确可用性并完成现代化重构。
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold">
            <tr>
              <th className="p-3">组件名称</th>
              <th className="p-3">现有代码来源</th>
              <th className="p-3">评估结论</th>
              <th className="p-3">存在缺陷与原因分析</th>
              <th className="p-3">输入参数 (Props)</th>
              <th className="p-3">重构结果</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {COMPONENTS_AUDIT_DATA.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/60 transition">
                <td className="p-3 font-semibold text-gray-900">
                  {item.name}
                  <div className="text-gray-400 font-mono text-[11px] mt-0.5">{item.id}</div>
                </td>
                <td className="p-3 text-gray-600">{item.origin}</td>
                <td className="p-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${
                      item.statusType === "success"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : item.statusType === "warning"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {item.statusType === "success" && <CheckCircle2 size={12} />}
                    {item.statusType === "warning" && <AlertTriangle size={12} />}
                    {item.statusType === "danger" && <XCircle size={12} />}
                    {item.status}
                  </span>
                </td>
                <td className="p-3 text-gray-700 max-w-xs">{item.reason}</td>
                <td className="p-3 font-mono text-[11px] text-gray-500 max-w-[180px]">
                  {item.props.join(", ")}
                </td>
                <td className="p-3 text-emerald-700 font-medium">{item.rebuilt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
