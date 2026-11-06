import * as repository from '../repository/temperaturaRepository.js'
import { processarMedicao } from '../service/temperaturaService.js'

const erroInterno = (res, error) => {
  console.error(error)
  return res.status(500).json({
    message: 'Erro interno no servidor.',
    detalhes: error.message,
  })
}

const validarId = (id) => /^\\d+$/.test(id) && Number(id) > 0

export async function listar(req, res) {
  try {
    const medicoes = await repository.listarTodas()
    return res.status(200).json({ medicoes })
  } catch (error) {
    return erroInterno(res, error)
  }
}

export async function listarIdeais(req, res) {
  try {
    const medicoes = await repository.listarTemperaturasIdeais()
    return res.status(200).json({ medicoes })
  } catch (error) {
    return erroInterno(res, error)
  }
}

export async function buscar(req, res) {
  try {
    const { id } = req.params
    if (!validarId(id)) return res.status(400).json({ message: 'ID inválido.' })
    const medicao = await repository.buscarPorId(id)
    if (!medicao) return res.status(404).json({ message: 'Medição não encontrada.' })
    return res.status(200).json(medicao)
  } catch (error) {
    return erroInterno(res, error)
  }
}

export async function criar(req, res) {
  try {
    const dados = processarMedicao(req.body)
    const medicao = await repository.criar(dados)
    return res.status(201).json(medicao)
  } catch (error) {
    if (error.message.startsWith('O campo') || error.message.startsWith('Tipo inválido')) {
      return res.status(400).json({ message: error.message })
    }
    return erroInterno(res, error)
  }
}

export async function atualizar(req, res) {
  try {
    const { id } = req.params
    if (!validarId(id)) return res.status(400).json({ message: 'ID inválido.' })
    const dados = processarMedicao(req.body)
    const medicao = await repository.atualizar(id, dados)
    if (!medicao) return res.status(404).json({ message: 'Medição não encontrada.' })
    return res.status(200).json(medicao)
  } catch (error) {
    if (error.message.startsWith('O campo') || error.message.startsWith('Tipo inválido')) {
      return res.status(400).json({ message: error.message })
    }
    return erroInterno(res, error)
  }
}

export async function remover(req, res) {
  try {
    const { id } = req.params
    if (!validarId(id)) return res.status(400).json({ message: 'ID inválido.' })
    const removida = await repository.excluir(id)
    if (!removida) return res.status(404).json({ message: 'Medição não encontrada.' })
    return res.status(200).json({ message: 'Medição removida com sucesso.' })
  } catch (error) {
    return erroInterno(res, error)
  }
}
