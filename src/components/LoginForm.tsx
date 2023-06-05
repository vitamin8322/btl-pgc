import {  useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ICompany, ILoginFormFields } from "../models/Auth";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import CustomInputSelect, { customPaperProps } from "./CustomStyle/StyleSelect";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getCompany, loginAuth, resetLogin } from "@/redux/slice/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "@/utils/constants";
import { NotistackCustom } from "./CustomComponents/NotistackCustom";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { ROUTES } from "@/configs/routes";
type Props = {};

const LoginForm = (props: Props) => {
  const navigate = useNavigate();
  const { closeSnackbar } = useSnackbar();

  // redux
  const dispatch = useDispatch<AppDispatch>();
  const { company,  status } = useSelector(
    (state: RootState) => state.auth
  );

  // func
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getCompany());
    };
    fetchData();
  }, []);

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginFormFields>({
    defaultValues: {
      name: "",
      password: "",
      factory: null,
    },
  });
  const watchPassword = watch("password", "text");
  const watchFactory = watch("factory");
  
  console.log('errors.name', errors.factory && watchFactory === null);
  console.log('errors.factory',watchFactory);

  const onSubmitLogin = async (formData: ILoginFormFields) => {
    try {
      const result = await dispatch(
        loginAuth({
          name: formData.name,
          password: formData.password,
          factory: formData.factory,
        })
      );
      console.log(result);

      if (result.payload.message !== "Success") {
        NotistackCustom("error", result.payload.message, closeSnackbar);
      } else {
        Cookies.set(ACCESS_TOKEN_KEY, result.payload.data.token);
        navigate("/employee");
        dispatch(resetLogin());
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const companyOptions = useMemo(() => {
    return company.map((item: ICompany) => (
      <MenuItem value={item.id} key={item.id}>
        {item.name}
      </MenuItem>
    ));
  }, [company]);

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
          {watchPassword === "" ? (
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
              className={`select w-300 min-h-46 h-46${
                errors.factory && (watchFactory === null || watchFactory === undefined )
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
              {companyOptions}
            </Select>
            {errors.factory &&  (watchFactory === null || watchFactory === undefined ) && (
              <div className="error !mt-1">{errors.factory.message}</div>
            )}
          </>
        </div>

        {/* button */}
        {status !== "loading" ? (
          <Button
            type="submit"
            className="!bg-blue-500 !hover:bg-blue-600 !w-300 !mt-10 !text-white !font-bold !py-2 !px-4 !rounded !h-46 !mb-4"
          >
            Sign In
          </Button>
        ) : (
          <Button
            disabled
            className="!bg-loading !hover:bg-blue-600 !w-300 !mt-10 !text-white !font-bold !py-2 !px-4 !rounded !h-46 !mb-4"
          >
            <CircularProgress size={16} className="!text-iconLoading" />
          </Button>
        )}
      </form>
      <button className="font-medium text-blue-500 cursor-pointer dark:text-blue-500 hover:underline mb-10 ">
        <NavLink to={ROUTES.forgotPassword}>Forgot Your Password?</NavLink>
      </button>
    </div>
  );
};

export default LoginForm;
