# 📝 RespondeAI Quiz Service
[![Documentação Swagger](https://img.shields.io/badge/Swagger-Documentação-green?logo=swagger)](http://localhost:3003/api-docs)

🚀 **RespondeAI Quiz Service** é o microserviço responsável por gerenciar quizzes da plataforma RespondeAI. Ele permite que professores criem quizzes, alunos visualizem e respondam, além de avaliar automaticamente o desempenho e atualizar o XP dos usuários.

---

## 🧠 Inspirado por

Esse projeto faz parte do ecossistema **RespondeAI**, focado em soluções educacionais assistidas por IA.

---

## 🛠️ Funcionalidades

- **Criação de quizzes com perguntas de múltipla escolha**
- **Resolução de quizzes por alunos**
- **Correção automática e atribuição de XP**
- **Exibição de quizzes disponíveis e respondidos**
- **Resumo do desempenho por quiz**
- **Estatísticas do último quiz criado por professor**

---

## 📁 Estrutura de Pastas

```bash
respondeai-quiz-service/
├── .env.example               # Exemplo de variáveis de ambiente
├── README.md                  # Documentação do projeto
├── server.js                  # Inicialização do servidor
├── src/
│   ├── config/
│   │   └── db.js              # Conexão com o MongoDB
│
│   ├── controllers/
│   │   └── quizController.js  # Controlador com toda a lógica dos endpoints
│
│   ├── models/
│   │   ├── Quiz.js            # Modelo do quiz
│   │   └── QuizResposta.js    # Modelo das respostas dos alunos
│
│   ├── routes/
│   │   └── quizRoutes.js      # Rotas da API para quizzes
```
---

## ✅ Pré-requisitos

- Node.js >= 18
- MongoDB Atlas ou MongoDB local (via Docker)
- **respondeai-user-service** em execução para integração de XP

---

## ⚙️ Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/respondeai-quiz-service.git

# Acesse a pasta do projeto
cd respondeai-quiz-service

# Instale as dependências
npm install

# Copie o arquivo de variáveis de ambiente
cp .env.example .env

# Inicie o servidor
npm start
```

## 🔐 Variáveis de Ambiente
### Configure o arquivo .env com as seguintes variáveis:

```bash
PORT=3003
MONGODB_URI=mongodb://localhost:27017/respondeai_quiz
```
## 📄 Endpoints Úteis

Método	Rota	Descrição
| Método | Rota                                         | Descrição                                      |
|--------|---------------------------------------------|------------------------------------------------|
| POST   | /api/quizzes                                | Cria novo quiz                                 |
| GET    | /api/quizzes/disponiveis/:alunoId           | Lista quizzes disponíveis para o aluno         |
| GET    | /api/quizzes/respondidos/:alunoId           | Lista quizzes já respondidos por um aluno      |
| POST   | /api/quizzes/responder                      | Envia respostas do aluno e calcula XP          |
| GET    | /api/quizzes/:quizId                        | Detalha o quiz (versão para aluno, sem gabarito) |
| GET    | /api/quizzes/:quizId/completo               | Detalha o quiz com gabarito (versão professor) |
| GET    | /api/quizzes/:quizId/resumo/:alunoId        | Retorna o resumo do desempenho do aluno        |
| GET    | /api/quizzes/professor/:professorId         | Lista quizzes criados por um professor         |
| GET    | /api/quizzes/estatisticas/ultimo/:professorId | Estatísticas do último quiz do professor       |
