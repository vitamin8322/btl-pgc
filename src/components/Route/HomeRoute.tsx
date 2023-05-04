import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";
import Cookies from "js-cookie";
import { ROUTES } from "../../configs/routes";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";


const HomeRoute = () => {
  const auth = Cookies.get(ACCESS_TOKEN_KEY);

  return !auth ? <Outlet /> : <Navigate to={ROUTES.home} replace />;
};

export default HomeRoute;
