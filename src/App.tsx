import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { routes } from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Thêm các Route tại đây */}
        <Route path="/login" component={Login} />
        {/* Các Route khác trong routes nếu có */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
