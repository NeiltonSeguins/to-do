import Form from "./components/Form";
import "./styles/global.css";
import "./App.css";
import Tasks from "./components/Tasks";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <main>
      <h1>To-Do</h1>
      <Form tasks={tasks} setTasks={setTasks} />
      <Tasks tasks={tasks} setTasks={setTasks} />
    </main>
  );
}

export default App;
