import styles from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://strapi.arvanschool.ir/api/auth/local",
     {
identifier:formData.identifier,
    password: formData.password,
  },
  {
    headers: { "Content-Type": "application/json" },
  }
)
      .then((res) => {
        localStorage.setItem("token", res.data.jwt);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/Gofortask");
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error?.message || "خطا در ورود!";
        alert("❌ " + errorMsg);
      });
  };

  return (
    <div className={styles.container}>
      <div>
        <img className={styles.todoImg} src={"Rectangle 1.png"} alt="todo" />
      </div>

      <form onSubmit={handleLogin} className={styles.startp}>
        <div className={styles.inputs}>
          <h1>Sign In</h1>
          <input
            className={styles.emailInput}
            type="email"
            placeholder="email@gmail.com"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
          />
          <input
            className={styles.passwordInput}
            type="password"
            placeholder="********"
            name="password"
             autoComplete="on"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles.signBtn}>
            Sign In
          </button>
        </div>

        <div className={styles.lines}>
          <img className={styles.lineImg} src="Line 1.png" alt="Line " />
          <p>or</p>
          <img className={styles.lineImg} src="Line 1.png" alt="Line " />
        </div>

        <div className={styles.buttons}>
          <button type="button" className={styles.googleBtn}>
            <img src="🦆 icon _google icon_.svg" alt="Google" />
            Google
          </button>
          <button type="button" className={styles.facebookBtn}>
            <img src="🦆 icon _Facebook v1 icon_.svg" alt="Facebook" />
            Facebook
          </button>
        </div>

        <p>
          Don't have an account?
          <Link className={styles.signupLink} to="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}