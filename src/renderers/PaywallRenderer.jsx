import React, { useState } from "react";
import HeaderTitle from "../components/paywall/HeaderTitle";
import HeroMedia from "../components/paywall/HeroMedia";
import CloseNavigation from "../components/paywall/CloseNavigation";
import BadgeTag from "../components/paywall/BadgeTag";
import BenefitList from "../components/paywall/BenefitList";
import ComparisonTable from "../components/paywall/ComparisonTable";
import SocialProof from "../components/paywall/SocialProof";
import ProductTiers from "../components/paywall/ProductTiers";
import CountdownTimer from "../components/paywall/CountdownTimer";
import CTAButton from "../components/paywall/CTAButton";
import TrialToggle from "../components/paywall/TrialToggle";
import LegalFooter from "../components/paywall/LegalFooter";

const COMPONENT_REGISTRY = {
  HeaderTitle,
  HeroMedia,
  CloseNavigation,
  BadgeTag,
  BenefitList,
  ComparisonTable,
  SocialProof,
  ProductTiers,
  CountdownTimer,
  CTAButton,
  TrialToggle,
  LegalFooter,
};

export default function PaywallRenderer({
  template,
  locale = "zh-CN",
  jinjaVars = {
    nick_name: "Alex",
    vip_expired_days: 12,
    visitor_count: 36,
  },
  onClose,
  onAction,
}) {
  if (!template) {
    return <div className="p-8 text-center text-gray-500">未选择任何模版</div>;
  }

  const [selectedProductId, setSelectedProductId] = useState(() => {
    const productComponent = template.components?.find((c) => c.type === "ProductTiers");
    const rec = productComponent?.props?.products?.find((p) => p.isRecommended);
    return rec ? rec.id : productComponent?.props?.products?.[0]?.id;
  });

  const [trialEnabled, setTrialEnabled] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  const handleCtaClick = () => {
    setLoadingAction(true);
    setTimeout(() => {
      setLoadingAction(false);
      alert(`已模拟触发订阅支付链路！\n选中商品 ID: ${selectedProductId}\n当前模版: ${template.name}`);
      if (onAction) onAction({ template, selectedProductId });
    }, 600);
  };

  const isDark = template.theme === "dark";

  return (
    <div
      className={`paywall-container ${isDark ? "theme-dark" : "theme-light"}`}
      style={{
        background: template.bgGradient || (isDark ? "#121316" : "#FFFFFF"),
      }}
    >
      <div className="paywall-scroll-area">
        {template.components?.map((item, idx) => {
          const Comp = COMPONENT_REGISTRY[item.type];
          if (!Comp) {
            return (
              <div key={idx} className="paywall-unknown-comp">
                未知组件: {item.type}
              </div>
            );
          }

          // Inject runtime states for specific components
          let injectedProps = {
            ...item.props,
            locale,
            jinjaVars,
          };

          if (item.type === "CloseNavigation") {
            injectedProps.onClose = onClose || (() => alert("点击关闭 / 退出"));
            injectedProps.onRestore = () => alert("已触发恢复购买 (Restore Purchases)");
          }

          if (item.type === "ProductTiers") {
            injectedProps.selectedId = selectedProductId;
            injectedProps.onSelect = (id) => setSelectedProductId(id);
          }

          if (item.type === "TrialToggle") {
            injectedProps.enabled = trialEnabled;
            injectedProps.onToggle = (val) => setTrialEnabled(val);
          }

          if (item.type === "CTAButton") {
            injectedProps.loading = loadingAction;
            injectedProps.onClick = handleCtaClick;
          }

          if (item.type === "LegalFooter") {
            injectedProps.onRestore = () => alert("已触发恢复购买 (Restore Purchases)");
          }

          return <Comp key={`${item.type}-${idx}`} {...injectedProps} />;
        })}
      </div>
    </div>
  );
}
