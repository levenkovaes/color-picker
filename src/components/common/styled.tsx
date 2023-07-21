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
  padding: 10px 0 24px;

  ${(props) => props.$additionalCss}
`;

export const SBtn = styled.button<{
  $additionalCss?: FlattenSimpleInterpolation;
}>`
  padding: 0;
  background-color: transparent;
  border: none;
  :hover {
    cursor: pointer;
  }

  ${(props) => props.$additionalCss}
`;

export const SBtnTab = styled(SBtn)<{
  $active?: boolean;
}>`
  color: var(--dark-green);
  padding: 8px 20px 8px 0;
  margin-right: 20px;

  ${(props) => props.$active && `border-bottom: 1px solid var(--green)`};
`;

export const SGeneralBtn = styled(SBtn)<{
  $additionalCss?: FlattenSimpleInterpolation;
}>`
  padding: 14px 30px;
  color: var(--green);
  background-color: transparent;
  border: 1px solid var(--green);
  border-radius: 5px;
  display: block;
  min-width: 180px;

  ${(props) => props.$additionalCss}
`;

export const SInput = styled.input`
  padding: 14px 8px;
  border-radius: 5px;
  border: none;

  :focus,
  :active {
    outline: none;
    border: 1px solid var(--dark-green);
  }

  ::placeholder {
    color: var(--grey);
  }
`;
