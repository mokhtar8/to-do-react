import React, { useEffect, useState } from 'react';
import styles from "./Today.module.css";
import { Link } from 'react-router-dom';
import axios from "axios";

export default function Today() {
  const [openMenu, setOpenMenu] = useState(true);
  const [tasksToday, setTasksToday] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedType, setEditedType] = useState("");
  const [editedDate, setEditedDate] = useState("");

  const [tasksDone, setTasksDone] = useState({}); // وضعیت Done محلی

  const toggleMenu = () => setOpenMenu(!openMenu);

  const getLocalDate = (date) => {
    if (!date) return null;
    let d = !isNaN(date) ? new Date(Number(date)) : new Date(date);
    if (isNaN(d.getTime())) return null;
    return d.toISOString().split("T")[0];
  };

  const getListToday = async () => {
    try {
      const res = await axios.get(
        "https://strapi.arvanschool.ir/api/to-dos?pagination[pageSize]=100",
        { headers: { "Content-Type": "application/json" } }
      );

      const tasks = res.data.data || [];
      const today = getLocalDate(new Date());

      const todayTasks = tasks.filter(task => {
        const dueDate = task.attributes?.dueDate ?? task.dueDate;
        return getLocalDate(dueDate) === today;
      });

      setTasksToday(todayTasks);
      setLoading(false);
    } catch (err) {
      console.error("❌ خطا در گرفتن تسک‌ها:", err.message);
      setLoading(false);
    }
  };

  const deleteTask = async (documentId) => {
    try {
      await axios.delete(`https://strapi.arvanschool.ir/api/to-dos/${documentId}`);
      getListToday();
      setTasksDone(prev => {
        const updated = { ...prev };
        delete updated[documentId];
        localStorage.setItem("todayTasksDone", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error("❌ خطا در حذف تسک:", err.message);
    }
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setEditedTitle(task.attributes?.title ?? task.title ?? "");
    setEditedType(task.attributes?.type ?? task.type ?? "");
    setEditedDate(getLocalDate(task.attributes?.dueDate ?? task.dueDate) ?? "");
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!selectedTask) return;
    try {
      await axios.put(
        `https://strapi.arvanschool.ir/api/to-dos/${selectedTask.documentId}`,
        {
          data: {
            title: editedTitle,
            type: editedType,
            dueDate: editedDate,
          },
        },
        { headers: { "Content-Type": "application/json" } }
      );
      getListToday();
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
    const storedDone = JSON.parse(localStorage.getItem("todayTasksDone") || "{}");
    setTasksDone(storedDone);
    getListToday();
  }, []);

  if (loading) return <p>⏳ در حال بارگذاری...</p>;

  return (
    <div className={styles.container}>
      {/* منو */}
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
                  <Link className={styles.TasksLink} to='/Upcoming'><p>Upcoming</p></Link>
                </div>
                <div className={styles.todaystag}>
                  <img src="list.svg" alt="list" />
                  <p><Link className={styles.TasksLink} to='/Today'>Today</Link></p>
                </div>
                <div className={styles.calendartag}>
                  <img src="calendar.svg" alt="calendar" />
                  <p><Link className={styles.TasksLink} to='/Calendarpage'>Calendar</Link></p>
                </div>
                <div className={styles.sticktag}>
                  <img src="🦆 icon _Sticky Note_.svg" alt="Sticky Note" />
                  <p><Link className={styles.TasksLink} to='/StickyWall'>Sticky Wall</Link></p>
                </div>
              </li>
              <li className={styles.lists}>
                <h3>Lists</h3>
                <div className={styles.worktag}>
                  <p className={styles.work}></p>
                  <p><Link className={styles.TasksLink} to='/Work'>Work</Link></p>
                </div>
                <div className={styles.Personaltag}>
                  <p className={styles.Personal}></p>
                  <p><Link className={styles.TasksLink} to='/Personal'>Personal</Link></p>
                </div>
                <div className={styles.Studytag}>
                  <p className={styles.Study}></p>
                  <p><Link className={styles.TasksLink} to='/Study'>Study</Link></p>
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

      {/* لیست Today با قابلیت Done */}
      <div className={styles.Upcoming}>
        <h1>Today Tasks</h1>
        {tasksToday.length === 0 && <p>تسکی برای امروز وجود ندارد</p>}
        {tasksToday.map(task => {
          const done = tasksDone[task.documentId] || false;
          return (
            <div key={task.documentId} className={styles.taskRow}>
              <input
                type="checkbox"
                checked={done}
                onChange={(e) => {
                  const updated = { ...tasksDone, [task.documentId]: e.target.checked };
                  setTasksDone(updated);
                  localStorage.setItem("todayTasksDone", JSON.stringify(updated));
                }}
              />
              <p style={{ textDecoration: done ? "line-through" : "none" }}>
                {task.attributes?.title ?? task.title} -{" "}
                {getLocalDate(task.attributes?.dueDate ?? task.dueDate)} -{" "}
                {task.attributes?.type ?? task.type}
              </p>
              <button className={styles.deleteBtn} onClick={() => deleteTask(task.documentId)}>🗑 حذف</button>
              <button className={styles.editBtn} onClick={() => openEditModal(task)}>✏️ ویرایش</button>
            </div>
          );
        })}
      </div>

      {/* مدال ویرایش */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>ویرایش تسک</h3>
            <input
              type="text"
              value={editedTitle}
              onChange={e => setEditedTitle(e.target.value)}
              placeholder="عنوان"
            />
            <input
              type="text"
              value={editedType}
              onChange={e => setEditedType(e.target.value)}
              placeholder="نوع"
            />
            <input
              type="date"
              value={editedDate}
              onChange={e => setEditedDate(e.target.value)}
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
