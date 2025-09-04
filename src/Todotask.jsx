import { useState } from "react";
import styles from "./Todotask.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Todotask() {
  const [openMenu, setOpenMenu] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    type:'',
   
  });

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handlerPost = (e) => {
    e.preventDefault();

    axios
      .post("https://strapi.arvanschool.ir/api/to-dos", 
      {  data: {
          title: formData.title,
          dueDate: formData.date,
          type: formData.type,
        }, },
        {  headers: { "Content-Type": "application/json" },}
        
       
      )
      .then((res) => {
        console.log("لیست اضافه شد:", res.data);
        setFormData({
          title: "",
          date: "",
          type: "",
        });
      })
      .catch((error) => {
        console.error(
          "خطا در اضافه کردن:",
          error.response?.data || error.message
        );
        alert(
          error.response?.data?.error?.message ||
            "اضافه کردن لیست با خطا مواجه شد."
        );
      });


const getData=    axios
.get("https://strapi.arvanschool.ir/api/to-dos/", 
    
        {  headers: { "Content-Type": "application/json" },}
        
       
      )
      console.log("📌 پاسخ کامل API:",getData);


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

      <form onSubmit={handlerPost} className={styles.Todotask}>
        <div className={styles.inputTask}>
          <div className={styles.inputTitle}>
            <label htmlFor="title">Title</label>
         <input
        name="title"
        placeholder="title..."
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
          </div>
          <div className={styles.inputDate}>
            <label htmlFor="date">date</label>
             <input
        type="date"
        name="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
          </div>
        </div>

        <div className={styles.radioInputs}>
          <div className={styles.labelDiv}>
            <label htmlFor="Work">Work
                <input
          type="radio"
          name="type"
          value="work"
          checked={formData.type === "work"}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        /></label>
          </div>
          <div className={styles.labelDiv}>
            <label htmlFor="Personal">Personal
            <input
          type="radio"
          name="type"
          value="personal"
          checked={formData.type === "personal"}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        /></label>
          </div>
          <div className={styles.labelDiv}>
            <label htmlFor="Study">Study
               <input
          type="radio"
          name="type"
          value="study"
          checked={formData.type === "study"}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        /></label>
          </div>
        </div>

        <button type="submit" className={styles.subBtn}>
          Add
        </button>
      </form>
    </div>
  );
}


