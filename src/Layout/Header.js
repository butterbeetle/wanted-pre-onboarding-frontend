import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/todo">TODO</Link>
        </li>
        <li>
          <Link to="/signin">LOGIN</Link>
        </li>
        <li>
          <Link to="/signup">SIGN UP</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
