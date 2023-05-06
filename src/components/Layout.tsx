import Logo from "./../assets/image/logo.svg";
import SiderBar from "./SiderBar";

type Props = {};

const Layout = (props: Props) => {
  return (
      <div className="flex bg-white items-center shadow-header fixed w-full top-0 right-0 z-20 justify-between h-16 px-6">
        <div className="flex items-center">
          <img src={Logo} alt="logo" className=" h-9" />
          <h2 className="font-medium text-2xl tracking-tight ml-3">
            HR Management System
          </h2>
        </div>
        <div className="flex">
          <div>1</div>
          <div>2</div>
        </div>
      </div>
  );
};

export default Layout;
