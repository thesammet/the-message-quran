import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgArrowLeft = (props) => (
  <Svg fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.2929 23.7071C14.6834 24.0976 15.3166 24.0976 15.7071 23.7071C16.0976 23.3166 16.0976 22.6834 15.7071 22.2929L10.4142 17L24 17C24.5523 17 25 16.5523 25 16C25 15.4477 24.5523 15 24 15L10.4142 15L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L7.29289 15.2929C7.28786 15.2979 7.2829 15.303 7.27798 15.3081C7.1058 15.4878 7 15.7315 7 16C7 16.2766 7.11231 16.527 7.29382 16.708L14.2929 23.7071Z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgArrowLeft;
