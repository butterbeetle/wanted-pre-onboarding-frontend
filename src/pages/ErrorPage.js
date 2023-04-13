import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles["error"]}>
      <span className={styles["status"]}>404</span>
      <span className={styles["message"]}>존재하지 않는 페이지 입니다.</span>
      <Link to="/signin">홈으로</Link>
    </div>
  );
};

export default ErrorPage;
