import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Upcoming.module.css";

export default function Upcoming() {
  const [tasksToday, setTasksToday] = useState([]);
  const [tasksTomorrow, setTasksTomorrow] = useState([]);
  const [tasksThisWeek, setTasksThisWeek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(true);

  // --- state برای مدال ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedType, setEditedType] = useState("");
  const [editedDate, setEditedDate] = useState("");

  const toggleMenu = () => setOpenMenu(!openMenu);

  // تبدیل تاریخ به YYYY-MM-DD
  const getLocalDate = (date) => {
    if (!date) return null;
    let d;
    if (!isNaN(date)) {
      d = new Date(Number(date));
    } else {
      d = new Date(date);
    }
    if (isNaN(d.getTime())) return null;
    return d.toISOString().split("T")[0];
  };

  const getList = async () => {
    try {
      const res = await axios.get(
        "https://strapi.arvanschool.ir/api/to-dos?pagination[pageSize]=100",
        { headers: { "Content-Type": "application/json" } }
      );

      const tasks = res.data.data || [];

      const today = getLocalDate(new Date());
      const tomorrow = getLocalDate(
        new Date(Date.now() + 24 * 60 * 60 * 1000)
      );

      // شروع و پایان هفته (یکشنبه تا شنبه)
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);

      const todayTasks = tasks.filter((task) => {
        const dueDate = task.attributes?.dueDate ?? task.dueDate;
        return getLocalDate(dueDate) === today;
      });

      const tomorrowTasks = tasks.filter((task) => {
        const dueDate = task.attributes?.dueDate ?? task.dueDate;
        return getLocalDate(dueDate) === tomorrow;
      });

      const weekTasks = tasks.filter((task) => {
        const dueDate = task.attributes?.dueDate ?? task.dueDate;
        const localDate = getLocalDate(dueDate);
        return (
          localDate &&
          localDate >= getLocalDate(startOfWeek) &&
          localDate <= getLocalDate(endOfWeek)
        );
      });

      setTasksToday(todayTasks);
      setTasksTomorrow(tomorrowTasks);
      setTasksThisWeek(weekTasks);
      setLoading(false);
    } catch (err) {
      console.error("❌ خطا در گرفتن تسک‌ها:", err.message);
      setLoading(false);
    }
  };

  // حذف تسک
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

  // باز کردن مدال
  const openEditModal = (task) => {
    setSelectedTask(task);
    setEditedTitle(task.attributes?.title ?? task.title ?? "");
    setEditedType(task.attributes?.type ?? task.type ?? "");
    setEditedDate(getLocalDate(task.attributes?.dueDate ?? task.dueDate) ?? "");
    setIsModalOpen(true);
  };

  // ذخیره تغییرات
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
      <div className={styles.Upcoming}>
        <h1>Upcoming</h1>

        {/* Today */}
        <div className={styles.todaysec}>
          <h1 className={styles.h1today}>Today</h1>
          <div className={styles.addtask}>
            <div className={styles.thisweekToday}>
              {tasksToday.length === 0 && <p>تسکی برای امروز وجود ندارد</p>}
              {tasksToday.map((task) => (
                <div key={task.documentId} className={styles.taskRow}>
                  <p>
                    {task.attributes?.title ?? task.title ?? "بدون عنوان"} -{" "}
                    {getLocalDate(task.attributes?.dueDate ?? task.dueDate) ??
                      "تاریخ ندارد"}{" "}
                    - {task.attributes?.type ?? task.type ?? "بدون نوع"}
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
            <button onClick={getList} className={styles.addBtn}>
              get list
            </button>
          </div>
        </div>

        {/* Tomorrow */}
        <div className={styles.towaddinput}>
          <div className={styles.tomorro}>
            <h1 className={styles.h1today}>Tomorrow</h1>
            <div className={styles.addtask}>
              <div className={styles.thisweek}>
                {tasksTomorrow.length === 0 && (
                  <p>تسکی برای فردا وجود ندارد</p>
                )}
                {tasksTomorrow.map((task) => (
                  <div key={task.documentId} className={styles.taskRow}>
                    <p>
                      {task.attributes?.title ?? task.title ?? "بدون عنوان"} -{" "}
                      {getLocalDate(task.attributes?.dueDate ?? task.dueDate) ??
                        "تاریخ ندارد"}{" "}
                      - {task.attributes?.type ?? task.type ?? "بدون نوع"}
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
              <button onClick={getList} className={styles.addBtn}>
                get list
              </button>
            </div>
          </div>

          {/* This Week */}
          <div className={styles.tomorro}>
            <h1 className={styles.h1today}>This Week</h1>
            <div className={styles.addtask}>
              <div className={styles.thisweek}>
                {tasksThisWeek.length === 0 && (
                  <p>تسکی برای این هفته وجود ندارد</p>
                )}
                {tasksThisWeek.map((task) => (
                  <div key={task.documentId} className={styles.taskRow}>
                    <p>
                      {task.attributes?.title ?? task.title ?? "بدون عنوان"} -{" "}
                      {getLocalDate(task.attributes?.dueDate ?? task.dueDate) ??
                        "تاریخ ندارد"}{" "}
                      - {task.attributes?.type ?? task.type ?? "بدون نوع"}
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
              <button onClick={getList} className={styles.addBtn}>
                get list
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* مدال */}
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
