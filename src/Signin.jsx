import styles from "./SignIn.module.css";
import {Link} from 'react-router-dom';

export default function Signin() {
  return (
    <div className={styles.container}>
      <div>
        <img className={styles.todoImg} src={"Rectangle 1.png"} alt="todo" />
      </div>

      <div className={styles.startp}>
        <div className={styles.inputs}>
          <h1>Sign In</h1>
          <input
            className={styles.emailInput}
            type={"email"}
            placeholder={"email@gmail.com"}
          />
          <input
            className={styles.passwordInput}
            type={"password"}
            placeholder={"********"}
          />
          
                  <Link className={styles.signinLink} to='/Gofortask'><button className={styles.signBtn}>Sign In</button></Link>  
         
        </div>

        <div className={styles.lines}>
          <img className={styles.lineImg} src="Line 1.png" alt="Line " />
          <p>or</p>
          <img className={styles.lineImg} src="Line 1.png" alt="Line " />
        </div>

        <div className={styles.buttons}>
          <button className={styles.googleBtn}>
            <img src="🦆 icon _google icon_.svg" alt=" icon _google" />
            Google
          </button>
          <button className={styles.facebookBtn}>
            <img src="🦆 icon _Facebook v1 icon_.svg" alt="icon _Facebook" />
            Facebook
          </button>
        </div>
        <p>
          Don't have an account?
         <Link className={styles.signupLink} to='/Sign up'>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
