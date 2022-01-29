import React from "react";
import styled from "styled-components";
import { CswapDiamond } from "../Svg";
import Text from "../Text/Text";
import Skeleton from "../Skeleton/Skeleton";
import { Colors } from "../../theme";

export interface Props {
  color?: keyof Colors;
  cswapPriceUsd?: number;
  iconCallback?: () => void;
  cswapAddress?: string;
}

const PriceDiv = styled.div`
  display: flex;
  align-items: center;
`

const IconLink = styled.a`
  display: flex;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const CswapPrice: React.FC<Props> = ({ cswapPriceUsd, color = "textDisabled", iconCallback, cswapAddress }) => {
  return cswapPriceUsd ? (
    <PriceDiv>
      <Text mr={2} color="textDisabled">1MM</Text>
      <IconLink
        href="#"
        onClick={(e) => {
          e.preventDefault();
          iconCallback && iconCallback();
        }}
      >
        <CswapDiamond width="18px" height="16px" mr="8px" />
      </IconLink>
      <a
        href={`/info/token/${cswapAddress}`}
        target="_blank"
      >
        <Text mr={2} color={color} bold>{`$${(cswapPriceUsd * 1000000).toFixed(4)}`}</Text>
      </a>
    </PriceDiv>
  ) : (
    <Skeleton width={80} height={24} />
  );
};

export default React.memo(CswapPrice);
