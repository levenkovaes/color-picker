import styled from "styled-components";

import { checkDarkColor } from "../../../utils/utils";
import { SBtn } from "../../common/styled";
import { IButtonProps } from "./types";

export const Button: React.FC<IButtonProps> = styled(SBtn).attrs<IButtonProps>(
  (props) => {
    return {
      style: {
        background: props.$bgColor,
        color: checkDarkColor(props.$bgColor) ? "#ffffff" : "#000000",
      },
    };
  }
)`
  padding: 20px;
  min-width: 120px;
  min-height: 70px;
`;
