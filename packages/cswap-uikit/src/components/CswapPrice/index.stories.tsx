import React from "react";
import { CswapPrice, CswapPriceProps } from ".";
import { Flex } from "../Box";

export default {
  title: "Components/CswapPrice",
  component: CswapPrice,
};

const Template: React.FC<CswapPriceProps> = ({ ...args }) => {
  return (
    <Flex p="10px">
      <CswapPrice {...args} />
    </Flex>
  );
};

export const Default = Template.bind({});
Default.args = {
  cswapPriceUsd: 20.0,
};
