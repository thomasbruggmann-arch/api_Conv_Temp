import test from 'node:test'
import assert from 'node:assert/strict'
import { processarMedicao } from './temperaturaService.js'

test('converte 100 °C para 212 °F e classifica a faixa', () => {
  const result = processarMedicao({ descricao: 'Teste', tipo: 'temperatura', valor: 100 })
  assert.equal(result.valor_convertido, 212)
  assert.equal(result.classificacao, 'Acima da temperatura ideal')
})

test('arredonda Fahrenheit para duas casas decimais', () => {
  const result = processarMedicao({ descricao: 'Teste', tipo: 'temperatura', valor: 37 })
  assert.equal(result.valor_convertido, 98.6)
})

test('classifica abaixo de 80 °C como temperatura ideal', () => {
  assert.equal(
    processarMedicao({ descricao: 'Teste', tipo: 'temperatura', valor: 79 }).classificacao,
    'Temperatura ideal',
  )
})

test('classifica acima de 105 °C como limite crítico', () => {
  assert.equal(
    processarMedicao({ descricao: 'Teste', tipo: 'temperatura', valor: 106 }).classificacao,
    'Limite crítico',
  )
})

test('não aceita tipo diferente de temperatura', () => {
  assert.throws(
    () => processarMedicao({ descricao: 'Teste', tipo: 'pressao', valor: 50 }),
    /Tipo inválido/,
  )
})
