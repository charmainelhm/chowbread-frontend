import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <Link className="logo" to="/">
        ChowBread🥖
      </Link>
      <ul className="flex justify-end gap-x-2">
        <li>
          <Link className="nav-link" to="/">
            Calculator
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/expenses">
            My Expenses
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
