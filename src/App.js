import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ExpenseList from "./pages/ExpenseList";
import Calculator from "./pages/Calculator";
import NavBar from "./components/NavBar";
import { useCookies } from "react-cookie";
import Register from "./pages/Register";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <div className="flex flex-col min-h-screen text-white">
      <NavBar></NavBar>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/signin" element={<SignIn setCookie={setCookie} />} />
          <Route
            path="/register"
            element={<Register setCookie={setCookie} />}
          />
          <Route
            path="/expenses"
            element={
              <ExpenseList cookies={cookies} removeCookie={removeCookie} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
