import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  // const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <img src="/images/logo.png" width="218px" {...props}></img>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
