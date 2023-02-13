import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Calculator</Link>
        </li>
        <li>
          <Link to="/expenses">My Expenses</Link>
        </li>
        <li>
          <Link to="signin">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
