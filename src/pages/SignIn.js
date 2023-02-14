import axios from "axios";
import { useState } from "react";
import { API_URL } from "../api-util";
import jwt_decode from "jwt-decode";

const loginInputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Password",
    required: true,
  },
];

const SignIn = ({ setCookie }) => {
  const [loginValues, setLoginvalues] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState({});

  const onLoginChange = (e) => {
    setLoginvalues({ ...loginValues, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(loginValues);
    try {
      const res = await axios.post(`${API_URL}/session/`, loginValues, {
        withCredentials: true,
      });
      if (res.data) {
        setCookie("access_token", res.data.access_token, {
          path: "/",
          sameSite: "lax",
          secure: "true",
        });
        const userData = jwt_decode(res.data.access_token);
        setUser({ ...userData });
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <h1>Sign In Page</h1>
      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={onLoginChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={onLoginChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignIn;
