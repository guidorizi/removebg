import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { imagesRouter } from "./routes/images";
import { authRouter } from "./routes/auth";

const app = express();
const PORT = 3000;

// === REQUISITOS DE SEGURANÇA E OTIMIZAÇÃO ===
app.use(helmet());
app.use(compression());
app.use(cors());

// AQUI ESTÁ A MUDANÇA: Aumentamos o limite para aceitar imagens grandes
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// === ROTAS ===
app.use("/api/auth", authRouter);
app.use("/api/images", imagesRouter);

app.get("/", (req, res) => {
  res.json({ message: "API RemoveBG (Padrão Projeto 2) Online!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});