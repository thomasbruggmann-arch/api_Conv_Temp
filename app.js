import { server } from './server.js'
import { database } from './src/config/database.js'

const PORT = Number(process.env.PORT) || 3000

const start = async () => {
  try {
    // Verifica a conexão antes de iniciar o servidor.
    const connection = await database.getConnection()
    connection.release()

    server.listen(PORT, () => {
      console.log(`API rodando em http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Não foi possível conectar ao MySQL:', error.message)
    process.exit(1)
  }
}

start()
