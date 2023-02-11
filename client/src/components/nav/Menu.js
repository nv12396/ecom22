import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export const Menu = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const logout = () => {
    setAuth({ ...auth, token: "", user: null });
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">
            Home
          </NavLink>
        </li>
        {auth.token === "" ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="register">
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <li className="nav-item">
              <button
                className="btn btn-primary"
                to="register"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </div>
        )}
      </ul>
    </>
  );
};
