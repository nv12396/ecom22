import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { Jumbotron } from "../components/cards/Jumbotron";

export const Register = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const initialState = { name: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`/auth/register`, {
      formData,
    });
    if (data?.error) {
      toast.error(data.error);
    } else {
      toast.success("Registration sucessful");
      localStorage.setItem("auth", JSON.stringify(data));
      setAuth({ ...auth, token: data.token, user: data.user });
      navigate("/login");
    }
  };
  return (
    <div>
      <Jumbotron title="Register" subTitle="Please register" />
      <Toaster />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter your name"
                value={formData.name}
                name={"name"}
                onChange={handleChange}
              />
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
