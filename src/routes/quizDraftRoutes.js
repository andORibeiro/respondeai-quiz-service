const express = require("express");
const router = express.Router();
const quizDraftController = require("../controllers/quizDraftController");


router.post("/draft", quizDraftController.criarRascunho);

// ✅ Listar perguntas pendentes de aprovação de um quiz draft
router.get('/:draftId/perguntas/pendentes', quizDraftController.listarPerguntasPendentes);

// ✅ Aprovar ou rejeitar pergunta individualmente
router.patch('/:draftId/perguntas/avaliar', quizDraftController.avaliarPergunta);

// ✅ Regerar perguntas reprovadas usando Gemini
router.post('/:draftId/perguntas/regerar', quizDraftController.regerarPerguntasRejeitadas);


router.patch('/:draftId/finalizar', quizDraftController.finalizarRascunho);


module.exports = router;