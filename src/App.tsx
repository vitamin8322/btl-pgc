import "./App.css";
import { RoutesPath } from "./RoutesPath";
import Login from "./page/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { ReactComponent as Success } from "../src/assets/image/Success.svg";
import { ReactComponent as Error } from "../src/assets/image/Error.svg";



function App() {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        iconVariant={{
          success: <Success />,
          error: <Error/>,
          warning: "⚠️",
          info: "ℹ️",
        }}
      >
        <GlobalStyles
          styles={
            {
              // "&.MuiInputBase-root-MuiInput-root:before": {
              //   borderBottom: "none",
              // },
              // "&.MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before": {
              //   borderBottom: "none",
              // },
              // "& .MuiInputBase-root-MuiInput-root:after": {
              //   borderBottom: "none",
              // },
            }
          }
        />
        <div className="App">
          <RoutesPath />
          <ToastContainer />
        </div>
      </SnackbarProvider>
    </>
  );
}

export default App;
