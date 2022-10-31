import React, { useState } from "react";
import Button from "../Button";
import "./Form.css";

export default function Form({ tasks, setTasks, updateLocalStorage }) {
  const [valor, setValor] = useState("");

  const onChange = (evento) => {
    setValor(evento.target.value);
  };

  const onSubmit = (evento) => {
    evento.preventDefault();
    const novaTask = {
      id: Math.random().toString(10).substring(2, 6),
      titulo: valor,
      completa: false,
    };
    updateLocalStorage([...tasks, novaTask]);
    setTasks([...tasks, novaTask]);
    setValor("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        value={valor}
        className="campo__texto"
        type="text"
        placeholder="Adicione uma tarefa"
      />
      <Button type="submit">Adicionar</Button>
    </form>
  );
}
