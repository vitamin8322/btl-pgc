import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "./configs/routes";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import HomeRoute from "./components/Route/HomeRoute";
import Home from "./page/Home";
import Login from "./page/Login";
import Employee from "./page/Employee";
import CreateOrUpdate from "./page/CreateOrUpdate";
import Attendance from "./page/Attendance";

interface Props {}

export const RoutesPath = (props: Props) => {
  
  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.home} element={<Home />}>
              <Route path={ROUTES.employee} element={<Employee />} />
              <Route path={ROUTES.createUpdate} element={<CreateOrUpdate />} />
              <Route path={ROUTES.createUpdateId} element={<CreateOrUpdate />} />
              <Route path={ROUTES.attendance} element={<Attendance />} />
            </Route>
          </Route>

          {/* <Route element={<HomeRoute />}> */}
          <Route path={ROUTES.login} element={<Login />} />
          {/* </Route> */}
          <Route path={ROUTES.employee} element={<Employee />} />
        </Routes>
      </Router>
    </Suspense>
  );
};
