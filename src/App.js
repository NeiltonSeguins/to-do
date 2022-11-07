import { useEffect, useState } from "react";
import "./styles/global.css";
import "./App.css";
import Form from "./components/Form";
import Tasks from "./components/Tasks";
import api from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [totalDeTasksCompletas, setTotalDeTasksCompletas] = useState(0);

  useEffect(() => {
    api
      .get("/tasks")
      .then((resp) => setTasks(resp.data))
      .catch((err) => console.log(err));
  }, [tasks]);

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
        <h1 className="title">Lista de Tarefas</h1>
        <Form tasks={tasks} setTasks={setTasks} />
        <Tasks
          tasks={tasks}
          setTasks={setTasks}
          setTotalDeTasksCompletas={setTotalDeTasksCompletas}
        />
      </main>
      <h3 className="tasks__completas">{`Total de tasks: ${tasks.length}`}</h3>
      <h3 className="tasks__completas">
        {`Total de tasks concluídas: ${totalDeTasksCompletas}%`}
      </h3>
    </>
  );
}

export default App;
