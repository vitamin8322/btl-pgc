import React from "react";
import Layout from "../components/Layout";
import SiderBar from "../components/SiderBar";
import TableEmpoyee from "../components/TableEmpoyee";
import { styled } from "@mui/material/styles";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import Heading from "../components/Heading";
import Copyright from "../components/Copyright";

type Props = {
  crumbs?: string[];
};


const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Home = (props: Props) => {
  const location = useLocation();
  const crumbs = location.pathname.split("/");

  return (
    <div style={{ height: "" }}>
      <Layout />
      <div className="flex ">
        <div style={{ width: "330px" }}>
          <SiderBar />
        </div>
        <div
          style={{ width: "calc(100% - 330px)", padding: "36px 40px 0" }}
          className="mt-16 bg-default h-full  "
        >
          <Breadcrumbs crumbs={crumbs} />
          <Heading crumbs={crumbs}/>
            <Outlet />
          {/* <Heading /> */}
          <Copyright />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Home);
