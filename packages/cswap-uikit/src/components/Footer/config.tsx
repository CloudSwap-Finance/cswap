import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.cswap.finance/contact-us",
      },
      {
        label: "Blog",
        href: "https://cswap.medium.com/",
      },
      {
        label: "Community",
        href: "https://docs.cswap.finance/contact-us/telegram",
      },
      {
        label: "CSWAP",
        href: "https://docs.cswap.finance/tokenomics/cswap",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://cswap.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.cswap.finance/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.cswap.finance/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.cswap.finance/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/cswap-finance",
      },
      {
        label: "Documentation",
        href: "https://docs.cswap.finance",
      },
    ],
  },
];

export const socials = [
  {
    label: "Twitter",
    icon: "Twitter",
    href: "https://twitter.com/cswap-finance",
  },
  {
    label: "Telegram",
    icon: "Telegram",
    items: [
      {
        label: "English",
        href: "https://t.me/cswap-finance",
      },
      {
        label: "Bahasa Indonesia",
        href: "https://t.me/PancakeSwapIndonesia",
      },
      {
        label: "中文",
        href: "https://t.me/PancakeSwap_CN",
      },
      {
        label: "Tiếng Việt",
        href: "https://t.me/PancakeSwapVN",
      },
      {
        label: "Italiano",
        href: "https://t.me/pancakeswap_ita",
      },
      {
        label: "русский",
        href: "https://t.me/pancakeswap_ru",
      },
      {
        label: "Türkiye",
        href: "https://t.me/pancakeswapturkiye",
      },
      {
        label: "Português",
        href: "https://t.me/PancakeSwapPortuguese",
      },
      {
        label: "Español",
        href: "https://t.me/PancakeswapEs",
      },
      {
        label: "日本語",
        href: "https://t.me/pancakeswapjp",
      },
      {
        label: "Français",
        href: "https://t.me/pancakeswapfr",
      },
      {
        label: "Announcements",
        href: "https://t.me/PancakeSwapAnn",
      },
      {
        label: "Whale Alert",
        href: "https://t.me/PancakeSwapWhales",
      },
    ],
  },
  {
    label: "Reddit",
    icon: "Reddit",
    href: "https://reddit.com/r/pancakeswap",
  },
  {
    label: "Instagram",
    icon: "Instagram",
    href: "https://instagram.com/pancakeswap_official",
  },
  {
    label: "Github",
    icon: "Github",
    href: "https://github.com/cswap-finance/",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
