import "./App.css";
import { RoutesPath } from "./RoutesPath";
import Login from "./page/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles } from "@mui/material";
import { CssBaseline } from "@mui/material";
function App() {
  return (
    <>
      <GlobalStyles
        styles={{
          
          // "&.MuiInputBase-root-MuiInput-root:before": {
          //   borderBottom: "none",
          // },
          // "&.MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before": {
          //   borderBottom: "none",
          // },
          // "& .MuiInputBase-root-MuiInput-root:after": {
          //   borderBottom: "none",
          // },
        }}
      />
      <div className="App">
        <RoutesPath />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
