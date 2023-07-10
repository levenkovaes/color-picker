import { Link } from "react-router-dom";
import styled from "styled-components";

export const SLink = styled(Link)`
  text-decoration: none;
  width: fit-content;
  color: var(--yellow);
  padding: 2px 0;
  margin: 4px 0 0;
  /* background-color: var(--black); */

  :visited {
    color: var(--yellow);
  }

  :hover {
    color: var(--orange);
  }
`;

export const SH1 = styled.h1`
  padding: 10px 0;
`;
