import { ContextApi } from 'contexts/Localization/types'
import BigNumber from 'bignumber.js'

export const getEarningsText = (
  numFarmsToCollect: number,
  hasCswapPoolToCollect: boolean,
  earningsUsdc: BigNumber,
  t: ContextApi['t'],
): string => {
  const data = {
    earningsUsdc: earningsUsdc.toString(),
    count: numFarmsToCollect,
  }

  let earningsText = t('%earningsUsdc% to collect', data)

  if (numFarmsToCollect > 0 && hasCswapPoolToCollect) {
    if (numFarmsToCollect > 1) {
      earningsText = t('%earningsUsdc% to collect from %count% farms and CSWAP mine', data)
    } else {
      earningsText = t('%earningsUsdc% to collect from %count% farm and CSWAP mine', data)
    }
  } else if (numFarmsToCollect > 0) {
    if (numFarmsToCollect > 1) {
      earningsText = t('%earningsUsdc% to collect from %count% farms', data)
    } else {
      earningsText = t('%earningsUsdc% to collect from %count% farm', data)
    }
  } else if (hasCswapPoolToCollect) {
    earningsText = t('%earningsUsdc% to collect from CSWAP mine', data)
  }

  return earningsText
}
