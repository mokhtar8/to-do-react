
import styles from './home.module.css';
import {Link} from 'react-router-dom';
export default function Homep(){

return( 
      <div className={styles.container}> 
<div>
<img  className={styles.todoImg} src={'Rectangle 1.png'} alt="todo" />
</div>

<div className={styles.startp}>
    <h1>ToDo Py</h1>

    <p className={styles.stayText}>Stay Organized, Get Things Done: Your Ultimate To-Do List App. <br />
A todo list app is a digital task management <br />tool designed to help users organize and prioritize their daily activities and responsibilities.</p>

 <Link className={styles.signinLink} to='/Sign up' >   <button className={styles.startBtn}>Get Started</button></Link>
<p>Already have an account? <Link className={styles.signinLink} to='/Sign In'>Sign In</Link></p>
</div>
      </div>
    )
 


}