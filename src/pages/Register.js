import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { loginSuccess } from "../redux/userSlice";
import { API_URL } from "../util";

const Register = ({ setCookie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerValues, setRegisterValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registrationOutcome, setRegistrationOutcome] = useState({
    success: false,
    message: "",
  });

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

  const onRegisterChange = (e) => {
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
  };

  const handleRegister = async function (e) {
    e.preventDefault();
    const { confirmPassword, ...newUser } = registerValues;
    // console.log(newUser);
    try {
      const res = await axios.post(`${API_URL}/user/`, newUser);
      //   console.log(res);

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
      // console.log(err.response.data);
      setRegistrationOutcome({
        success: false,
        message: err.response.data.message,
      });
    }
  };

  return (
    <div className="mt-12 mx-auto w-4/5 max-w-sm">
      <h1 className="mb-4">Create a New Account</h1>
      <p>{registrationOutcome.message}</p>
      <form onSubmit={handleRegister} className="flex flex-col gap-2 ">
        {registerInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={registerValues[input.name]}
            onChange={onRegisterChange}
          />
        ))}
        <button className="btn btn-rounded btn-solid mt-2" type="submit">
          Submit
        </button>
      </form>
      <p className="mt-10">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default Register;
