import styled from "styled-components";

import { SBtn } from "../../common/styled";

export const Button = styled(SBtn).attrs<{ $bgColor: string }>((props) => ({
  style: {
    background: props.$bgColor,
  },
}))`
  padding: 20px;
  min-width: 120px;
  min-height: 70px;
`;
