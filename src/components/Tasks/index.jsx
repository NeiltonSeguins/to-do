import React from "react";
import api from "../../services/api";
import estilos from "./Tasks.module.css";

export default function Tasks({ tasks, setTasks }) {
  const marcaTaskCompleta = (id) => {
    tasks.map((task) => {
      if (task.id === id) {
        const taskAtualizada = { completa: !task.completa };
        api
          .put(`/tasks/${id}`, taskAtualizada)
          .then((res) => setTasks(res.data))
          .catch((err) => console.log(err));
      }
      return task;
    });
  };

  const removeTask = (id) => {
    api
      .delete(`/tasks/${id}`)
      .then((res) =>
        console.log(`Status ${res.status} - Task deletada com sucesso`)
      )
      .catch((err) => console.log(`Parece que tivemos um erro = ${err}`));
  };

  return (
    <ul>
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            <div
              className={`${estilos.container} ${
                task.completa ? estilos.task__completa : ""
              }`}
            >
              <p>{task.titulo}</p>
              <span>
                <button onClick={() => marcaTaskCompleta(task.id)}>✔️</button>
                <button onClick={() => removeTask(task.id)}>❌</button>
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
