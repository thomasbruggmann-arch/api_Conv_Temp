import { database } from '../config/database.js'

export async function listarTodas() {
  const [rows] = await database.execute('SELECT * FROM medicoes ORDER BY id')
  return rows
}

export async function listarTemperaturasIdeais() {
  const [rows] = await database.execute(
    'SELECT * FROM medicoes WHERE classificacao = ? ORDER BY id',
    ['Temperatura ideal'],
  )
  return rows
}

export async function buscarPorId(id) {
  const [rows] = await database.execute('SELECT * FROM medicoes WHERE id = ?', [id])
  return rows[0] ?? null
}

export async function criar(dados) {
  const [result] = await database.execute(
    `INSERT INTO medicoes
      (descricao, tipo, valor_original, unidade_original, valor_convertido, unidade_convertida, classificacao)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      dados.descricao,
      dados.tipo,
      dados.valor_original,
      dados.unidade_original,
      dados.valor_convertido,
      dados.unidade_convertida,
      dados.classificacao,
    ],
  )
  return buscarPorId(result.insertId)
}

export async function atualizar(id, dados) {
  const [result] = await database.execute(
    `UPDATE medicoes
     SET descricao = ?, tipo = ?, valor_original = ?, unidade_original = ?,
         valor_convertido = ?, unidade_convertida = ?, classificacao = ?
     WHERE id = ?`,
    [
      dados.descricao,
      dados.tipo,
      dados.valor_original,
      dados.unidade_original,
      dados.valor_convertido,
      dados.unidade_convertida,
      dados.classificacao,
      id,
    ],
  )
  if (result.affectedRows === 0) return null
  return buscarPorId(id)
}

export async function excluir(id) {
  const [result] = await database.execute('DELETE FROM medicoes WHERE id = ?', [id])
  return result.affectedRows > 0
}
