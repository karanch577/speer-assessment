import React from "react";
import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar.jsx";
import Header from "../Header/Header.jsx";

const Layout = () => {
    return(
      <div className="container">
        <Header />
        <div className="container-view">
          <Navbar />
          <Outlet />
        </div>
      </div>
    )
  }

  export default Layout;