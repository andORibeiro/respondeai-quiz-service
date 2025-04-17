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
