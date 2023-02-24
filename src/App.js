import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ExpenseList from "./pages/ExpenseList";
import Calculator from "./pages/Calculator";
import NavBar from "./components/NavBar";
import { useCookies } from "react-cookie";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
function App() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const { loading } = useSelector((state) => state.user);
  return (
    <div className="flex flex-col min-h-screen text-white">
      <NavBar></NavBar>
      <div className="main-container">
        <div className="flex justify-center">
          <FadeLoader
            color={"#e9d5ff"}
            loading={loading}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
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
