import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ExpenseList from "./pages/ExpenseList";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn setCookie={setCookie} />} />
        <Route path="/expenses" element={<ExpenseList />} />
      </Routes>
    </div>
  );
}

export default App;
