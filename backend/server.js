const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors({
  origin: "*", // Troque pelo domínio do Vercel em produção
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Health check — Railway usa isso pra saber se o app está vivo
app.get("/", (req, res) => {
  res.json({ mensagem: "CondoGest API funcionando.", status: "ok" });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/chamados", require("./routes/chamados"));
app.use("/api/moradores", require("./routes/moradores"));
app.use("/api/financeiro", require("./routes/financeiro"));

// Middleware de erro global — captura erros das rotas
app.use((err, req, res, next) => {
  console.error("Erro na rota:", err.message);
  res.status(500).json({ erro: "Erro interno no servidor." });
});

// Evita crash por erros assíncronos não tratados
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
    process.exit(1); // Faz o Railway reiniciar corretamente em caso de falha
  });