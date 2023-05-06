import React from "react";
import Logo from "./../assets/image/logo.svg";
import LoginFrom from "../components/LoginFrom";
import Copyright from "../components/Copyright";

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
        <Copyright />
      </div>
    </div>
  );
};

export default Login;
