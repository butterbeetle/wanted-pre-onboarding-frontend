import styles from "./Signup.module.css";
import { useState } from "react";

const Signup = () => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (!emailValue || !passwordValue) {
      if (!emailValue) setEmailError(true);
      if (!passwordValue) setPasswordError(true);
      return;
    }
    console.log("Submit");
  };

  return (
    <main className={styles["main"]}>
      <h1>회원가입</h1>
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
          data-testid="signup-button"
          type="submit"
          disabled={emailError || passwordError}
        >
          회원가입
        </button>
      </form>
    </main>
  );
};

export default Signup;
