import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { loginInputs } from "../data/formData";
import { loginSuccess, processData } from "../redux/userSlice";
import { API_URL } from "../config";
import fallbackImg from "../assets/Fortune-cookie-amico.png";
import webpImg from "../assets/Fortune-cookie-amico.webp";
import Illustration from "../components/Illustration";

const SignIn = ({ setCookie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginValues, setLoginvalues] = useState({
    email: "",
    password: "",
  });

  const [loginOutcome, setLoginOutcome] = useState({
    success: false,
    message: "",
  });

  const onLoginChange = (e) => {
    setLoginvalues({ ...loginValues, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(loginValues);
    try {
      dispatch(processData());
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
        dispatch(loginSuccess(userData));
        navigate("/expenses");
      }
    } catch (err) {
      console.log(err.response.data);
      setLoginOutcome({ success: false, message: err.response.data.message });
    }
  };

  return (
    <div className="mt-12 card">
      <h1 className="mb-4">Welcome</h1>
      <p>{loginOutcome.message}</p>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 ">
        {loginInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={loginValues[input.name]}
            onChange={onLoginChange}
          />
        ))}
        <button className="btn btn-rounded btn-yellow mt-2" type="submit">
          Submit
        </button>
      </form>
      <p className="mt-10">
        Do not have an account yet? <Link to="/register">Sign up</Link>
      </p>
      <div className="w-2/3 ml-auto my-4 text-center">
        <Illustration
          fallbackSrc={fallbackImg}
          webpSrc={webpImg}
          mode={"light"}
          credits={{
            ref: "https://storyset.com/happy",
            text: "Happy illustrations by Storyset",
          }}
        />
      </div>
    </div>
  );
};

export default SignIn;
