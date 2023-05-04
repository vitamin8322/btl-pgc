import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ROUTES } from "./configs/routes";
// import Login1 from "./page/Login1/Login1";
// import Login2 from "./page/Logon2/Login2";
// import Home from "./page/Home/Home";
// import Layout from "./components/Layout/Layout";
// import Register from "./page/Register/Register";
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
// import HomeRoute from "./components/ProtectedRoute/HomeRoute";
// import PayrollList from "./page/PayrollList/PayrollList";
// import ProductItem from "./page/ProductItem/ProductItem";
// import Profile from "./page/Profile/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import HomeRoute from "./components/Route/HomeRoute";
import Home from "./page/Home";
import Login from "./page/Login";

interface Props {}

export const RoutesPath = (props: Props) => {
  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.home} element={<Home />} />
          </Route>

          <Route element={<HomeRoute />}>
            <Route path={ROUTES.login} element={<Login />} />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </Suspense>
  );
};
