import { FooterLinkType } from 'cswap-uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'https://docs.cswap.finance/contact-us',
      },
      {
        label: t('Blog'),
        href: 'https://cswap.medium.com/',
      },
      {
        label: t('Community'),
        href: 'https://docs.cswap.finance/contact-us/telegram',
      },
      {
        label: t('CSWAP token'),
        href: 'https://docs.cswap.finance/tokenomics/cswap',
      },
      {
        label: '—',
      },
      {
        label: t('Online Store'),
        href: 'https://cswap.creator-spring.com/',
        isHighlighted: true,
      },
    ],
  },
  {
    label: t('Help'),
    items: [
      {
        label: t('Customer Support'),
        href: 'https://docs.cswap.finance/contact-us/customer-support',
      },
      {
        label: t('Troubleshooting'),
        href: 'https://docs.cswap.finance/help/troubleshooting',
      },
      {
        label: t('Guides'),
        href: 'https://docs.cswap.finance/get-started',
      },
    ],
  },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/cswap-finance',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.cswap.finance',
      },
    ],
  },
]
