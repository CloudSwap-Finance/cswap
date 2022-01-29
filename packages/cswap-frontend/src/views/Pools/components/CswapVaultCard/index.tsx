import React from 'react'
import styled from 'styled-components'
import { Box, CardBody, Flex, Text } from 'cswap-uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton'
import tokens from 'config/constants/tokens'
import { useCswapVault } from 'state/pools/hooks'
import { DeserializedPool } from 'state/types'
import { convertSharesToCswap } from 'views/Pools/helpers'
import AprRow from '../PoolCard/AprRow'
import { StyledCard } from '../PoolCard/StyledCard'
import CardFooter from '../PoolCard/CardFooter'
import StyledCardHeader from '../PoolCard/StyledCardHeader'
import VaultCardActions from './CswapCardActions'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'
import RecentCswapProfitRow from './RecentCswapProfitRow'
import BountyRow from './BountyRow'

const StyledCardBody = styled(CardBody)<{ isLoading: boolean }>`
  min-height: ${({ isLoading }) => (isLoading ? '0' : '254px')};
`

interface CswapVaultProps {
  pool: DeserializedPool
  showStakedOnly: boolean
}

const CswapVaultCard: React.FC<CswapVaultProps> = ({ pool, showStakedOnly }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const {
    userData: { userShares, isLoading: isVaultUserDataLoading },
    fees: { performanceFee },
    pricePerFullShare,
  } = useCswapVault()

  const { cswapAsBigNumber } = convertSharesToCswap(userShares, pricePerFullShare)

  const accountHasSharesStaked = userShares && userShares.gt(0)
  const isLoading = !pool.userData || isVaultUserDataLoading
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  if (showStakedOnly && !accountHasSharesStaked) {
    return null
  }

  return (
    <StyledCard isActive={false}>
      <StyledCardHeader
        isStaking={accountHasSharesStaked}
        isAutoVault
        earningToken={tokens.cswap}
        stakingToken={tokens.cswap}
      />
      <StyledCardBody isLoading={isLoading}>
        <AprRow pool={pool} stakedBalance={cswapAsBigNumber} performanceFee={performanceFeeAsDecimal} />
        <Box mt="24px">
          <RecentCswapProfitRow />
        </Box>
        <Box mt="8px">
          <UnstakingFeeCountdownRow />
        </Box>
        <Box mt="24px">
          <BountyRow />
        </Box>
        <Flex mt="32px" flexDirection="column">
          {account ? (
            <VaultCardActions
              pool={pool}
              accountHasSharesStaked={accountHasSharesStaked}
              isLoading={isLoading}
              performanceFee={performanceFeeAsDecimal}
            />
          ) : (
            <>
              <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                {t('Start earning')}
              </Text>
              <ConnectWalletButton />
            </>
          )}
        </Flex>
      </StyledCardBody>
      <CardFooter pool={pool} account={account} />
    </StyledCard>
  )
}

export default CswapVaultCard
