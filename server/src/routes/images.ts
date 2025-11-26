import { Router } from "express";
import { db } from "../config/db";
import { processedImages } from "../models/schema";
import { desc } from "drizzle-orm";

export const imagesRouter = Router();

// === ROTA 1: LISTAR HISTÓRICO (GET) ===
imagesRouter.get("/", async (req, res) => {
  try {
    // Busca as imagens no banco ordenando pelas mais recentes
    const history = await db.select()
      .from(processedImages)
      .orderBy(desc(processedImages.createdAt));
    
    res.json(history);
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    res.status(500).json({ error: "Erro interno ao buscar histórico" });
  }
});

// === ROTA 2: SALVAR NOVA IMAGEM (POST) ===
imagesRouter.post("/", async (req, res) => {
  try {
    const { originalUrl, processedUrl, originalKey, processedKey } = req.body;

    // 1. Validação (Requisito: "Verificação de preenchimento de campos") [cite: 43]
    if (!originalUrl || !processedUrl) {
      return res.status(400).json({ error: "URLs da imagem são obrigatórias." });
    }

    // 2. Inserção no Banco (Requisito: "Inserção") [cite: 15]
    await db.insert(processedImages).values({
      originalUrl,
      processedUrl,
      originalKey,
      processedKey,
    });

    res.status(201).json({ message: "Imagem salva com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar imagem:", error);
    res.status(500).json({ error: "Erro interno ao salvar imagem" });
  }
});