import { Link } from "react-router-dom";
import { CgMenu } from "react-icons/cg";

const NavBar = ({ showMenu, handleMenuToggle }) => {
  return (
    <nav className="nav-bar">
      <div className="flex justify-between">
        <Link className="logo" to="/">
          ChowBread🥖
        </Link>
        <button className="md:hidden" onClick={handleMenuToggle}>
          <CgMenu />
        </button>
      </div>
      <ul
        className={`absolute inset-x-0 top-full m-4 rounded-xl py-4 bg-purple-1000 ${
          showMenu ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } transition-transform flex flex-col items-center gap-3 md:relative md:opacity-100 md:translate-x-0 md:m-0 md:p-0 md:flex-row md:justify-end`}
      >
        <li>
          <Link onClick={handleMenuToggle} className="nav-link" to="/">
            Calculator
          </Link>
        </li>
        <li>
          <Link onClick={handleMenuToggle} className="nav-link" to="/expenses">
            My Expenses
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
