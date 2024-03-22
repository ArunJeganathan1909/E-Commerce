// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import { Provider } from "react-redux"; // Import Provider
import { store } from "./redux/store"; // Import your Redux store
import Header from "./components/Header";
import AddNewProduct from "./Pages/AddNewProduct";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/Add_New_Product" element={<AddNewProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
