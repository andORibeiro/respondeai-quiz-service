const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const quizController = require('../controllers/quizController');

// ✅ Listar quizzes disponíveis para o aluno (com lógica de filtro correta)
router.get('/disponiveis/:alunoId', quizController.listarQuizzesDisponiveis);

// ✅ Listar quizzes por professor (com enriquecimento de informações)
router.get('/professor/:professorId', quizController.listarQuizzesPorProfessor);

// ✅ Obter resumo da tentativa de um aluno em um quiz
router.get('/:quizId/resumo/:alunoId', quizController.resumoResposta);

// ✅ Listar quizzes já respondidos por um aluno
router.get('/respondidos/:alunoId', quizController.quizzesRespondidosPorAluno);

// ✅ Buscar estatísticas do último quiz de um professor
router.get('/estatisticas/ultimo/:professorId', quizController.estatisticaUltimoQuiz);

// ✅ Detalhar quiz completo para o professor (com respostas corretas)
router.get('/:quizId/completo', quizController.quizProfessorView);

// ✅ Listar quiz (detalhe) por ID para o aluno (sem respostas corretas)
router.get('/:quizId', quizController.quizAlunoView);

// ✅ Registrar resposta do aluno com correção e cálculo de XP
router.post('/responder', quizController.responderQuiz);

module.exports = router;
