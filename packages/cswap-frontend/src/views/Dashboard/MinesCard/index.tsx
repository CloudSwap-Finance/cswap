import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useMemo, useState } from 'react'
import { Flex, Text, Heading, Image, useMatchBreakpoints, Skeleton } from 'cswap-uikit'
import { useTranslation } from 'contexts/Localization'

import Balance from 'components/Balance'
import { useFetchPublicPoolsData, useFetchUserPools, usePools, useCswapVault } from 'state/pools/hooks'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceNumber } from 'utils/formatBalance'
import { convertSharesToCswap, getAprData } from 'views/Pools/helpers'
import { isBlindMode } from 'utils'
import { Wrapper } from '../FarmsCard'

const MinesCard = () => {
  const { t } = useTranslation()
  const { isDesktop } = useMatchBreakpoints()

  const { account } = useWeb3React()
  useFetchPublicPoolsData();
  useFetchUserPools(account)
  const { pools: poolsWithoutAutoVault } = usePools()
  const cswapPool = poolsWithoutAutoVault.find((pool) => pool.sousId === 0)
  const cswapAutoVault = { ...cswapPool, isAutoVault: true }
  const pools = [cswapAutoVault, ...poolsWithoutAutoVault]

  let totalStakedPools = BIG_ZERO
  let totalStakedCswap = BIG_ZERO
  const {
    userData: { userShares },
    fees: { performanceFee },
    pricePerFullShare,
  } = useCswapVault()
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100
  let autoCswapApr: number;
  let manualCswapApr: number;
  pools.forEach(pool => {
    const { apr: earningsPercentageToDisplay } = getAprData(pool, performanceFeeAsDecimal)
    if (pool.isAutoVault) {
      const { cswapAsBigNumber } = convertSharesToCswap(userShares, pricePerFullShare)
      const stakedAutoDollarValue = getBalanceNumber(cswapAsBigNumber.multipliedBy(pool.stakingTokenPrice), pool.stakingToken.decimals)
      if (!Number.isNaN(stakedAutoDollarValue) && stakedAutoDollarValue) {
        totalStakedPools = totalStakedPools.plus(stakedAutoDollarValue)
        totalStakedCswap = totalStakedCswap.plus(getBalanceNumber(cswapAsBigNumber, pool.stakingToken.decimals))
        autoCswapApr = earningsPercentageToDisplay
      }
    } else {
      const stakedTokenDollarBalance = getBalanceNumber(
        pool.userData.stakedBalance.multipliedBy(pool.stakingTokenPrice),
        pool.stakingToken.decimals,
      )
      if (!Number.isNaN(stakedTokenDollarBalance) && stakedTokenDollarBalance) {
        totalStakedPools = totalStakedPools.plus(stakedTokenDollarBalance)
        totalStakedCswap = totalStakedCswap.plus(getBalanceNumber(pool.userData.stakedBalance, pool.stakingToken.decimals))
        manualCswapApr = earningsPercentageToDisplay
      }
    }
  })

  const [percent, setPercent] = useState(0)
  const [title, setTitle] = useState('')
  useEffect(() => {
    if (autoCswapApr && manualCswapApr) {
      setPercent((autoCswapApr + manualCswapApr) / 2)
      setTitle(t('Average Annual ROI'))
    } else if (autoCswapApr) {
      setPercent(autoCswapApr)
      setTitle(t('Average APY'))
    } else if (manualCswapApr) {
      setPercent(manualCswapApr)
      setTitle(t('Average APR'))
    } else {
      setTitle(t('Average APR'))
    }
  }, [autoCswapApr, manualCswapApr, t])

  return (
    <Wrapper mt={[null, null, '36px', null]} mb={['24px', null, '36px', null]} flexDirection="column">
      <Heading color="primary">
        {t('Glitter Mines')}
      </Heading>
      <Flex className="info" justifyContent={['space-between', null, null, 'flex-start']}>
        <Flex flexDirection="column" mt="10px" mr="24px">
          <Text minWidth="160px" color="white" bold fontSize="20px">
            <Balance
              decimals={totalStakedPools.gt(0) ? 2 : 0}
              fontSize="20px"
              color="white"
              bold
              prefix={isBlindMode() ? '' : (totalStakedPools.gt(0) ? '~$' : '$')}
              unit={isBlindMode() ? ' MM CSWAP' : ''}
              lineHeight="1.1"
              value={isBlindMode() ? totalStakedCswap.dividedBy(1000000).toNumber() : totalStakedPools.toNumber()}
            />
          </Text>
          <Text minWidth="160px" color="grey" fontSize="13px">
            {t('Total Staked')}
          </Text>
        </Flex>
        <Flex flexDirection="column" mt="10px">
          <Text minWidth="160px" color="white" bold fontSize="20px">
            {isBlindMode() ? <Skeleton width={60} /> : <Balance
              decimals={percent ? 2 : 0}
              fontSize="20px"
              color="white"
              bold
              unit="%"
              lineHeight="1.1"
              value={percent}
            />}
          </Text>
          <Text minWidth="160px" color="grey" fontSize="13px">
            {title}
          </Text>
        </Flex>
      </Flex>
      {
        isDesktop && <Image className="bg" src="/images/dashboard/miners-bg.png" width={220} height={170} />
      }
    </Wrapper>
  )
}

export default MinesCard
