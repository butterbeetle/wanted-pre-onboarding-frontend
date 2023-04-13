import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsLogin(true);
    }
  }, [isLogin]);

  const logoutHander = () => {
    localStorage.removeItem("access_token");
    setIsLogin(false);
    navigate("/signin");
  };
  let navMenu = isLogin ? (
    <div>
      <li>
        <p onClick={logoutHander}>LOGOUT</p>
      </li>
    </div>
  ) : (
    <div>
      <li>
        <Link to="/signin">LOGIN</Link>
      </li>
      <li>
        <Link to="/signup">SIGN UP</Link>
      </li>
    </div>
  );

  return (
    <header className={styles["header"]}>
      <ul>
        <li>
          <Link to="/todo">TODO</Link>
        </li>
        {navMenu}
      </ul>
    </header>
  );
};

export default Header;
