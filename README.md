# API REST — Conversão e Registro de Medições

Projeto adaptado para o exercício de Banco de Dados. Desenvolvido com Node.js, Express e MySQL (`mysql2/promise`).

## Requisitos
- Node.js 18 ou superior
- MySQL
- Postman (ou ferramenta equivalente)

## 1. Banco de dados
No MySQL Workbench, abra e execute o arquivo `database.sql`. Ele cria o banco `conversao_temperaturas` e a tabela `medicoes`.

## 2. Configuração
Instale as dependências:

```bash
npm install
```

Copie `.env.example` para `.env` e configure os dados de acesso ao seu MySQL:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=conversao_temperaturas
```

Não publique o arquivo `.env` no GitHub.

## 3. Executar

```bash
npm run dev
```

ou

```bash
npm start
```

A API ficará disponível em `http://localhost:3000`. O servidor verifica a conexão com o banco antes de iniciar.

## 4. Rotas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/` | Verifica se a API está operacional |
| GET | `/medicao` | Lista todas as medições |
| GET | `/medicao/temperatura_ideal` | Lista medições classificadas como Temperatura ideal |
| GET | `/medicao/:id` | Busca uma medição pelo ID |
| POST | `/medicao` | Cadastra uma medição |
| PUT | `/medicao/:id` | Atualiza uma medição e refaz os cálculos |
| DELETE | `/medicao/:id` | Exclui uma medição |

## 5. Exemplo de cadastro

`POST http://localhost:3000/medicao`

```json
{
  "descricao": "Teste de temperatura do processador",
  "tipo": "temperatura",
  "valor": 100
}
```

Resposta esperada (os valores de `id` podem variar):

```json
{
  "id": 1,
  "descricao": "Teste de temperatura do processador",
  "tipo": "temperatura",
  "valor_original": 100,
  "unidade_original": "celsius",
  "valor_convertido": 212,
  "unidade_convertida": "fahrenheit",
  "classificacao": "Acima da temperatura ideal"
}
```

## 6. Regras implementadas
- Conversão: `F = (C * 9 / 5) + 32`.
- O resultado convertido é arredondado para duas casas decimais.
- Abaixo de 80 °C: `Temperatura ideal`.
- De 95 °C até 105 °C, inclusive: `Acima da temperatura ideal`.
- Acima de 105 °C: `Limite crítico`.
- O documento não define classificação para valores de 80 °C até abaixo de 95 °C. Para não inventar uma regra, o projeto registra esses valores como `Faixa não definida no enunciado`. Confirme com o professor se essa faixa deve receber outra classificação.

## 7. Validações e erros
- `descricao`, `tipo` e `valor` são obrigatórios.
- O tipo aceito é `temperatura`.
- ID inválido retorna 400.
- Registro inexistente retorna 404.
- Falhas internas do banco retornam 500 com a propriedade `detalhes`.

## 8. Organização do código
- `src/routes`: definição dos endpoints.
- `src/controller`: recebe requisições, valida parâmetros e define respostas HTTP.
- `src/service`: regras de negócio, conversão e classificação.
- `src/repository`: comandos SQL e acesso aos dados.
- `src/config`: configuração da conexão MySQL.
- `database.sql`: criação do banco e da tabela.

## Observação sobre o enunciado
O exemplo de resposta da atividade contém números que não correspondem ao exemplo de entrada (100 °C não resulta em 33,78 °F). A implementação segue a fórmula matemática especificada: 100 °C = 212 °F.
# api_Conv_Temp
