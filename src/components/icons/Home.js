import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgHome = (props) => (
  <Svg
    viewBox="0 0 192 192"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <Path
      d="M45.952 22h100.096v148H45.952z"
      style={{
        fill: "none",
        stroke: "#000000",
        strokeWidth: 12,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 4,
        strokeDasharray: "none",
        paintOrder: "markers fill stroke",
      }}
    />
    <Path
      d="M96.019 85c6.075 0 11.01 4.93 11.01 11s-4.935 11-11.01 11c-6.095 0-11.01-4.93-11.01-11s4.915-11 11.01-11z"
      style={{
        fill: "none",
        stroke: "#000000",
        strokeWidth: 12,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 4,
        strokeDasharray: "none",
        strokeOpacity: 1,
      }}
    />
    <Path
      d="M96.011 142c3.992-10.015 29.392-18.409 29.392-31.624V81.624c0-13.193-25.4-21.609-29.392-31.624-4.014 10.015-29.414 18.43-29.414 31.624v28.752c0 13.215 25.4 21.609 29.414 31.624z"
      style={{
        fill: "none",
        stroke: "#000000",
        strokeWidth: 12,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 4,
        strokeDasharray: "none",
        strokeOpacity: 1,
      }}
    />
  </Svg>
);
export default SvgHome;
