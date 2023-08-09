import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          transition={Slide}
          theme="light"
        />
        <Outlet />
      </main>
    </>
  );
};
