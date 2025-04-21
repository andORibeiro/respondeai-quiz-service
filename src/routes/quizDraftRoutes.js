const express = require("express");
const router = express.Router();
const quizDraftController = require("../controllers/quizDraftController");

/**
 * @swagger
 * /api/quizzes/draft:
 *   post:
 *     summary: Cria um novo rascunho de quiz com questões geradas por IA
 *     tags: [Quizzes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               professorId:
 *                 type: string
 *               turma:
 *                 type: string
 *               materia:
 *                 type: string
 *               quantidade:
 *                 type: number
 *     responses:
 *       201:
 *         description: Rascunho criado com sucesso
 *       500:
 *         description: Erro ao criar rascunho
 */
router.post("/draft", quizDraftController.criarRascunho);

module.exports = router;