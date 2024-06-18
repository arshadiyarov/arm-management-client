import { IProps } from "./props";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

export const AlertContainer = ({ children }: PropsWithChildren<IProps>) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
