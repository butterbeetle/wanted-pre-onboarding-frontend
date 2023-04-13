import { useNavigate } from "react-router-dom";
import styles from "./Signin.module.css";
import { useEffect, useState } from "react";

const Signin = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [passwordValue, setPasswordValue] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const onChangeEmail = (e) => {
    const { value } = e.target;
    setEmailValue(value);

    if (!value.includes("@")) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const onChangePassword = (e) => {
    const { value } = e.target;
    setPasswordValue(value);

    if (value.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!emailValue || !passwordValue) {
      if (!emailValue) setEmailError(true);
      if (!passwordValue) setPasswordError(true);
      return;
    }
    // console.log(emailValue, passwordValue);
    const res = await fetch(
      "https://www.pre-onboarding-selection-task.shop/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      }
    );
    const { status } = res;
    if (status === 404 || status === 401) {
      alert("이메일 혹은 비밀번호를 확인해주세요.");
      return;
    }
    const token = await res.json();

    localStorage.setItem("access_token", JSON.stringify(token.access_token));
    navigate("/todo");
  };
  useEffect(() => {
    if (localStorage.getItem("access_token")) navigate("/todo");
  }, [navigate]);
  return (
    <main className={styles["main"]}>
      <h1>로그인</h1>
      <form>
        <div>
          <label htmlFor="email">
            <p>E-mail</p>
            <input
              onChange={onChangeEmail}
              id="email"
              data-testid="email-input"
              type="email"
            />
          </label>
          {emailError && (
            <p className={styles["error"]}>
              올바른 이메일 형식을 작성해주세요.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={onChangePassword}
              id="password"
              data-testid="password-input"
              type="password"
            />
          </label>
          {passwordError && (
            <p className={styles["error"]}>8자 이상 입력해주세요.</p>
          )}
        </div>

        <button
          className={styles["button"]}
          onClick={onSubmit}
          data-testid="signin-button"
          type="submit"
          disabled={emailError || passwordError}
        >
          로그인
        </button>
      </form>
    </main>
  );
};

export default Signin;
