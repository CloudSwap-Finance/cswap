import React from 'react'
import { Text, TooltipText, useTooltip } from 'cswap-uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { isBlindMode } from 'utils'

interface RecentCswapProfitBalanceProps {
  cswapToDisplay: number
  dollarValueToDisplay: number
  dateStringToDisplay: string
}

const RecentCswapProfitBalance: React.FC<RecentCswapProfitBalanceProps> = ({
  cswapToDisplay,
  dollarValueToDisplay,
  dateStringToDisplay,
}) => {
  const { t } = useTranslation()

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Balance fontSize="16px" value={cswapToDisplay} decimals={3} bold unit=" CSWAP" />
      {!isBlindMode() && <Balance fontSize="16px" value={dollarValueToDisplay} decimals={2} bold prefix="~$" />}
      {t('Earned since your last action')}
      <Text>{dateStringToDisplay}</Text>
    </>,
    {
      placement: 'bottom-end',
    },
  )

  return (
    <>
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef} small>
        <Balance fontSize="14px" value={cswapToDisplay} />
      </TooltipText>
    </>
  )
}

export default RecentCswapProfitBalance
