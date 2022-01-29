import React from 'react'
import { CardHeader, Heading, Text, Flex } from 'cswap-uikit'
import { Token } from 'cswap-sdk'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { TokenPairImage } from 'components/TokenImage'
import CswapVaultTokenPairImage from '../CswapVaultCard/CswapVaultTokenPairImage'

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  background: ${({ isFinished, background, theme }) =>
    isFinished ? theme.colors.backgroundDisabled : 'linear-gradient(89.96deg, #AFCDE0 0.03%, #DABF7B 99.83%)'};
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
  padding: 12px 24px;
`

const StyledTokenPairImage = styled(TokenPairImage)`
  > div {
    width: 42px;
    top: 50%;
    margin-top: -21px;
    bottom: auto;
  }
`

const StyledCswapVaultTokenPairImage = styled(CswapVaultTokenPairImage)`
  > div {
    width: 42px;
    top: 50%;
    margin-top: -21px;
    bottom: auto;
  }
`

const StyledCardHeader: React.FC<{
  earningToken: Token
  stakingToken: Token
  isAutoVault?: boolean
  isFinished?: boolean
  isStaking?: boolean
}> = ({ earningToken, stakingToken, isFinished = false, isAutoVault = false, isStaking = false }) => {
  const { t } = useTranslation()
  const isCswapPool = earningToken.symbol === 'CSWAP' && stakingToken.symbol === 'CSWAP'
  const background = isStaking ? 'bubblegum' : 'cardHeader'

  const getHeadingPrefix = () => {
    if (isAutoVault) {
      // vault
      return t('Auto')
    }
    if (isCswapPool) {
      // manual cswap
      return t('Manual')
    }
    // all other pools
    return t('Earn')
  }

  const getSubHeading = () => {
    if (isAutoVault) {
      return t('Stake and forget')
    }
    if (isCswapPool) {
      return t('Manual staking')
    }
    return t('Stake %symbol%', { symbol: stakingToken.symbol })
  }

  return (
    <Wrapper isFinished={isFinished} background={background}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading color={isFinished ? 'textDisabled' : 'text'} scale="lg">
            {`${getHeadingPrefix()} ${earningToken.symbol}`}
          </Heading>
          <Text color={isFinished ? 'textDisabled' : 'textSubtle'}>{getSubHeading()}</Text>
        </Flex>
        {isAutoVault ? (
          <StyledCswapVaultTokenPairImage width={64} height={64} />
        ) : (
          <StyledTokenPairImage primaryToken={earningToken} secondaryToken={stakingToken} width={64} height={64} />
        )}
      </Flex>
    </Wrapper>
  )
}

export default StyledCardHeader
