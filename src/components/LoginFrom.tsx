import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ICompany, ILoginFormFields } from "../models/auth";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import CustomInputSelect, { customPaperProps } from "./CustomStyle/StyleSelect";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getCompany, loginAuth, resetLogin } from "../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../utils/constants";
import { NotistackCustom } from "./CustomComponents/NotistackCustom";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
type Props = {};

const LoginFrom = (props: Props) => {
  const navigate = useNavigate();
  const {  closeSnackbar } = useSnackbar();

  // redux
  const dispatch = useDispatch<AppDispatch>();
  const { dataAuth, company, login, status } = useSelector(
    (state: RootState) => state.auth
  );

  // func
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
      password: "123123123",
      factory: 1,
    },
  });
  const watchPassword = watch("password", "text");
  const watchFactory = watch("factory");

  const onSubmitLogin = useCallback(
    async (formData: ILoginFormFields) => {
      try {
        await dispatch(
          loginAuth({
            name: formData.name,
            password: formData.password,
            factory: 1,
          })
        );
      } catch (error) {
        console.log("error", error);
      }
    },
    [dispatch]
  );


  const companyOptions = useMemo(() => {
    return company.map((item: ICompany) => (
      <MenuItem value={item.id} key={item.id}>
        {item.name}
      </MenuItem>
    ));
  }, [company]);

  useEffect(() => {
    if (login.message != "Success" && status == "succeeded") {
      NotistackCustom("error", login.message, closeSnackbar);
    } else if (login.message == "Success") {
      Cookies.set(ACCESS_TOKEN_KEY, login.data.token);
      navigate("/employee");
      dispatch(resetLogin());
    }
  }, [status, dispatch]);

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
              {companyOptions}
            </Select>
            {errors.factory && watchFactory == null && (
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
          <Button disabled className="!bg-loading !hover:bg-blue-600 !w-300 !mt-10 !text-white !font-bold !py-2 !px-4 !rounded !h-46 !mb-4">
            <CircularProgress size={16} className="!text-iconLoading" />
          </Button>
        )}
        <a className="font-medium text-blue-500 cursor-pointer dark:text-blue-500 hover:underline mb-10 ">
          Forgot Your Password?
        </a>
      </form>
    </div>
  );
};

export default LoginFrom;
