import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'CSWAP Finance | Simple DeFi Trading For All',
  description: 'CSWAP Finance is your gateway to the decentralized finance movement.Take control of your finances and earn sparkly CSWAP rewards.Low fees, fast transactions and competitive earnings.',
  image: 'https://cswap.finance/images/logo.png',
  siteName: 'CSWAP Finance',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
    // } else if (path.startsWith('/teams')) {
    //   basePath = '/teams'
    // } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    //   basePath = '/voting/proposal'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('CSWAP Finance')} | ${t('Simple DeFi Trading For All')}`,
        description: t('CSWAP Finance is your gateway to the decentralized finance movement.Take control of your finances and earn sparkly CSWAP rewards.Low fees, fast transactions and competitive earnings.')
      }
    case '/swap':
      return {
        title: `${t('CSWAP Finance')} | ${t('Swap Tokens With Low Fees')}`,
        description: t('CSWAP Finance Brilliant Swap is the best place to trade DeFi token instantly with low fees.Sign up to earn crypto today on CSWAP Finance Brilliant Swap!')
      }
    case '/add':
      return {
        title: `${t('CSWAP Finance')} | ${t('Liquidity')} | ${t('Add')}`,
        description: t('Become a liquidity provider on CSWAP. Add liquidity to earn trading fees and CSWAP rewards.')
      }
    case '/remove':
      return {
        title: `${t('CSWAP Finance')} | ${t('Liquidity')} | ${t('Remove')}`,
        description: t('Remove Liquidity and receive your tokens back.')
      }
    case '/liquidity':
      return {
        title: `${t('CSWAP Finance')} | ${t('Provide Liquidity And Earn Rewards')}`,
        description: t('Supply a token pair to receive liquidity provider (LP) tokens.Collect transaction fees and farm shiny CSWAP rewards.')
      }
    case '/find':
      return {
        title: `${t('CSWAP Finance')} | ${t('Liquidity')} | ${t('Find')}`,
        description: t('Manually find Liquidity Provider tokens that may not appear automatically in the Liquidity page.')
      }
    // case '/competition':
    //   return {
    //     title: `${t('Trading Battle')} | ${t('CSWAP Finance')}`,
    //   }
    // case '/prediction':
    //   return {
    //     title: `${t('Prediction')} | ${t('CSWAP Finance')}`,
    //   }
    // case '/prediction/leaderboard':
    //   return {
    //     title: `${t('Leaderboard')} | ${t('CSWAP Finance')}`,
    //   }
    case '/farms':
      return {
        title: `${t('CSWAP Finance')} | ${t('Yield Farming By Staking LP Tokens')}`,
        description: t('Earn DeFi Crypto Rewards with CSWAP Finance Crystal Farms.Stake your tokens in our Crystal Farm and receive CSWAP rewards every few seconds! Our harvests are always bountiful.')
      }
    // case '/farms/auction':
    //   return {
    //     title: `${t('Farm Auctions')} | ${t('CSWAP Finance')}`,
    //   }
    case '/mines':
      return {
        title: `${t('CSWAP Finance')} | ${t('Stake CSWAP Token For Extra Rewards')}`,
        description: t('Stake your CSWAP tokens for a fixed amount in our Glitter Mine, start mining attractive CSWAP and partner token rewards.')
      }
    // case '/lottery':
    //   return {
    //     title: `${t('Lottery')} | ${t('CSWAP Finance')}`,
    //   }
    // case '/collectibles':
    //   return {
    //     title: `${t('Collectibles')} | ${t('CSWAP Finance')}`,
    //   }
    // case '/ifo':
    //   return {
    //     title: `${t('Initial Farm Offering')} | ${t('CSWAP Finance')}`,
    //   }
    // case '/teams':
    //   return {
    //     title: `${t('Leaderboard')} | ${t('CSWAP Finance')}`,
    //   }
    // case '/profile':
    //   return {
    //     title: `${t('Your Profile')} | ${t('CSWAP Finance')}`,
    //   }
    // case '/profile/tasks':
    //   return {
    //     title: `${t('Task Center')} | ${t('CSWAP Finance')}`,
    //   }
    // case '/voting':
    //   return {
    //     title: `${t('Voting')} | ${t('CSWAP Finance')}`,
    //   }
    // case '/voting/proposal':
    //   return {
    //     title: `${t('Proposals')} | ${t('CSWAP Finance')}`,
    //   }
    // case '/voting/proposal/create':
    //   return {
    //     title: `${t('Make a Proposal')} | ${t('CSWAP Finance')}`,
    //   }
    case '/info':
      return {
        title: `${t('CSWAP Finance')} | ${t('Data Analytics')}`,
        description: t('Find out the latest info on CSWAP. Explore to find the Liquidity, Volume 24H,Top Tokens,Top Farms,Transactions and more.'),
      }
    case '/info/farms':
      return {
        title: `${t('CSWAP Finance')} | ${t('Analytics')} | ${t('Farms')}}`,
        description: t('Find out the latest info on all Crystal Farms. Explore to find the Volume 24H,Volume 7D, LP Rewards Fees 24H,LP Reward APR, Liquidity and more.'),
      }
    case '/info/tokens':
      return {
        title: `${t('CSWAP Finance')} | ${t('Analytics')} | ${t('Tokens')}`,
        description: t('Find out the latest info on all Tokens. Explore to find the Top Movers,Price,Price Change,Volume 24H,Liquidity and more.'),
      }
    default:
      return null
  }
}
