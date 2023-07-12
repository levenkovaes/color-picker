import styled from "styled-components";

export const SCanvas = styled.canvas<{
  alt: string;
  width: number;
  height: number;
}>`
  margin: 40px 0 0;
  /* width: clamp(100px, 100%, 1500px);
  height: clamp(100px, 68vh, 1500px); */
  border: solid 1px var(--dark-green);
  background-color: var(--white);
`;
