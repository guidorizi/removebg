import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../models/schema";
import dotenv from "dotenv";
import path from "path";

// Carrega o .env da raiz
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Verifica se a URL existe
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL não encontrada no .env");
  process.exit(1);
}

// === MUDANÇA AQUI: Usando Pool (Requisito do Professor) ===
// O createPool não precisa de 'await', o que resolve o seu erro vermelho!
const connectionPool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("✅ Pool de conexões configurado!");

export const db = drizzle(connectionPool, { schema, mode: "default" });