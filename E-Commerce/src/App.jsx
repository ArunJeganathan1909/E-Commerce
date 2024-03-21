// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './redux/store'; // Import your Redux store

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
