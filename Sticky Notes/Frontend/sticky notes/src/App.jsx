import { useState } from "react";
import "./App.css";
import Signup from "./pages/Auth/signup";
import Dashboard from "./pages/dashboard";
import Login from "./pages/Auth/login";
import AuthRoutes from "./pages/Routes/AuthRoutes";
import PrivateRoutes from "./pages/Routes/PrivateRoutes";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" exact element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
