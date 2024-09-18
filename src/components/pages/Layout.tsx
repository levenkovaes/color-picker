import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";

export const Layout: React.FC = () => {
  return (
    <>
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
