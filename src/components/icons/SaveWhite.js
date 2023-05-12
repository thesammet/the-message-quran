import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const SvgSaveWhite = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0,0,256,256"
    fillRule="nonzero"
    {...props}
  >
    <G
      fill="#ffffff"
      fillRule="nonzero"
      stroke="none"
      strokeWidth={1}
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit={10}
      strokeDasharray=""
      strokeDashoffset={0}
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      textAnchor="none"
      style={{
        mixBlendMode: "normal",
      }}
    >
      <G transform="scale(5.12,5.12)">
        <Path d="M12.8125,2c-0.47656,0.08984 -0.82031,0.51172 -0.8125,1v44c-0.00391,0.35938 0.1875,0.69141 0.49609,0.87109c0.30859,0.18359 0.69141,0.18359 1.00391,0.00391l11.5,-6.71875l11.5,6.71875c0.3125,0.17969 0.69531,0.17969 1.00391,-0.00391c0.30859,-0.17969 0.5,-0.51172 0.49609,-0.87109v-44c0,-0.55078 -0.44922,-1 -1,-1h-24c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM14,4h22v41.25l-10.5,-6.125c-0.30859,-0.17969 -0.69141,-0.17969 -1,0l-10.5,6.125z" />
      </G>
    </G>
  </Svg>
);
export default SvgSaveWhite;
