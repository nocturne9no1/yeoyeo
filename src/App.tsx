import { RouterProvider } from "react-router-dom";
import "@styles/common.scss";
import axios from "axios";
import Router from "./utils/Router";

axios.defaults.baseURL = "https://yeoyeo.kr";

function App() {
  return (
    <div className="App">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
