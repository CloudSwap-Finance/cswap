import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { simpleRpcProvider } from 'utils/providers'
import useRefresh from 'hooks/useRefresh'
import {
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  fetchCswapVaultPublicData,
  fetchCswapVaultUserData,
  fetchCswapVaultFees,
  fetchPoolsStakingLimitsAsync,
} from '.'
import { State, DeserializedPool } from '../types'
import { transformPool } from './helpers'

export const useFetchPublicPoolsData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchPoolsPublicData = async () => {
      const blockNumber = await simpleRpcProvider.getBlockNumber()
      dispatch(fetchPoolsPublicDataAsync(blockNumber))
    }

    fetchPoolsPublicData()
    dispatch(fetchPoolsStakingLimitsAsync())
  }, [dispatch, slowRefresh])
}

export const useFetchUserPools = (account) => {
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])
}

export const usePools = (): { pools: DeserializedPool[]; userDataLoaded: boolean } => {
  const { pools, userDataLoaded } = useSelector((state: State) => ({
    pools: state.pools.data,
    userDataLoaded: state.pools.userDataLoaded,
  }))
  return { pools: pools.map(transformPool), userDataLoaded }
}

export const useFetchCswapVault = () => {
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCswapVaultPublicData())
  }, [dispatch, fastRefresh])

  useEffect(() => {
    dispatch(fetchCswapVaultUserData({ account }))
  }, [dispatch, fastRefresh, account])

  useEffect(() => {
    dispatch(fetchCswapVaultFees())
  }, [dispatch])
}

export const useCswapVault = () => {
  const {
    totalShares: totalSharesAsString,
    pricePerFullShare: pricePerFullShareAsString,
    totalCswapInVault: totalCswapInVaultAsString,
    estimatedCswapBountyReward: estimatedCswapBountyRewardAsString,
    totalPendingCswapHarvest: totalPendingCswapHarvestAsString,
    fees: { performanceFee, callFee, withdrawalFee, withdrawalFeePeriod },
    userData: {
      isLoading,
      userShares: userSharesAsString,
      cswapAtLastUserAction: cswapAtLastUserActionAsString,
      lastDepositedTime,
      lastUserActionTime,
    },
  } = useSelector((state: State) => state.pools.cswapVault)

  const estimatedCswapBountyReward = useMemo(() => {
    return new BigNumber(estimatedCswapBountyRewardAsString)
  }, [estimatedCswapBountyRewardAsString])

  const totalPendingCswapHarvest = useMemo(() => {
    return new BigNumber(totalPendingCswapHarvestAsString)
  }, [totalPendingCswapHarvestAsString])

  const totalShares = useMemo(() => {
    return new BigNumber(totalSharesAsString)
  }, [totalSharesAsString])

  const pricePerFullShare = useMemo(() => {
    return new BigNumber(pricePerFullShareAsString)
  }, [pricePerFullShareAsString])

  const totalCswapInVault = useMemo(() => {
    return new BigNumber(totalCswapInVaultAsString)
  }, [totalCswapInVaultAsString])

  const userShares = useMemo(() => {
    return new BigNumber(userSharesAsString)
  }, [userSharesAsString])

  const cswapAtLastUserAction = useMemo(() => {
    return new BigNumber(cswapAtLastUserActionAsString)
  }, [cswapAtLastUserActionAsString])

  return {
    totalShares,
    pricePerFullShare,
    totalCswapInVault,
    estimatedCswapBountyReward,
    totalPendingCswapHarvest,
    fees: {
      performanceFee,
      callFee,
      withdrawalFee,
      withdrawalFeePeriod,
    },
    userData: {
      isLoading,
      userShares,
      cswapAtLastUserAction,
      lastDepositedTime,
      lastUserActionTime,
    },
  }
}
