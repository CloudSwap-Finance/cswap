import React from 'react'
import { Flex, Text } from 'cswap-uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { usePriceCswapUsdc } from 'state/farms/hooks'
import { useCswapVault } from 'state/pools/hooks'
import { getCswapVaultEarnings } from 'views/Pools/helpers'
import RecentCswapProfitBalance from './RecentCswapProfitBalance'

const RecentCswapProfitCountdownRow = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const {
    pricePerFullShare,
    userData: { cswapAtLastUserAction, userShares, lastUserActionTime },
  } = useCswapVault()
  const cswapPriceUsdc = usePriceCswapUsdc()
  const { hasAutoEarnings, autoCswapToDisplay, autoUsdToDisplay } = getCswapVaultEarnings(
    account,
    cswapAtLastUserAction,
    userShares,
    pricePerFullShare,
    cswapPriceUsdc.toNumber(),
  )

  const lastActionInMs = lastUserActionTime && parseInt(lastUserActionTime) * 1000
  const dateTimeLastAction = new Date(lastActionInMs)
  const dateStringToDisplay = dateTimeLastAction.toLocaleString()

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text small color="textSubtle">{`${t('Recent CSWAP profit')}:`}</Text>
      {hasAutoEarnings && (
        <RecentCswapProfitBalance
          cswapToDisplay={autoCswapToDisplay}
          dollarValueToDisplay={autoUsdToDisplay}
          dateStringToDisplay={dateStringToDisplay}
        />
      )}
    </Flex>
  )
}

export default RecentCswapProfitCountdownRow
