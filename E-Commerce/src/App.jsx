// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import Header from "./components/Header";
import AddNewProduct from "./Pages/AddNewProduct";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/Add_New_Product" element={<AddNewProduct />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
