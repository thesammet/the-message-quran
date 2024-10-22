import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgBookmark = (props) => (
  <Svg
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <Path
      stroke="#000000"
      strokeWidth={2}
      d="M3.093 3.09A1.007 1.007 0 014.095 2h11.81c.589 0 1.05.504 1.002 1.09-.144 1.778-.407 5.362-.407 7.91 0 1.9.146 4.373.28 6.247.067.933-1.072 1.46-1.734.8l-4.339-4.34a1 1 0 00-1.414 0l-4.34 4.34c-.66.66-1.8.133-1.733-.8.134-1.874.28-4.348.28-6.247 0-2.548-.263-6.132-.407-7.91z"
    />
  </Svg>
);
export default SvgBookmark;
