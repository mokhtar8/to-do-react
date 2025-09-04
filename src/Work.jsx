// src/components/Work.jsx
import React, { useEffect, useState } from "react";
import styles from "./Work.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Work() {
  const [openMenu, setOpenMenu] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedType, setEditedType] = useState("");
  const [editedDate, setEditedDate] = useState("");

  const toggleMenu = () => setOpenMenu(!openMenu);

  const getLocalDate = (date) => {
    if (!date) return null;
    let d = !isNaN(date) ? new Date(Number(date)) : new Date(date);
    if (isNaN(d.getTime())) return null;
    return d.toISOString().split("T")[0];
  };

  // 📌 گرفتن لیست Work
  const getList = async () => {
    try {
      const res = await axios.get(
        "https://strapi.arvanschool.ir/api/to-dos?pagination[pageSize]=100",
        { headers: { "Content-Type": "application/json" } }
      );

      const allTasks = res.data.data || [];

      const workTasks = allTasks.filter((task) => {
        const t = (task.attributes?.type ?? task.type ?? "").toLowerCase();
        return t.includes("work");
      });

      setTasks(workTasks);
      setLoading(false);
    } catch (err) {
      console.error("❌ خطا در گرفتن تسک‌ها:", err.message);
      setLoading(false);
    }
  };

  // 📌 حذف تسک
  const deleteTask = async (documentId) => {
    try {
      await axios.delete(
        `https://strapi.arvanschool.ir/api/to-dos/${documentId}`
      );
      getList();
    } catch (err) {
      console.error("❌ خطا در حذف تسک:", err.message);
    }
  };

  // 📌 باز کردن مدال برای ادیت
  const openEditModal = (task) => {
    setSelectedTask(task);
    setEditedTitle(task.attributes?.title ?? task.title ?? "");
    setEditedType(task.attributes?.type ?? task.type ?? "");
    setEditedDate(getLocalDate(task.attributes?.dueDate ?? task.dueDate) ?? "");
    setIsModalOpen(true);
  };

  // 📌 ذخیره تغییرات
  const handleSave = async () => {
    if (!selectedTask) return;
    try {
      await axios.put(
        `https://strapi.arvanschool.ir/api/to-dos/${selectedTask.documentId}`, // 🔥 مهم
        {
          data: {
            title: editedTitle,
            type: editedType,
            dueDate: editedDate,
          },
        },
        { headers: { "Content-Type": "application/json" } }
      );
      getList();
      setIsModalOpen(false);
      setSelectedTask(null);
    } catch (err) {
      console.error("❌ خطا در ویرایش:", err.message);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    getList();
  }, []);

  if (loading) return <p>⏳ در حال بارگذاری...</p>;

  return (
    <div className={styles.container}>
      {/* --- منو --- */}
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
      {/* --- لیست Work --- */}
      <div className={styles.Upcoming}>
        <h1>Work Tasks</h1>
        {tasks.length === 0 && <p>تسکی برای Work وجود ندارد</p>}
        {tasks.map((task) => (
          <div key={task.documentId} className={styles.taskRow}>
            <p>
              {task.attributes?.title ?? task.title} -{" "}
              {getLocalDate(task.attributes?.dueDate ?? task.dueDate)} -{" "}
              {task.attributes?.type ?? task.type}
            </p>
            <button
              className={styles.deleteBtn}
              onClick={() => deleteTask(task.documentId)}
            >
              🗑 حذف
            </button>
            <button
              className={styles.editBtn}
              onClick={() => openEditModal(task)}
            >
              ✏️ ویرایش
            </button>
          </div>
        ))}
      </div>

      {/* --- مدال ویرایش --- */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>ویرایش تسک</h3>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="عنوان"
            />
            <input
              type="text"
              value={editedType}
              onChange={(e) => setEditedType(e.target.value)}
              placeholder="نوع"
            />
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
            <div className={styles.modalActions}>
              <button onClick={handleSave}>ذخیره</button>
              <button onClick={handleClose}>انصراف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
