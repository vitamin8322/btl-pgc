import React from "react";
import Logo from "./../assets/image/logo.svg";
import LoginFrom from "../components/LoginFrom";

type Props = {};

const Login = (props: Props) => {
  return (
    <div  className="flex items-center bg-default h-screen flex-col">
      <div>
        <img src={Logo} alt="logo" className="inline mt-16" />
        <h2 className="font-medium text-4xl tracking-tight">
          HR Management System
        </h2>
        <h2 className="font-medium text-4xl tracking-tight mt-10 mb-5">Sign In</h2>
        <LoginFrom />
        <div className="my-10">Copyright © 2022. All Rights Reserved</div>
      </div>
    </div>
  );
};

export default Login;
