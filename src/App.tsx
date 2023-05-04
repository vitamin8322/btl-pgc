import "./App.css";
import { RoutesPath } from "./RoutesPath";
import Login from "./page/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      <RoutesPath />

      <ToastContainer />
    </div>
  );
}

export default App; 
