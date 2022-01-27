import express from "express";
import cors from "cors";

const appClient = express();

appClient.use(express.json());
appClient.use(cors());

appClient.get("/", (req, res) => {
  return res.json({ message: "ola" });
});

appClient.post("/app", (req, res) => {
  const { entidade } = req.body;
  console.log(entidade);
});

appClient.listen(8080, () => {
  console.log("Servido do cliente rodando");
});
