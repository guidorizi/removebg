// Adicione 'longtext' na importação
import { mysqlTable, serial, varchar, longtext, timestamp } from "drizzle-orm/mysql-core";

export const processedImages = mysqlTable("processed_images", {
  id: serial("id").primaryKey(),
  // Mude de text(...) para longtext(...) nessas duas linhas:
  originalUrl: longtext("original_url").notNull(),
  processedUrl: longtext("processed_url").notNull(),
  
  originalKey: varchar("original_key", { length: 255 }),
  processedKey: varchar("processed_key", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});