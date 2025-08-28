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
    if (isNaN(d.getTime())) return null; // جلوگیری از Invalid time value
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
      const tomorrow = getLocalDate(new Date(Date.now() + 24 * 60 * 60 * 1000));

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
          {/* منوی اصلی */}
          <li className={styles.MenuTitle}>
            <h1 className={styles.menuh1}>Menu</h1>
            <button
              className={styles.menuToggleButtonInside}
              onClick={toggleMenu}
            >
              <img src="align-justify.svg" className={styles.menuImg} alt="menu" />
            </button>
          </li>

          <li className={styles.tasks}>
            <h3>Tasks</h3>
            <div className={styles.upcomtags}>
              <img src="chevrons-right.svg" alt="chevrons-right" />
              <Link className={styles.TasksLink} to="/Upcoming">
                <p>Upcoming</p>
              </Link>
            </div>
            <div className={styles.todaystag}>
              <img src="list.svg" alt="list" />
              <p>
                <Link className={styles.TasksLink} to="/Today">
                  Today
                </Link>
              </p>
            </div>
            <div className={styles.calendartag}>
              <img src="calendar.svg" alt="calendar" />
              <p>
                <Link className={styles.TasksLink} to="/Calendarpage">
                  Calendar
                </Link>
              </p>
            </div>
            <div className={styles.sticktag}>
              <img src="🦆 icon _Sticky Note_.svg" alt="Sticky Note" />
              <p>
                <Link className={styles.TasksLink} to="/Sticky Wall">
                  Sticky Wall
                </Link>
              </p>
            </div>
          </li>

          {/* سایر لیست‌ها و تنظیمات */}
          <li className={styles.lists}>
            <h3>Lists</h3>
            <div className={styles.worktag}><p className={styles.work}></p><p>Work</p></div>
            <div className={styles.Personaltag}><p className={styles.Personal}></p><p>Personal</p></div>
            <div className={styles.Studytag}><p className={styles.Study}></p><p>Study</p></div>
            <div className={styles.addtag}><img src="plus-circle.svg" alt="plus-circle" /><p>Add new list</p></div>
          </li>

          <li className={styles.menuSutUp}>
            <div className={styles.settingtag}><img src="align-center.svg" alt="setting" /><p>Settings</p></div>
            <div className={styles.SignOuttag}><img src="log-out.svg" alt="log-out" /><p>Sign Out</p></div>
          </li>
        </ul>
      )}

      <div className={styles.Upcoming}>
        <h1>Upcoming</h1>

        {/* --- Today --- */}
        <div className={styles.todaysec}>
          <h1 className={styles.h1today}>Today</h1>
          <div className={styles.addtask}>
            <div>
              {tasksToday.length === 0 && <p>تسکی برای امروز وجود ندارد</p>}
              {tasksToday.map((task) => (
                <p key={task.id}>
                  {task.attributes?.title ?? task.title ?? "بدون عنوان"} -{" "}
                  {getLocalDate(task.attributes?.dueDate ?? task.dueDate) ?? "تاریخ ندارد"} -{" "}
                  {task.attributes?.type ?? task.type ?? "بدون نوع"}
                </p>
              ))}
            </div>
            <button onClick={getList} className={styles.addBtn}>get list</button>
          </div>
        </div>

        {/* --- Tomorrow --- */}
        <div className={styles.towaddinput}>
          <div className={styles.tomorro}>
            <h1 className={styles.h1today}>Tomorrow</h1>
            <div className={styles.addtask}>
              <div>
                {tasksTomorrow.length === 0 && <p>تسکی برای فردا وجود ندارد</p>}
                {tasksTomorrow.map((task) => (
                  <p key={task.id}>
                    {task.attributes?.title ?? task.title ?? "بدون عنوان"} -{" "}
                    {getLocalDate(task.attributes?.dueDate ?? task.dueDate) ?? "تاریخ ندارد"} -{" "}
                    {task.attributes?.type ?? task.type ?? "بدون نوع"}
                  </p>
                ))}
              </div>
              <button onClick={getList} className={styles.addBtn}>get list</button>
            </div>
          </div>

          {/* --- This Week --- */}
          <div className={styles.tomorro}>
            <h1 className={styles.h1today}>This Week</h1>
            <div className={styles.addtask}>
         <div className={styles.thisweek}>     {tasksThisWeek.length === 0 && <p>تسکی برای این هفته وجود ندارد</p>}
              {tasksThisWeek.map((task) => (
                <p key={task.id}>
                  {task.attributes?.title ?? task.title ?? "بدون عنوان"} -{" "}
                  {getLocalDate(task.attributes?.dueDate ?? task.dueDate) ?? "تاریخ ندارد"} -{" "}
                  {task.attributes?.type ?? task.type ?? "بدون نوع"}
                </p>
              ))}   
          </div>
              <button onClick={getList} className={styles.addBtn}>get list</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
