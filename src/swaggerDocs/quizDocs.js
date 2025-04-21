/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Endpoints para gerenciamento de quizzes
 */

/**
 * @swagger
 * /api/quizzes:
 *   post:
 *     summary: Criar um novo quiz
 *     tags: [Quizzes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, materia, professorId, perguntas, dataFinal]
 *             properties:
 *               nome:
 *                 type: string
 *               materia:
 *                 type: string
 *               professorId:
 *                 type: string
 *               dataFinal:
 *                 type: string
 *               perguntas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     perguntaId:
 *                       type: string
 *                     enunciado:
 *                       type: string
 *                     opcoes:
 *                       type: array
 *                       items:
 *                         type: string
 *                     respostaCorreta:
 *                       type: string
 *     responses:
 *       201:
 *         description: Quiz criado com sucesso
 *       400:
 *         description: Campos obrigatórios ausentes ou inválidos
 *       500:
 *         description: Erro ao criar quiz
 */

/**
 * @swagger
 * /api/quizzes/disponiveis/{alunoId}:
 *   get:
 *     summary: Listar quizzes disponíveis para um aluno
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: alunoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de quizzes disponíveis
 *       500:
 *         description: Erro ao buscar quizzes disponíveis
 */

/**
 * @swagger
 * /api/quizzes/professor/{professorId}:
 *   get:
 *     summary: Listar quizzes por professor
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: professorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de quizzes com estatísticas
 *       500:
 *         description: Erro ao buscar quizzes do professor
 */

/**
 * @swagger
 * /api/quizzes/responder:
 *   post:
 *     summary: Submeter resposta de um aluno a um quiz
 *     tags: [Quizzes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quizId, alunoId, respostas]
 *             properties:
 *               quizId:
 *                 type: string
 *               alunoId:
 *                 type: string
 *               respostas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     perguntaId:
 *                       type: string
 *                     respostaEscolhida:
 *                       type: string
 *     responses:
 *       201:
 *         description: Resposta registrada e XP atualizado
 *       400:
 *         description: Campos obrigatórios ausentes ou quiz sem perguntas
 *       404:
 *         description: Quiz não encontrado
 *       500:
 *         description: Erro ao responder o quiz
 */

/**
 * @swagger
 * /api/quizzes/{quizId}/resumo/{alunoId}:
 *   get:
 *     summary: Ver resumo do desempenho do aluno em um quiz
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: alunoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resumo com acertos, XP e data
 *       404:
 *         description: Resposta ou quiz não encontrado
 *       500:
 *         description: Erro ao buscar resumo da resposta
 */

/**
 * @swagger
 * /api/quizzes/respondidos/{alunoId}:
 *   get:
 *     summary: Listar quizzes já respondidos por um aluno
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: alunoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de quizzes respondidos
 *       500:
 *         description: Erro ao listar quizzes respondidos
 */

/**
 * @swagger
 * /api/quizzes/estatisticas/ultimo/{professorId}:
 *   get:
 *     summary: Ver estatísticas do último quiz do professor
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: professorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estatísticas de alunos que responderam
 *       404:
 *         description: Nenhum quiz encontrado
 *       500:
 *         description: Erro ao buscar estatísticas do último quiz
 */

/**
 * @swagger
 * /api/quizzes/{quizId}/completo:
 *   get:
 *     summary: Detalhar quiz completo com respostas corretas (somente professor)
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados completos do quiz
 *       404:
 *         description: Quiz não encontrado
 *       500:
 *         description: Erro ao detalhar quiz completo
 */

/**
 * @swagger
 * /api/quizzes/{quizId}:
 *   get:
 *     summary: Detalhar quiz sem gabarito (para aluno)
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do quiz
 *       404:
 *         description: Quiz não encontrado
 *       500:
 *         description: Erro ao detalhar quiz
 */

/**
 * @swagger
 * tags:
 *   - name: Quizzes
 *     description: Gerenciamento de quizzes com geração por IA
 */

/**
 * @swagger
 * tags:
 *   - name: Rascunhos
 *     description: Gerenciamento de quizzes em rascunho (pré-aprovação de perguntas)
 */

/**
 * @swagger
 * /api/rascunhos/draft:
 *   post:
 *     summary: Cria um novo rascunho de quiz com questões geradas por IA (Gemini)
 *     tags: [Rascunhos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [professorId, turma, materia, quantidade]
 *             properties:
 *               professorId:
 *                 type: string
 *               turma:
 *                 type: string
 *               materia:
 *                 type: string
 *               quantidade:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Rascunho criado com sucesso
 *       500:
 *         description: Erro ao criar rascunho
 */

/**
 * @swagger
 * /api/rascunhos/{draftId}/perguntas/pendentes:
 *   get:
 *     summary: Lista perguntas pendentes de aprovação no rascunho
 *     tags: [Rascunhos]
 *     parameters:
 *       - name: draftId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do rascunho
 *     responses:
 *       200:
 *         description: Perguntas pendentes retornadas com sucesso
 *       404:
 *         description: Rascunho não encontrado
 *       500:
 *         description: Erro ao buscar perguntas pendentes
 */

/**
 * @swagger
 * /api/rascunhos/{draftId}/perguntas/avaliar:
 *   patch:
 *     summary: Aprova ou rejeita uma pergunta específica
 *     tags: [Rascunhos]
 *     parameters:
 *       - name: draftId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do rascunho
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               perguntaId:
 *                 type: string
 *               aprovada:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Avaliação registrada com sucesso
 *       404:
 *         description: Rascunho ou pergunta não encontrada
 *       500:
 *         description: Erro ao avaliar pergunta
 */

/**
 * @swagger
 * /api/rascunhos/{draftId}/perguntas/regerar:
 *   post:
 *     summary: Regera novas perguntas para substituir as rejeitadas
 *     tags: [Rascunhos]
 *     parameters:
 *       - name: draftId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do rascunho
 *     responses:
 *       201:
 *         description: Perguntas regeneradas com sucesso
 *       400:
 *         description: Nenhuma pergunta rejeitada
 *       404:
 *         description: Rascunho não encontrado
 *       500:
 *         description: Erro ao regerar perguntas
 */

/**
 * @swagger
 * /api/rascunhos/{draftId}/finalizar:
 *   patch:
 *     summary: Finaliza o rascunho e transforma em quiz definitivo
 *     tags: [Rascunhos]
 *     parameters:
 *       - name: draftId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do rascunho
 *     responses:
 *       201:
 *         description: Quiz final criado com sucesso
 *       400:
 *         description: Rascunho incompleto
 *       404:
 *         description: Rascunho não encontrado
 *       500:
 *         description: Erro ao finalizar rascunho
 */
