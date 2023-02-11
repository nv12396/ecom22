import React, { useState } from "react";
import { Jumbotron } from "../components/cards/Jumbotron";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const initialState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`/auth/login`, {
      formData,
    });
    if (data?.error) {
      toast.error(data.error);
    } else {
      toast.success("Login sucessful");
      //   Cookies.set("token", data.token);
      localStorage.setItem("token", data.token);
      setAuth({ ...auth, token: data.token, user: data.user });
      console.log(auth);
      navigate("/dashboard");
    }
  };
  return (
    <div>
      <Jumbotron title="Login" subTitle="Please log in" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter your email"
                value={formData.email}
                name={"email"}
                onChange={handleChange}
              />
              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter your password"
                value={formData.password}
                name={"password"}
                onChange={handleChange}
              />
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
