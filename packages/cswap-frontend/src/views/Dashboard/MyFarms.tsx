import React, { useCallback, useMemo } from 'react'
import FlexLayout from 'components/Layout/Flex'
import { useFarms, usePriceCswapUsdc } from 'state/farms/hooks'
import isArchivedPid from 'utils/farmHelpers'
import FarmCard, { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { getDisplayApr } from 'views/Farms/Farms'
import BigNumber from 'bignumber.js'
import { getFarmApr } from 'utils/apr'
import { DeserializedFarm } from 'state/types'
import { getAddress } from 'utils/addressHelpers'
import { useWeb3React } from '@web3-react/core'

const MyFarms = () => {
  const { data: farmsLP, userDataLoaded } = useFarms()
  const { account } = useWeb3React()
  const cswapPrice = usePriceCswapUsdc()
  // const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const activeFarms = farmsLP.filter(farm => farm.pid !== 0 && farm.pid !== 3) // FIXME temp show CRO/CSWAP and CRO/USDC with 0x

  const farmsList = useCallback(
    (farmsToDisplay: DeserializedFarm[]): FarmWithStakedValue[] => {
      const farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteTokenPriceUsdc) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteTokenPriceUsdc)
        const { cswapRewardsApr, lpRewardsApr } = getFarmApr(new BigNumber(farm.poolWeight), cswapPrice, totalLiquidity, getAddress(farm.lpAddresses))

        return { ...farm, apr: cswapRewardsApr, lpRewardsApr, liquidity: totalLiquidity }
      })

      return farmsToDisplayWithAPR
    },
    [cswapPrice],
  )
  
  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = []

    chosenFarms = farmsList(activeFarms)

    return chosenFarms
  }, [
    activeFarms,
    farmsList,
  ])
  
  return (
    <div>
      <FlexLayout>
        {chosenFarmsMemoized.map((farm) => (
          <FarmCard
            key={farm.pid}
            farm={farm}
            displayApr={getDisplayApr(farm.apr, farm.lpRewardsApr)}
            cswapPrice={cswapPrice}
            account={account}
            removed={false}
          />
        ))}
      </FlexLayout>
    </div>
  )
}

export default MyFarms
