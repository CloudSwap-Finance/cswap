import React from 'react'
import { TokenPairImage, ImageProps } from 'cswap-uikit'
import { mainnetTokens } from 'config/constants/tokens'

const CswapVaultTokenPairImage: React.FC<Omit<ImageProps, 'src'>> = (props) => {
  const primaryTokenSrc = `/images/tokens/${mainnetTokens.cswap.address}.svg`

  return <TokenPairImage primarySrc={primaryTokenSrc} secondarySrc="/images/tokens/autorenew.svg" {...props} />
}

export default CswapVaultTokenPairImage
