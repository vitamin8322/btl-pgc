import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchApi } from "../hooks/api";
import { ICompany, ILoginFormFields } from "../models/Auth";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import CustomInputSelect, { customPaperProps } from "./CustomStyle/StyleSelect";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getCompany, loginAuth } from "../redux/slice/authSlice";
import { toast } from "react-toastify";
import close from "../assets/image/x.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../utils/constants";

type Props = {};

interface CustomCloseButtonProps {
  closeToast: () => void;
}

const CustomCloseButton = ({ closeToast }: CustomCloseButtonProps) => (
  <button className="custom-close-button" onClick={closeToast}>
    <img src={close} alt="" />
  </button>
);

const LoginFrom = (props: Props) => {
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch<AppDispatch>();
  const { dataAuth, company, login } = useSelector(
    (state: RootState) => state.auth
  );

  // func
  const [formLogin, setFormLogin] = useState<ILoginFormFields>({
    name: "",
    password: "",
    factory: 0,
  });
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getCompany());
    };

    fetchData();
    // setListCompany(company)
  }, []);

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginFormFields>({
    defaultValues: {
      name: "doanhdoquoc",
      password: "doanh123",
      factory: 1,
    },
  });
  const watchPassword = watch("password", "text");
  const watchFactory = watch("factory");

  const onSubmitLogin = async (formData: ILoginFormFields) => {
    try {
      await dispatch(
        loginAuth({
          name:  "doanhdoquoc",
          password: "doanh123",
          factory: 1,
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log(login);
  useEffect(() => {
    if (login.message != "Success" && login.message != "") {
      toast.error(login.message, {
        closeButton: <CustomCloseButton closeToast={toast.dismiss} />,
        hideProgressBar: true,
        style: {
          width: "400px",
          boxShadow: "none",
          backgroundColor: "#FFEFEF",
          transform: "translate(0, 0)",
          right: "6em",
        },
        position: "top-right",
      });
    } else if (login.message == "Success") {
      Cookies.set(ACCESS_TOKEN_KEY, login.data.token);
      navigate("/employee");
    }
  }, [login.message]);

  return (
    <div className="w-348 rounded-xl shadow-form bg-white p-6 ml-8 ">
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <div>
          <label className="label" htmlFor="name">
            Username
          </label>
          <input
            type="text"
            className={`input h-46 w-300  ${
              errors.name ? "!border-red1 !bg-red2 !border !border-solid" : ""
            }`}
            id="name"
            {...register("name", {
              required: "Please enter username",
            })}
          />
          {errors.name && <div className="error">{errors.name.message}</div>}
        </div>
        <div className="relative">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className={`input h-46 w-300 ${
              errors.password
                ? "!border-red1 !bg-red2 !border !border-solid"
                : ""
            }`}
            id="password"
            {...register("password", {
              required: "Please enter password",
            })}
          />
          {watchPassword == "" ? (
            <></>
          ) : (
            <button
              type="button"
              className="absolute top-135 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <RemoveRedEyeOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </button>
          )}
          {errors.password && (
            <div className="error">{errors.password.message}</div>
          )}
        </div>
        <div>
          <label className="label" htmlFor="factory">
            Factory
          </label>
          <>
            <Select
              displayEmpty
              className={`select w-300  h-46${
                errors.factory && watchFactory == null
                  ? "!border-red1 !bg-red2 !border !border-solid"
                  : ""
              }`}
              {...register("factory", {
                required: "Please enter factory",
              })}
              input={<CustomInputSelect />}
              
              MenuProps={{
                PaperProps: customPaperProps,
              }}
              IconComponent={ExpandLessIcon}
            >
              <InputLabel shrink={false} className="!hidden">
                Select Factory
              </InputLabel>
              {company.map((item: any) => (
                <MenuItem value={item.id} key={item.key}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {errors.factory && watchFactory == null && (
              <div className="error !mt-1">{errors.factory.message}</div>
            )}
          </>
        </div>

        {/* button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 w-300 mt-10 text-white font-bold py-2 px-4 rounded h-46 mb-4"
        >
          Sign In
        </button>
        <a className="font-medium text-blue-500 cursor-pointer dark:text-blue-500 hover:underline mb-10 ">
          Forgot Your Password?
        </a>
      </form>
    </div>
  );
};

export default LoginFrom;
