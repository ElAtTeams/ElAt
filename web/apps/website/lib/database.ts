import mysql from "mysql2/promise"

export async function createConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "yankapi_db",
    port: Number.parseInt(process.env.DB_PORT || "3306"),
  })

  return connection
}
