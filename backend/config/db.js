import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'flour_dude_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL Database Connected Successfully')
    connection.release()
  })
  .catch(err => {
    console.error('❌ MySQL Connection Error:', err.message)
    console.error('Please check your database configuration in .env file')
  })

export default pool
