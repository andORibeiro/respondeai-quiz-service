
# 📝 RespondeAI Quiz Service

[![Documentação Swagger](https://img.shields.io/badge/Swagger-Documentação-green?logo=swagger)](http://localhost:3003/api-docs)

🚀 **RespondeAI Quiz Service** é o microserviço responsável por gerenciar quizzes da plataforma RespondeAI. Ele permite que professores criem rascunhos com questões geradas por IA, aprovem perguntas manualmente, finalizem quizzes, e que alunos visualizem e respondam quizzes com avaliação automática de desempenho.

---

## 🧠 Inspirado por

Esse projeto faz parte do ecossistema **RespondeAI**, focado em soluções educacionais assistidas por IA.

---

## 🛠️ Funcionalidades

- **Criação de rascunho de quiz com IA (Gemini)**
- **Revisão e aprovação manual de perguntas**
- **Regeração automática de perguntas rejeitadas**
- **Finalização do rascunho para criar um quiz definitivo**
- **Resolução de quizzes por alunos**
- **Correção automática e atribuição de XP**
- **Exibição de quizzes disponíveis, por professor, por turma e respondidos**
- **Resumo do desempenho por quiz**
- **Estatísticas do último quiz criado por professor**
- **Detalhamento do quiz com e sem gabarito**
- **Integração com User Service para somar XP automaticamente**

---

## 📁 Estrutura de Pastas

```
respondeai-quiz-service/
├── .env.example               # Exemplo de variáveis de ambiente
├── README.md                  # Documentação do projeto
├── server.js                  # Inicialização do servidor
└── src/
    ├── config/                # Conexão com MongoDB e Swagger
    ├── controllers/           # Lógica de negócio dos endpoints
    ├── models/                # Modelos de Quiz, QuizDraft e Resposta
    ├── routes/                # Rotas da API (quizzes e rascunhos)
    └── swaggerDocs/           # Documentação Swagger centralizada
```

---

## ✅ Pré-requisitos

- Node.js >= 18
- MongoDB Atlas ou MongoDB local
- Serviço respondeai-user-service em execução (para somar XP)

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/respondeai-quiz-service.git

# Acesse a pasta
cd respondeai-quiz-service

# Instale as dependências
npm install

# Copie o exemplo de variáveis de ambiente
cp .env.example .env

# Inicie o servidor
npm start
```

---

## 🔐 Variáveis de Ambiente

```bash
PORT=3003
MONGODB_URI=mongodb://localhost:27017/respondeai_quiz
GEMINI_API_KEY=sua-chave-do-gemini
```

---

## 📄 Endpoints Úteis

### 🎯 Quizzes (Finalizados)
| Método | Rota                                                | Descrição                                          |
|--------|-----------------------------------------------------|----------------------------------------------------|
| GET    | /api/quizzes/disponiveis/:alunoId                   | Lista quizzes disponíveis para o aluno             |
| GET    | /api/quizzes/respondidos/:alunoId                   | Lista quizzes já respondidos por um aluno          |
| GET    | /api/quizzes/professor/:professorId                 | Lista quizzes criados por um professor             |
| GET    | /api/quizzes/turma/:turma                           | Lista quizzes por turma                            |
| GET    | /api/quizzes/:quizId                                | Detalha o quiz (aluno, sem gabarito)               |
| GET    | /api/quizzes/:quizId/completo                       | Detalha o quiz com gabarito (professor)            |
| GET    | /api/quizzes/:quizId/resumo/:alunoId                | Retorna o resumo do desempenho do aluno            |
| GET    | /api/quizzes/estatisticas/ultimo/:professorId       | Estatísticas do último quiz do professor           |
| POST   | /api/quizzes/responder                              | Envia respostas do aluno e calcula XP              |

### ✍️ Rascunhos de Quiz (IA + Aprovação Manual)
| Método | Rota                                                       | Descrição                                            |
|--------|------------------------------------------------------------|------------------------------------------------------|
| POST   | /api/rascunhos/draft                                       | Cria rascunho com questões geradas por IA (Gemini)  |
| GET    | /api/rascunhos/:draftId/perguntas/pendentes               | Lista perguntas pendentes de aprovação               |
| PATCH  | /api/rascunhos/:draftId/perguntas/avaliar                | Aprova ou rejeita uma pergunta                      |
| POST   | /api/rascunhos/:draftId/perguntas/regerar                | Regera perguntas rejeitadas                          |
| PATCH  | /api/rascunhos/:draftId/finalizar                         | Finaliza o rascunho e cria quiz definitivo           |

---

## 📘 Swagger - Documentação Técnica da API

A API do RespondeAI Quiz Service é documentada com Swagger (OpenAPI 3.0).

### 🔗 Acesse via navegador:
```
http://localhost:3003/api-docs
```

> Ideal para devs e testers validarem rapidamente a API e integrarem com os outros serviços.
