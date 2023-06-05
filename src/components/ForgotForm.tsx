import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { forgotPassword, getCompany, loginAuth, resetLogin } from "@/redux/slice/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { NotistackCustom } from "./CustomComponents/NotistackCustom";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { ROUTES } from "@/configs/routes";
type Props = {}

const ForgotForm = (props: Props) => {
    const navigate = useNavigate();
    const { closeSnackbar } = useSnackbar();
  
    // redux
    const dispatch = useDispatch<AppDispatch>();
    const { status } = useSelector(
      (state: RootState) => state.auth
    );
  
    // func
  
    // react-hook-form
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm({
      defaultValues: {
        email:''
      },
    });
  
    const onSubmitLogin: SubmitHandler<{ email: string }> = async (data) => {
      try {
        const result = await dispatch(
            forgotPassword(data.email)
        );
        console.log(result);
  
        if (result.payload.message !== "Success") {
          NotistackCustom("error", result.payload.message, closeSnackbar);
        } else {
          navigate(ROUTES.login);
          dispatch(resetLogin());
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  
    return (
      <div className="w-348 rounded-xl shadow-form bg-white p-6 ml-8 ">
        <form onSubmit={handleSubmit(onSubmitLogin)}>
          <div>
            <label className="label" htmlFor="name">
              Email
            </label>
            <input
              type="text"
              className={`input h-46 w-300  ${
                errors.email ? "!border-red1 !bg-red2 !border !border-solid" : ""
              }`}
              id="email"
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
              })}
            />
            {errors.email && <div className="error">{errors.email.message}</div>}
          </div>
  
          {/* button */}
          {status !== "loading" ? (
            <Button
              type="submit"
              className="!bg-blue-500 !hover:bg-blue-600 !w-300 !text-white !font-bold !py-2 !px-4 !rounded !h-46 !mb-4"
            >
              Sign In
            </Button>
          ) : (
            <Button
              disabled
              className="!bg-loading !hover:bg-blue-600 !w-300  !text-white !font-bold !py-2 !px-4 !rounded !h-46 !mb-4"
            >
              <CircularProgress size={16} className="!text-iconLoading" />
            </Button>
          )}
        </form>
        <button className="font-medium text-blue-500 cursor-pointer dark:text-blue-500 hover:underline ">
          <NavLink to={ROUTES.login}>Back to Sign In</NavLink>
        </button>
      </div>
    );
}

export default ForgotForm