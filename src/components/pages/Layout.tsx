import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
        <ToastContainer />
        <Outlet />
      </main>
    </>
  );
};
