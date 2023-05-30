import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgBookmark = (props) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6V21L12 15L6 21V6Z"
      stroke="#000000"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgBookmark;
