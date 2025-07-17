import { Pool } from "pg"

let pool: Pool

export function getDbPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Adjust based on your production needs
      },
    })

    pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err)
      process.exit(-1)
    })
  }
  return pool
}

export async function query(text: string, params?: any[]) {
  const client = await getDbPool().connect()
  try {
    const res = await client.query(text, params)
    return res
  } finally {
    client.release()
  }
}

export async function shutdownDbPool() {
  if (pool) {
    await pool.end()
    console.log("Database pool shut down.")
  }
}

// Global shutdown handler for graceful exit
process.on("SIGINT", async () => {
  await shutdownDbPool()
  process.exit(0)
})

process.on("SIGTERM", async () => {
  await shutdownDbPool()
  process.exit(0)
})

// This is a placeholder for your database connection.
// When you integrate with a real database, you will set up your connection here.

// For now, we'll just export a mock client.
export const db = {
  user: {
    findUnique: async ({ where }) => {
      // Mock user data for testing
      if (where.email === "test@example.com") {
        return {
          id: "mock-user-id",
          email: "test@example.com",
          password_hash: "mock-hashed-password", // In a real app, this would be a hashed password
          firstName: "Test",
          lastName: "User",
        }
      }
      return null
    },
    create: async ({ data }) => {
      // Simulate user creation
      console.log("Mock: Creating user", data)
      return {
        id: `mock-user-${Math.random().toString(36).substring(7)}`,
        ...data,
      }
    },
    update: async ({ where, data }) => {
      // Simulate user update
      console.log("Mock: Updating user", where, data)
      return {
        id: where.id,
        ...data,
      }
    },
  },
  // Add other mock models as needed
}
