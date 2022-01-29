import React, { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { usePollFarmsPublicData } from 'state/farms/hooks'
import { useFetchPublicPoolsData, useFetchUserPools, usePools, useCswapVault } from 'state/pools/hooks'
import { useUserPoolStakedOnly } from 'state/user/hooks'
import { CardLayout } from 'views/Pools'
import PoolCard from 'views/Pools/components/PoolCard'
import CswapVaultCard from 'views/Pools/components/CswapVaultCard'
import { partition } from 'lodash'
import BigNumber from 'bignumber.js'

const MyMines = () => {
  const { account } = useWeb3React()
  const { pools: poolsWithoutAutoVault, userDataLoaded } = usePools()
  const [stakedOnly, setStakedOnly] = useUserPoolStakedOnly()
  const {
    userData: { cswapAtLastUserAction, userShares },
    fees: { performanceFee },
    pricePerFullShare,
    totalCswapInVault,
  } = useCswapVault()
  const accountHasVaultShares = userShares && userShares.gt(0)
  
  const pools = useMemo(() => {
    const cswapPool = poolsWithoutAutoVault.find((pool) => pool.sousId === 0)
    const cswapAutoVault = { ...cswapPool, isAutoVault: true }
    return [cswapAutoVault, ...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault])

  // TODO aren't arrays in dep array checked just by reference, i.e. it will rerender every time reference changes?
  const [finishedPools, openPools] = useMemo(() => partition(pools, (pool) => pool.isFinished), [pools])

  const stakedOnlyOpenPools = useMemo(
    () =>
      openPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [openPools, accountHasVaultShares],
  )

  usePollFarmsPublicData()
  useFetchPublicPoolsData()
  useFetchUserPools(account)

  const chosenPools = stakedOnly ? stakedOnlyOpenPools : openPools

  return (
    <div>
      <CardLayout>
        {chosenPools.map((pool) =>
          pool.isAutoVault ? (
            <CswapVaultCard key="auto-cswap" pool={pool} showStakedOnly={stakedOnly} />
          ) : (
            // eslint-disable-next-line react/jsx-no-undef
            <PoolCard key={pool.sousId} pool={pool} account={account} />
          ),
        )}
      </CardLayout>
    </div>
  )
}

export default MyMines
