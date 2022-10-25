import React from "react";
import estilos from "./Tasks.module.css";

export default function Tasks({ tasks, setTasks }) {

  const marcaTaskCompleta = (id) => {
    const taskCompleta = tasks.map((task) => {
      if(task.id === id){
        return {...task, completa: !task.completa}
      }
      return task
    })
    setTasks(taskCompleta);
  }

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <ul>
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            <div className={estilos.container}>
              <p className={`${task.completa ? estilos.task__completa : ''}`}>{task.titulo}</p>
              <span>
                <button onClick={()=> marcaTaskCompleta(task.id)}>✔️</button>
                <button onClick={()=> removeTask(task.id)}>❌</button>
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
