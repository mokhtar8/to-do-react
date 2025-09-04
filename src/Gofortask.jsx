import React, { useState } from 'react';
import styles from "./Gofortask.module.css";
import {Link} from 'react-router-dom';

export default function Gofortask() {
  const [openMenu, setOpenMenu] = useState(true); 

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className={styles.container}>
      {!openMenu && (
        <button className={styles.menuImgbutton} onClick={toggleMenu}>
          <img src="align-justify.svg" className={styles.menuImg} alt="menu" />
        
        </button>
      )}


      {openMenu && (
        <ul className={styles.openMenu}>
          <li className={styles.MenuTitle}>
           
         
            <h1 className={styles.menuh1}>Menu</h1>

               <button className={styles.menuToggleButtonInside} onClick={toggleMenu}>
              <img src="align-justify.svg" className={styles.menuImg} alt="menu" />
            
            </button>
          </li>
          <li className={styles.searchBar}>
            <img src="search.svg" className={styles.searchimg} alt="search" />
            <input type="text" placeholder="search..." className={styles.searchInput} />
          </li>
          <li className={styles.tasks}>
            <h3>Tasks</h3>
              <div className={styles.addtasks}>
                            <img src="/public/plus-circle2.svg" alt="list" />
                      <p><Link className={styles.TasksLink} to='/Todotask'>add task</Link></p> 
                          </div>
            <div className={styles.upcomtags}>
              <img src="chevrons-right.svg" alt="chevrons-right" />
        <Link className={styles.TasksLink} to='/Upcoming'> <p>  Upcoming</p> </Link> 
            </div>
            <div className={styles.todaystag}>
              <img src="list.svg" alt="list" />
        <p><Link className={styles.TasksLink} to='/Today'>Today</Link></p> 
            </div>
            <div className={styles.calendartag}>
              <img src="calendar.svg" alt="calendar" />
        <p> <Link className={styles.TasksLink} to='/Calendarpage'>Calendar</Link></p>  
            </div>
            <div className={styles.sticktag}>
              <img src="🦆 icon _Sticky Note_.svg" alt="Sticky Note" />
      <p>   <Link className={styles.TasksLink} to='/StickyWall'>Sticky Wall</Link></p>  
            </div>
          </li>
          <li className={styles.lists}>
            <h3>Lists</h3>
            <div className={styles.worktag}>
              <p className={styles.work}></p>
              <p> <Link className={styles.TasksLink} to='/Work'>Work</Link></p>
            </div>
            <div className={styles.Personaltag}>
              <p className={styles.Personal}></p>
            
              <p> <Link className={styles.TasksLink} to='/Personal'>Personal</Link></p>

            </div>
            <div className={styles.Studytag}>
              <p className={styles.Study}></p>
              
              <p> <Link className={styles.TasksLink} to='/Study'>Study</Link></p>

            </div>
            <div className={styles.addtag}>
              <img src="plus-circle.svg" alt="plus-circle" />
              <p>Add new list</p>
            </div>
          </li>
          <li className={styles.menuSutUp}>
            <div className={styles.settingtag}>
              <img src="align-center.svg" alt="setting" />
              <p>Settings</p>
            </div>
            <div className={styles.SignOuttag}>
              <img src="log-out.svg" alt="log-out" />
              <p>Sign Out</p>
            </div>
          </li>
        </ul>
      )}

 
      <div className={styles.Goftotask}>
        <h2>Welcome to ToDoPy</h2>
        <p className={styles.todoText}>
          A to-do app is a simple, user-friendly digital tool designed to help
          individuals and teams organize tasks and manage their daily activities
          efficiently. Users can create, edit, and prioritize tasks, set
          deadlines or reminders, categorize items, and track their progress,
          all within an intuitive and accessible interface. These apps are
          essential for improving productivity, reducing stress, and ensuring
          that important responsibilities are not forgotten.
        </p>
        <button className={styles.startBtn}>Go to tasks</button>
      </div>
    </div>
  );
}

