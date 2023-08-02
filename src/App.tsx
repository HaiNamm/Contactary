import { RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { routes } from "./routes/routes";

function App() {
  return (
    <>
        <RouterProvider router={routes} />
    </>
  );
}

export default App;
