import React from "react";
import { NavLink } from "react-router-dom";

// Nabar for all App
export const Navbar = () => {
  return (
    <nav>
      <div
        className="nav-wrapper blue-grey darken-1"
        style={{ padding: "0 2rem" }}
      >
        <span className="brand-logo">Booking room</span>
        <ul className="navig">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/contacts">Contacts</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
