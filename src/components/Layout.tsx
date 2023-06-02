import Cookies from "js-cookie";
import Logo from "@/assets/image/logo.svg";
import SelectMui from "./CustomComponents/SelectMui";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import "./StyleComponent.scss";
import ButtonCustom from "./CustomComponents/ButtonCustom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logoutAuth, removeCookie } from "@/redux/slice/authSlice";
import CustomizedDialogs from "./CustomComponents/DialogsCustom";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/configs/routes";
import { getDetail } from "@/redux/slice/userSlice";

type Props = {};

const data = [
  {
    id: "0",
    name: "en",
    code: "en",
  },
  {
    id: "1",
    name: "vn",
    code: "vn",
  },
];
const Layout = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { statusLogout } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(getDetail());
  }, [dispatch]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await dispatch(logoutAuth());
    Cookies.remove("token");
    navigate(ROUTES.login);
  };
  console.log(user);
  
  // const hanleOpenDialog = () => {
  //   setOpenDialog(true);
  // };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="flex bg-white items-center shadow-header fixed w-full top-0 right-0 z-20 justify-between h-16 px-6">
      <div className="flex items-center">
        <img src={Logo} alt="logo" className=" h-9" />
        <h2 className="font-medium text-2xl tracking-tight ml-3">
          HR Management System
        </h2>
      </div>
      <div className="flex gap-2 items-center">
        <div>
          <SelectMui data={data} value={0} icon />
        </div>
        <div className="popover__button__custom">
          <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            className="avatar"
          >
            {user.username.charAt(0)}
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            className="popover__custom"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div className="flex items-center mb-2.5">
              <div className="avatar">{user.username.charAt(0)}</div>
              <div className="ml-2">{user.username}</div>
            </div>
            <div className="py-5">
              <div className="mb-1">{user.department.name}</div>
              <div>Staff ID:</div>
            </div>
            <div className="signout">
              {/* <CustomizedDialogs
                isOpen={openDialog}
                title={"Do you wish to sign out?"}
              ></CustomizedDialogs> */}
              <CustomizedDialogs
                isOpen={openDialog}
                onClick={handleLogout}
                title={"Do you wish to sign out?"}
                loading={statusLogout}
                // content="Are you sure you want to delete?"
                button={
                  <ButtonCustom
                    name="Sign Out"
                    // onClick={hanleOpenDialog}
                  ></ButtonCustom>
                }
              />
            </div>
            <div className="font-medium text-blue-500 cursor-pointer dark:text-blue-500 text-sm my-2.5">
              Reset Password
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Layout;
