import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="px-2 py-4">
      <ul className="flex justify-end gap-x-2">
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
