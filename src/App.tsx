import { RouterProvider } from "react-router-dom";
import "@styles/common.scss";
import Router from "./utils/Router";

function App() {
  return (
    <div className="App">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
