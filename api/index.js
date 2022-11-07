import express, { json } from "express";
import cors from "cors";

const port = 8080;
const app = express();

app.set("json spaces", 2);
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: "To-do App" });
});

const tasks = [
  {
    id: 1,
    titulo: "Estudar JavaScript",
    completa: false,
  },
];

app
  .route("/tasks")
  .get((req, res) => {
    res.status(200).json(tasks);
  })
  .post((req, res) => {
    tasks.push(req.body);
    res.status(201).send("Task foi cadastrada com sucesso");
  });

app
  .route("/tasks/:id")
  .get((req, res) => {
    let indice = getTasks(req.params.id);
    res.status(200).json(tasks[indice]);
  })
  .put((req, res) => {
    let indice = getTasks(req.params.id);
    tasks[indice].completa = req.body.completa;
    res.status(200).json(tasks);
  })
  .delete((req, res) => {
    let { id } = req.params;
    let indice = getTasks(id);
    tasks.splice(indice, 1);
    res.send(`Task ${id} removida com sucesso`);
  });

app.listen(port, () => {
  console.log(`To-do app API - port ${8080}`);
  console.log("This is CORS-enabled for all origins!");
});

function getTasks(id) {
  return tasks.findIndex((task) => task.id == id);
}
