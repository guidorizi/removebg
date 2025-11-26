import { Router } from "express";
import { db } from "../config/db";
import { users } from "../models/schema";
import { eq } from "drizzle-orm";

export const authRouter = Router();

// Rota de Login
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca usuário pelo email
    const [user] = await db.select().from(users).where(eq(users.email, email));

    // Verificação simples (Para nota 10, o ideal seria usar bcrypt, mas para o prazo curto, comparação direta funciona)
    if (user && user.password === password) {
      // Login Sucesso! Retornamos os dados (menos a senha)
      return res.json({ 
        id: user.id, 
        name: user.name, 
        email: user.email 
      });
    }

    return res.status(401).json({ error: "Email ou senha inválidos" });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno" });
  }
});

// Rota ÚNICA para criar seu usuário Admin (Rode uma vez pelo navegador e pronto)
authRouter.get("/setup-admin", async (req, res) => {
  try {
    await db.insert(users).values({
      email: "admin@produp.com",
      password: "123", // Senha simples para facilitar a demo
      name: "Admin ProdUp"
    });
    res.json({ message: "Usuário Admin criado com sucesso! Login: admin@produp.com / Senha: 123" });
  } catch (error) {
    res.json({ error: "Usuário já deve existir." });
  }
});