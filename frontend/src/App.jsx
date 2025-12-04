import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useState } from "react";
import RefreshHandler from "./pages/RefreshHandler";

const App = () => {
 
  const [authenticated,setAuthenticate]=useState(false);

  const PrivateRoute=({element})=>{
     return authenticated ? element :<Navigate to="/login" />
  }



  return (
    <div className="App">
      <RefreshHandler setAuthenticate={setAuthenticate}/>

      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
    </div>
  );
};

export default App;
