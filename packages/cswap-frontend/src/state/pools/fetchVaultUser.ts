import BigNumber from 'bignumber.js'
import { getCswapVaultContract } from 'utils/contractHelpers'

const cswapVaultContract = getCswapVaultContract()

const fetchVaultUser = async (account: string) => {
  try {
    const userContractResponse = await cswapVaultContract.userInfo(account)
    return {
      isLoading: false,
      userShares: new BigNumber(userContractResponse.shares.toString()).toJSON(),
      lastDepositedTime: userContractResponse.lastDepositedTime.toString(),
      lastUserActionTime: userContractResponse.lastUserActionTime.toString(),
      cswapAtLastUserAction: new BigNumber(userContractResponse.cswapAtLastUserAction.toString()).toJSON(),
    }
  } catch (error) {
    return {
      isLoading: true,
      userShares: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
      cswapAtLastUserAction: null,
    }
  }
}

export default fetchVaultUser
