import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const CheckAuth = ({ children }) => {
  const { auth } = useAuth();
  const [okay, setOkay] = useState(null);
  useEffect(() => {
    if (auth?.token) {
      setTimeout(() => {
        setOkay(true);
      }, 0);
    }
  }, [auth?.token]);

  return okay ? children : <Navigate to="/login" />;
  // const helperFunc = () => {
  //   console.log("this is helper function");
  //   setOkay(true);
  //   console.log("Helper is", okay);
  // };

  // useEffect(() => {
  //   console.log(`${auth?.token} is auth token`);
  //   const checkAuth = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_API}/auth/auth-check`,
  //         { headers: { Authorization: auth?.token } }
  //       );
  //       console.log("response from server", res);
  //       if (res.status === 200) {
  //         setOkay((currentOkay) => {
  //           console.log("setting okay to true");
  //           return true;
  //         });
  //         console.log("this code ran", okay);
  //         // setOkay(res.data.ok);
  //       } else {
  //         setOkay(false);
  //       }
  //     } catch (error) {
  //       console.error("error in checkAuth", error);
  //       setOkay(false);
  //     }
  //   };

  //   checkAuth();
  // }, [auth?.token, okay]);

  // console.log("okay value", okay);
  // return (
  //   <>{okay !== undefined && okay ? children : <Navigate to="/login" />}</>
  // );
};
