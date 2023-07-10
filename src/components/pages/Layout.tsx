import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { SLink } from "../common/styled";

const SHeader = styled.header`
  padding: 0 0 20px;
`;

export const Layout = () => {
  return (
    <>
      <SHeader>
        <SLink to="/">Home</SLink>
      </SHeader>
      <main>
        <Outlet />
      </main>
    </>
  );
};
