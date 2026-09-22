export const PAYWALL_TEMPLATES = [
  {
    id: "onboarding_trial",
    name: "新用户注册 0 元试用破冰模版",
    category: "新客转化",
    scene: "新用户注册/冷启动",
    theme: "light",
    bgGradient: "linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 35%)",
    components: [
      {
        type: "CloseNavigation",
        props: { styleType: "close", theme: "dark", showRestore: true }
      },
      {
        type: "HeaderTitle",
        props: {
          kicker: { "zh-CN": "新手专享特权", "en": "WELCOME OFFER" },
          kickerColor: "#1ECA92",
          title: { "zh-CN": "免费开启 7 天 VIP 特权", "en": "Start 7-Day VIP Free Trial" },
          subtitle: { "zh-CN": "零门槛体验全球语伴畅聊与 AI 实时纠错", "en": "Explore unlimited global chats and AI language tools" },
          align: "center"
        }
      },
      {
        type: "BenefitList",
        props: {
          layoutMode: "vertical",
          iconColor: "#1ECA92",
          items: [
            { icon: "translate", title: { "zh-CN": "无限次文字与语音即时翻译", "en": "Unlimited Translations" }, desc: { "zh-CN": "告别每日翻译额度限制", "en": "No daily quota limits" } },
            { icon: "sparkles", title: { "zh-CN": "AI 语法助手实时纠错", "en": "Real-time AI Grammar Check" }, desc: { "zh-CN": "母语级地道表达修改建议", "en": "Sound like a native speaker" } },
            { icon: "globe", title: { "zh-CN": "全球漫游找语伴与高级筛选", "en": "Search Worldwide Partners" }, desc: { "zh-CN": "精准定位目标国家和城市", "en": "Filter by target country and city" } }
          ]
        }
      },
      {
        type: "TrialToggle",
        props: {
          enabled: true,
          title: { "zh-CN": "免费试用 7 天", "en": "7 Days Free Trial" },
          subtitle: { "zh-CN": "试用期结束前可随时在 App Store 取消，不收取任何费用", "en": "Cancel anytime in App Store without being charged" }
        }
      },
      {
        type: "ProductTiers",
        props: {
          layout: "stack",
          products: [
            {
              id: "annual_trial",
              name: { "zh-CN": "年费 VIP 会员 (赠 7 天试用)", "en": "Annual VIP (7-Day Trial)" },
              subname: { "zh-CN": "7天后扣款 ¥198/年，折合 ¥16.5/月", "en": "Then $29.99/year ($2.50/mo)" },
              price: "¥0",
              originalPrice: "¥198",
              dailyPrice: "低至 ¥0.54/天",
              tag: { "zh-CN": "最推荐", "en": "Best Value" },
              isRecommended: true
            },
            {
              id: "monthly_trial",
              name: { "zh-CN": "连续包月 VIP 会员", "en": "Monthly VIP" },
              subname: { "zh-CN": "次月起按月自动续订", "en": "Auto-renews monthly" },
              price: "¥28/月",
              dailyPrice: "¥0.93/天",
              isRecommended: false
            }
          ]
        }
      },
      {
        type: "CTAButton",
        props: {
          title: { "zh-CN": "立即免费开启 7 天试用", "en": "Start My 7-Day Free Trial" },
          subTitle: { "zh-CN": "到期后 ¥198/年，试用期间可随时取消", "en": "Then $29.99/year. Cancel anytime." },
          gradient: ["#1ECA92", "#0DA574"]
        }
      },
      {
        type: "LegalFooter",
        props: {
          disclaimer: { "zh-CN": "订阅自动续期，扣款通过 Apple ID 账户进行。可在设置中随时关闭自动续订。", "en": "Subscription auto-renews unless canceled in settings." }
        }
      }
    ]
  },
  {
    id: "feature_gate_visitors",
    name: "访客与漫游特权拦截模版 (GUEST_CARD)",
    category: "特权阻断",
    scene: "点击谁看过我/漫游找语伴时触发",
    theme: "dark",
    bgGradient: "linear-gradient(180deg, #181B22 0%, #0D0E12 100%)",
    components: [
      {
        type: "CloseNavigation",
        props: { styleType: "close", theme: "light" }
      },
      {
        type: "BadgeTag",
        props: { text: "VIP 专享特权", variant: "pill", bgColor: "#FAAD14", textColor: "#000" }
      },
      {
        type: "HeaderTitle",
        props: {
          title: { "zh-CN": "解锁谁看过了你的个人主页", "en": "Unlock Who Viewed Your Profile" },
          subtitle: { "zh-CN": "已有 {{visitor_count}} 位母语语伴在关注你，开通特权查看完整访客名单", "en": "{{visitor_count}} native speakers visited your profile. Unlock to see who they are." },
          color: "#FFFFFF",
          align: "center"
        }
      },
      {
        type: "BenefitList",
        props: {
          layoutMode: "grid",
          iconColor: "#FFC53D",
          items: [
            { icon: "zap", title: { "zh-CN": "实时访客足迹", "en": "Realtime Visitors" }, desc: { "zh-CN": "第一时间知道谁在关注你", "en": "Never miss a match" } },
            { icon: "globe", title: { "zh-CN": "全球无限漫游", "en": "Global Roaming" }, desc: { "zh-CN": "穿梭世界各地找真实语伴", "en": "Meet friends globally" } },
            { icon: "sparkles", title: { "zh-CN": "身份尊贵皇冠", "en": "VIP Badge" }, desc: { "zh-CN": "提高消息回复率 3 倍", "en": "3x higher reply rate" } }
          ]
        }
      },
      {
        type: "ProductTiers",
        props: {
          layout: "stack",
          products: [
            {
              id: "guest_vip_quarterly",
              name: { "zh-CN": "季度 VIP 会员", "en": "3 Months VIP" },
              subname: { "zh-CN": "限时加赠 15 天会员时长", "en": "+15 Days Bonus Free" },
              price: "¥68",
              originalPrice: "¥98",
              dailyPrice: "¥0.64/天",
              tag: { "zh-CN": "特权专享折扣", "en": "Special Offer" },
              isRecommended: true
            }
          ]
        }
      },
      {
        type: "CTAButton",
        props: {
          title: { "zh-CN": "立即开通并查看访客", "en": "Unlock & View Visitors" },
          gradient: ["#FFC53D", "#FA8C16"]
        }
      },
      {
        type: "CTAButton",
        props: {
          variant: "secondary",
          title: { "zh-CN": "暂不考虑", "en": "Maybe Later" }
        }
      },
      {
        type: "LegalFooter",
        props: {
          disclaimer: { "zh-CN": "开通后立即点亮 VIP 皇冠标识并解锁过往所有访客记录。", "en": "All past visitors will be revealed immediately after activation." }
        }
      }
    ]
  },
  {
    id: "black_friday_promo",
    name: "限时促销大促模版 (MONTH_PRICE_TEMPLATE1)",
    category: "大促运营",
    scene: "黑五/节日大促/促销推送 (Push / Banner)",
    theme: "dark",
    bgGradient: "linear-gradient(180deg, #1C1917 0%, #0C0A09 100%)",
    components: [
      {
        type: "CloseNavigation",
        props: { styleType: "close", theme: "light" }
      },
      {
        type: "CountdownTimer",
        props: {
          initialSeconds: 14399,
          label: "限时大促仅剩",
          bgColor: "#292524",
          textColor: "#F87171"
        }
      },
      {
        type: "BadgeTag",
        props: { text: "限时立省 60%", variant: "ribbon", bgColor: "#EF4444", textColor: "#FFFFFF" }
      },
      {
        type: "HeaderTitle",
        props: {
          title: { "zh-CN": "年度特惠 · VIP 会员狂欢", "en": "Annual Mega Sale · VIP Access" },
          subtitle: { "zh-CN": "全年最低价！一次性解锁所有顶级学语言特权", "en": "Lowest price of the year. Unlock everything now." },
          color: "#FFFFFF",
          align: "center"
        }
      },
      {
        type: "BenefitList",
        props: {
          layoutMode: "vertical",
          iconColor: "#EF4444",
          items: [
            { icon: "translate", title: { "zh-CN": "文字 & 语音无限即时互译", "en": "Unlimited Instant Translations" } },
            { icon: "sparkles", title: { "zh-CN": "AI 语法实时纠错与精修", "en": "AI Instant Grammar Fixer" } },
            { icon: "globe", title: { "zh-CN": "全球任意城市漫游搜索", "en": "Unlimited City Passport" } }
          ]
        }
      },
      {
        type: "ProductTiers",
        props: {
          layout: "stack",
          products: [
            {
              id: "bf_annual",
              name: { "zh-CN": "【年度大促】年费 VIP (加赠3个月)", "en": "Annual VIP (15 Months)" },
              subname: { "zh-CN": "仅 ¥128 / 15 个月", "en": "Only $24.99 / 15 Months" },
              price: "¥128",
              originalPrice: "¥298",
              dailyPrice: "每天仅需 ¥0.28",
              tag: { "zh-CN": "省 ¥170", "en": "SAVE 60%" },
              isRecommended: true
            },
            {
              id: "bf_monthly",
              name: { "zh-CN": "月度常规会员", "en": "Monthly Plan" },
              price: "¥28/月",
              isRecommended: false
            }
          ]
        }
      },
      {
        type: "SocialProof",
        props: {
          type: "carousel",
          reviews: [
            { author: "Ken (Tokyo)", content: "用了 HelloTalk VIP 之后，找了 3 个母语语伴，口语进步神速！", tag: "英语学习者" },
            { author: "Maria (Madrid)", content: "AI 纠错功能太惊艳了，发动态前都会帮我修正语法！", tag: "中文进阶者" }
          ]
        }
      },
      {
        type: "CTAButton",
        props: {
          title: { "zh-CN": "立即抢购五折特惠", "en": "Claim 60% Off Deal" },
          subTitle: { "zh-CN": "活动倒计时结束即恢复原价 ¥298", "en": "Price will return to $49.99 after timer expires" },
          gradient: ["#EF4444", "#B91C1C"]
        }
      },
      {
        type: "LegalFooter",
        props: {
          disclaimer: { "zh-CN": "限时特惠订单享受随时退订保障与权益实时到账。", "en": "Limited-time promo deal backed by App Store refund guarantee." }
        }
      }
    ]
  },
  {
    id: "vip_expired_retain",
    name: "到期流失挽留模版 (PrivilegeRetainStyle)",
    category: "流失挽回",
    scene: "会员到期后 / 取消自动续费后触发",
    theme: "light",
    bgGradient: "linear-gradient(180deg, #FFF7ED 0%, #FFFFFF 40%)",
    components: [
      {
        type: "CloseNavigation",
        props: { styleType: "close", theme: "dark" }
      },
      {
        type: "HeaderTitle",
        props: {
          kicker: { "zh-CN": "老用户专属挽留", "en": "COME BACK OFFER" },
          kickerColor: "#EA580C",
          title: { "zh-CN": "Hi {{nick_name}}，你的 VIP 特权已停用", "en": "Hi {{nick_name}}, Your VIP has ended" },
          subtitle: { "zh-CN": "你已过期 {{vip_expired_days}} 天，恢复特权继续享受畅聊", "en": "Expired for {{vip_expired_days}} days. Restore your features today." },
          color: "#1C1917",
          align: "center"
        }
      },
      {
        type: "BenefitList",
        props: {
          layoutMode: "vertical",
          iconColor: "#EA580C",
          items: [
            { icon: "translate", title: { "zh-CN": "恢复文字与语音无限翻译", "en": "Restore Unlimited Translation" } },
            { icon: "zap", title: { "zh-CN": "找回全部访客与漫游特权", "en": "Restore Profile Visitors & Roaming" } }
          ]
        }
      },
      {
        type: "ProductTiers",
        props: {
          layout: "stack",
          products: [
            {
              id: "retain_special",
              name: { "zh-CN": "老用户专属续费价 (年卡)", "en": "Come-back Exclusive Annual" },
              subname: { "zh-CN": "立享立减 ¥50 专属优惠", "en": "Save $10 immediately" },
              price: "¥148",
              originalPrice: "¥198",
              dailyPrice: "¥0.40/天",
              tag: { "zh-CN": "专属补贴", "en": "Special" },
              isRecommended: true
            }
          ]
        }
      },
      {
        type: "CTAButton",
        props: {
          title: { "zh-CN": "以专属特惠价恢复特权", "en": "Resume VIP at Special Price" },
          gradient: ["#F97316", "#EA580C"]
        }
      },
      {
        type: "LegalFooter",
        props: {
          disclaimer: { "zh-CN": "仅限收到此通知的老用户专享，每个账号限购 1 次。", "en": "Special offer valid for selected returning users only." }
        }
      }
    ]
  },
  {
    id: "vip_tier_comparison",
    name: "VIP vs VIP+ 双阶特权对比模版 (SwitchComparisonStyle)",
    category: "高阶升级",
    scene: "特权集合页 / VIP 升级 VIP+ 入口",
    theme: "light",
    bgGradient: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 40%)",
    components: [
      {
        type: "CloseNavigation",
        props: { styleType: "close", theme: "dark" }
      },
      {
        type: "HeaderTitle",
        props: {
          title: { "zh-CN": "选择适合你的会员等级", "en": "Choose Your Perfect Membership" },
          subtitle: { "zh-CN": "升级 VIP+，解锁 HelloTalk 最前沿 AI 语伴辅导", "en": "Upgrade to VIP+ for advanced AI tutor and deeper learning." },
          color: "#0F172A",
          align: "center"
        }
      },
      {
        type: "ComparisonTable",
        props: {
          tiers: ["免费版", "VIP", "VIP+"],
          features: [
            { name: { "zh-CN": "每日翻译次数", "en": "Daily Translations" }, values: ["10 次/天", "无限次", "无限次"] },
            { name: { "zh-CN": "AI 语法精细纠错", "en": "AI Grammar Check" }, values: [false, "基础纠错", "深度精讲无限次"] },
            { name: { "zh-CN": "谁看过我访客足迹", "en": "Profile Visitors" }, values: [false, true, true] },
            { name: { "zh-CN": "全球漫游找语伴", "en": "Search Global" }, values: [false, true, true] },
            { name: { "zh-CN": "专属尊贵金冠徽章", "en": "Exclusive Gold Badge" }, values: [false, "银色VIP", "黑金VIP+"] }
          ]
        }
      },
      {
        type: "ProductTiers",
        props: {
          layout: "stack",
          products: [
            {
              id: "tier_vip_plus",
              name: { "zh-CN": "VIP+ 黑金旗舰年卡", "en": "VIP+ Black Gold Annual" },
              subname: { "zh-CN": "含全部 VIP 特权 + 无限 AI 高级纠错", "en": "All VIP features + Unlimited AI" },
              price: "¥298/年",
              dailyPrice: "¥0.81/天",
              tag: { "zh-CN": "进阶尊享", "en": "Most Popular" },
              isRecommended: true
            },
            {
              id: "tier_vip_normal",
              name: { "zh-CN": "VIP 基础年卡", "en": "VIP Standard Annual" },
              price: "¥198/年",
              dailyPrice: "¥0.54/天",
              isRecommended: false
            }
          ]
        }
      },
      {
        type: "CTAButton",
        props: {
          title: { "zh-CN": "立即升级至 VIP+", "en": "Upgrade to VIP+ Now" },
          gradient: ["#0F172A", "#334155"]
        }
      },
      {
        type: "LegalFooter",
        props: {
          disclaimer: { "zh-CN": "现有 VIP 用户升级将自动抵扣剩余时长差价。", "en": "Existing VIP remaining days will be prorated." }
        }
      }
    ]
  }
];
