const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ mensagem: "CondoGest API funcionando.", status: "ok" });
});
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/chamados", require("./src/routes/chamados"));
app.use("/api/moradores", require("./src/routes/moradores"));
app.use("/api/financeiro", require("./src/routes/financeiro"));
app.use((err, req, res, next) => {
  console.error("Erro na rota:", err.message);
  res.status(500).json({ erro: "Erro interno no servidor." });
});
process.on("unhandledRejection", (reason) => {
  console.error("UnhandledRejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("UncaughtException:", err.message);
});
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado.");
    app.listen(PORT, "0.0.0.0", () => {
      console.log("Servidor rodando na porta " + PORT);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar MongoDB:", err.message);
    process.exit(1);
  });
