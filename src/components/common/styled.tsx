import { Link } from "react-router-dom";
import styled, { FlattenSimpleInterpolation } from "styled-components";

export const SLink = styled(Link)`
  text-decoration: none;
  width: fit-content;
  color: var(--dark-green);
  padding: 2px 0;
  margin: 4px 0 0;
  transition: color 0.2s;
  /* background-color: var(--black); */

  :visited {
    color: var(--dark-green);
  }

  :hover {
    color: var(--green);
  }
`;

export const SH1 = styled.h1<{ $additionalCss?: FlattenSimpleInterpolation }>`
  padding: 10px 0;
  ${(props) => props.$additionalCss}
`;
