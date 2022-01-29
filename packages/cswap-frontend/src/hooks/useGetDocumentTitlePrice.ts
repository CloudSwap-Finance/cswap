import { useEffect } from 'react'
import { useCswapUsdcPrice } from 'hooks/useUsdcPrice'

const useGetDocumentTitlePrice = () => {
  const cswapPriceUsdc = useCswapUsdcPrice()
  useEffect(() => {
    const cswapPriceUsdcString = cswapPriceUsdc ? cswapPriceUsdc.toFixed(2) : ''
    document.title = `CSWAP Swap - ${cswapPriceUsdcString}`
  }, [cswapPriceUsdc])
}
export default useGetDocumentTitlePrice
