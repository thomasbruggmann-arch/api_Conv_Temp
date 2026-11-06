import express from 'express'
import { configDotenv } from 'dotenv'
import { rotas } from './src/routes/routes.js'

configDotenv()

const server = express()
server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ message: 'API de medições e conversão de temperatura operacional.' })
})

server.use(rotas)

// JSON inválido enviado no corpo da requisição.
server.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ message: 'Corpo JSON inválido.' })
  }
  return res.status(500).json({ message: 'Erro interno no servidor.', detalhes: error.message })
})

export { server }
