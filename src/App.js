import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ExpenseList from "./pages/ExpenseList";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <div className="bg-slate-900 flex flex-col min-h-screen text-white">
      <NavBar></NavBar>
      <div className="bg-slate-800 grow rounded-2xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setCookie={setCookie} />} />
          <Route path="/expenses" element={<ExpenseList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
