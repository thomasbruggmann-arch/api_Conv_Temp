// Regras de negócio: conversão e classificação de temperatura.
export function processarMedicao({ descricao, tipo, valor }) {
  if (typeof descricao !== 'string' || !descricao.trim()) {
    throw new Error('O campo descricao é obrigatório e deve ser um texto.')
  }

  if (typeof tipo !== 'string' || tipo.trim().toLowerCase() !== 'temperatura') {
    throw new Error('Tipo inválido. O único tipo aceito é "temperatura".')
  }

  const valorNumerico = typeof valor === 'number'
    ? valor
    : (typeof valor === 'string' && valor.trim() !== '' ? Number(valor) : NaN)
  if (!Number.isFinite(valorNumerico)) {
    throw new Error('O campo valor é obrigatório e deve ser numérico.')
  }

  const celsius = valorNumerico
  const fahrenheit = Number(((celsius * 9) / 5 + 32).toFixed(2))

  let classificacao
  if (celsius < 80) {
    classificacao = 'Temperatura ideal'
  } else if (celsius >= 95 && celsius <= 105) {
    classificacao = 'Acima da temperatura ideal'
  } else if (celsius > 105) {
    classificacao = 'Limite crítico'
  } else {
    // O enunciado não define classificação para valores de 80 °C até abaixo de 95 °C.
    classificacao = 'Faixa não definida no enunciado'
  }

  return {
    descricao: descricao.trim(),
    tipo: 'temperatura',
    valor_original: celsius,
    unidade_original: 'celsius',
    valor_convertido: fahrenheit,
    unidade_convertida: 'fahrenheit',
    classificacao,
  }
}
