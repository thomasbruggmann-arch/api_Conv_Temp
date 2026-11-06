import express from 'express'
import {
  listar,
  listarIdeais,
  buscar,
  criar,
  atualizar,
  remover,
} from '../controller/temperaturaController.js'

const router = express.Router()

// A rota específica precisa vir antes de /medicao/:id.
router.get('/medicao/temperatura_ideal', listarIdeais)
router.get('/medicao', listar)
router.get('/medicao/:id', buscar)
router.post('/medicao', criar)
router.put('/medicao/:id', atualizar)
router.delete('/medicao/:id', remover)

export { router as rotas }
