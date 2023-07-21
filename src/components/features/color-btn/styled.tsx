import styled from "styled-components";

import { SBtn } from "../../common/styled";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $bgColor: string;
}

export const Button: React.FC<IButtonProps> = styled(SBtn).attrs<IButtonProps>(
  (props) => ({
    style: {
      background: props.$bgColor,
    },
  })
)`
  padding: 20px;
  min-width: 120px;
  min-height: 70px;
`;
