# HelloTalk 商业化 Paywall 重建与可视化搭建引擎 Demo

## 🌐 唯一官方有效在线演示地址
👉 **[https://zhangbaoyue813.github.io/adapty-paywall-rebuild-demo/](https://zhangbaoyue813.github.io/adapty-paywall-rebuild-demo/)**

> ⚠️ **历史地址作废声明**：  
> 原 Vercel 测试体验地址（`hellotalk-paywall-components-demo.vercel.app`、`hellotalk-paywall-studio.vercel.app` 等）**已正式全面作废下线**，后续所有最新功能、排错优化与演示内容**仅在上述唯一 GitHub Pages 官方地址独家发布与维护**。

---

## 🛠️ 本地运行开发

```bash
npm install
npm run dev
```

本地服务默认地址：`http://localhost:3018`

---

## 🚀 核心架构与功能特性
1. **三栏低代码可视化搭建引擎**：左侧图层大纲树 + 中间高保真 iPhone 375×812 解释器画布 + 右侧自适应属性检查器。
2. **官方业务落地页 1:1 像素级复刻**：
   - 模版四·单张样式（沉浸波浪顶栏、吉祥物智能对齐避让、3天试用时间轴、双套餐/横向三列切换）。
   - 模版五·多张轮播图（特权流、到期前提醒、套餐选择、指示条联动）。
   - VIP 分级对比页（普通会员 vs VIP / VIP+ 浅色与暗夜极光双主题切换）。
   - SKU 半窗（正宗下半屏 Bottom Sheet、暗色蒙层）。
   - 内容 Paywall 样式与规则双后台（复刻表现层 View 与策略引擎 Policy Engine 架构）。
3. **千人千面数据注水**：支持 `{用户昵称}`、`{附近语伴数}` 等动态插槽，内置学员画像模拟器实时解析。
4. **低代码闭环工具**：支持 **「[📥 导出配置 JSON]」** 与 **「[📤 导入草稿 JSON]」**。
5. **工程化资产沉淀**：内置 `.agents/skills/paywall-visual-builder/` 技能规范包与 `validate_schema.js` 安检脚本。
