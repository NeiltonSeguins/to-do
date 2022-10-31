import Form from "./components/Form";
import "./styles/global.css";
import "./App.css";
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [totalDeTasksCompletas, setTotalDeTasksCompletas] = useState(0);

  useEffect(() => {
    const tasksCompletas = () => {
      if (tasks.length === 0) {
        return tasks.filter((task) => task.completa).length.toFixed(2);
      }
      return (
        (tasks.filter((task) => task.completa).length / tasks.length) *
        100
      ).toFixed(2);
    };
    setTotalDeTasksCompletas(tasksCompletas);
  }, [tasks]);

  return (
    <>
      <main className="container">
        <h1>To-Do</h1>
        <Form tasks={tasks} setTasks={setTasks} />
        <Tasks
          tasks={tasks}
          setTasks={setTasks}
          setTotalDeTasksCompletas={setTotalDeTasksCompletas}
        />
      </main>
      <h3 className="tasks__completas">
        {`Total de tasks concluídas: ${totalDeTasksCompletas}%`}
      </h3>
    </>
  );
}

export default App;
