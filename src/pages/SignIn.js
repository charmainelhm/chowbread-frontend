import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import FormInput from "../components/FormInput";
import { API_URL, loginInputs } from "../util";

const SignIn = ({ setCookie }) => {
  const [loginValues, setLoginvalues] = useState({
    email: "",
    password: "",
  });

  const [registerValues, setRegisterValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [user, setUser] = useState({});

  const registerInputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      required: true,
    },
    {
      id: 2,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      errorMessage: "Please let us know your first name!",
      required: true,
    },
    {
      id: 3,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      errorMessage: "Please let us know your last name!",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 6-20 characters",
      pattern: "^[a-zA-Z0-9!@#$%^&*]{6,20}$",
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Re-enter Password",
      errorMessage: "Passwords don't match!",
      pattern: registerValues.password,
      required: true,
    },
  ];

  const onLoginChange = (e) => {
    setLoginvalues({ ...loginValues, [e.target.name]: e.target.value });
  };

  const onRegisterChange = (e) => {
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(loginValues);
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

  const handleRegister = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...newUser } = registerValues;
    // console.log(newUser);
    try {
      const res = await axios.post(`${API_URL}/user/`, newUser);
      console.log(res);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <h1>Sign In Page</h1>
      <form onSubmit={handleLogin}>
        {loginInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={loginValues[input.name]}
            onChange={onLoginChange}
          />
        ))}
        <button className="btn btn-solid" type="submit">
          Submit
        </button>
      </form>
      <h2>Or register a new account with us</h2>
      <form onSubmit={handleRegister}>
        {registerInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={registerValues[input.name]}
            onChange={onRegisterChange}
          />
        ))}
        <button className="btn btn-solid" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default SignIn;
