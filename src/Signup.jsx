import styles from "./Signup.module.css";
import {  Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    UserName: "",
    email: "",
    password: "",
    reEnterPass: "",
  });

  const navigate =useNavigate()
  const handlerPost = (e) => {
    e.preventDefault();

    if (!formData.UserName || !formData.email || !formData.password) {
      alert("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    if (formData.password !== formData.reEnterPass) {
      alert("رمز عبور و تکرار آن یکسان نیستند.");
      return;
    }

    axios
      .post("https://strapi.arvanschool.ir/api/auth/local/register", 
     {data: {
       username: formData.UserName,
        email: formData.email,
        password: formData.password,
     }  ,},
        {
          headers: { "Content-Type": "application/json" },
        }
    
      )
      .then((res) => {
        console.log("ثبت‌نام موفق:", res.data);
        navigate('/Gofortask')
        setFormData({
          UserName: "",
          email: "",
          password: "",
          reEnterPass: "",
        });
      })
      .catch((error) => {
        console.error("خطا در ثبت‌نام:", error.response?.data || error.message);
        alert(
          error.response?.data?.error?.message || "ثبت‌نام با خطا مواجه شد."
        );
      });
  };

  const handelChange = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <img className={styles.todoImg} src={"Rectangle 1.png"} alt="todo" />
      </div>

      <div className={styles.startp}>
        <form onSubmit={handlerPost} className={styles.inputs}>
          <h1>Sign up</h1>

          <input
            className={styles.emailInput}
            type="text"
            placeholder="UserName... "
            value={formData.UserName}
            onChange={handelChange}
            name="UserName"
          />
          <input
            className={styles.emailInput}
            type="email"
            placeholder="email@gmail.com"
            value={formData.email}
            onChange={handelChange}
            name="email"
          />
          <input
            className={styles.passwordInput}
            type="password"
            placeholder="password"
            autoComplete="on"
            value={formData.password}
            onChange={handelChange}
            name="password"
          />
          <input
            className={styles.passwordInput}
            type="password"
            placeholder="Re-Enter the password"
            autoComplete="on"
            value={formData.reEnterPass}
            onChange={handelChange}
            name="reEnterPass"
          />
          <button type="submit" className={styles.signupBtn}>
            Sign up
          </button>
        </form>

        <p>
          Already have an account?
          <Link className={styles.signinLink} to="/Signin">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
