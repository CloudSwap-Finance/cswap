import BigNumber from 'bignumber.js'
import { convertSharesToCswap } from 'views/Pools/helpers'
import { multicallv2 } from 'utils/multicall'
import cswapVaultAbi from 'config/abi/cswapVault.json'
import { getCswapVaultAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'

export const fetchPublicVaultData = async () => {
  try {
    const calls = [
      'getPricePerFullShare',
      'totalShares',
      'calculateHarvestCSWAPRewards',
      'calculateTotalPendingCSWAPRewards',
    ].map((method) => ({
      address: getCswapVaultAddress(),
      name: method,
    }))

    const [[sharePrice], [shares], [estimatedCswapBountyReward], [totalPendingCswapHarvest]] = await multicallv2(
      cswapVaultAbi,
      calls,
    )

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    const totalCswapInVaultEstimate = convertSharesToCswap(totalSharesAsBigNumber, sharePriceAsBigNumber)
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalCswapInVault: totalCswapInVaultEstimate.cswapAsBigNumber.toJSON(),
      estimatedCswapBountyReward: new BigNumber(estimatedCswapBountyReward.toString()).toJSON(),
      totalPendingCswapHarvest: new BigNumber(totalPendingCswapHarvest.toString()).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalCswapInVault: null,
      estimatedCswapBountyReward: null,
      totalPendingCswapHarvest: null,
    }
  }
}

export const fetchVaultFees = async () => {
  try {
    const calls = ['performanceFee', 'callFee', 'withdrawFee', 'withdrawFeePeriod'].map((method) => ({
      address: getCswapVaultAddress(),
      name: method,
    }))

    const [[performanceFee], [callFee], [withdrawalFee], [withdrawalFeePeriod]] = await multicallv2(cswapVaultAbi, calls)

    return {
      performanceFee: performanceFee.toNumber(),
      callFee: callFee.toNumber(),
      withdrawalFee: withdrawalFee.toNumber(),
      withdrawalFeePeriod: withdrawalFeePeriod.toNumber(),
    }
  } catch (error) {
    return {
      performanceFee: null,
      callFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData
