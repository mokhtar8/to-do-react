import styles from "./Signup.module.css";
import {Link} from 'react-router-dom';

export default function Signup() {
  return (
    <div className={styles.container}>
      <div>
        <img className={styles.todoImg} src={"Rectangle 1.png"} alt="todo" />
      </div>

      <div className={styles.startp}>
        <div className={styles.inputs}>
          <h1>Sign up</h1>
             <input
            className={styles.emailInput}
            type={"text"}
            placeholder={"First Name"}
          />
             <input
            className={styles.emailInput}
            type={"text"}
            placeholder={"Last Name"}
          />
          <input
            className={styles.emailInput}
            type={"email"}
            placeholder={"email@gmail.com"}
          />
          <input
            className={styles.passwordInput}
            type={"password"}
            placeholder={"password"}
          />
            <input
            className={styles.passwordInput}
            type={"password"}
            placeholder={"Re-Enter the password"}
          />
         <Link className={styles.signinLink} to='/Gofortask'><button className={styles.signupBtn}>Sign up</button></Link>  
        </div>

      

        <p>
         Already have an account? 
         <Link className={styles.signinLink} to='/Sign in'>Sign in</Link>
        
        </p>
      </div>
    </div>
  );
}