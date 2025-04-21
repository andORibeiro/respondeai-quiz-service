const Quiz = require('../models/Quiz');
const QuizResposta = require('../models/QuizResposta');
const mongoose = require('mongoose');
const axios = require('axios');
const geminiService = require('../services/geminiService.js');

// Criar quiz
exports.criarQuiz = async (req, res) => {
  try {
    const { nome, materia, anoLetivo, professorId, perguntas, dataFinal } = req.body;

    if (!nome || !materia || !anoLetivo || !professorId || !perguntas || !dataFinal) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes ou inválidos" });
    }

    const novoQuiz = new Quiz({
      nome,
      materia,
      anoLetivo,
      professorId,
      perguntas,
      dataFinal
    });

    await novoQuiz.save();
    res.status(201).json({ message: 'Quiz criado com sucesso', quizId: novoQuiz._id });

  } catch (error) {
    console.error('Erro ao criar quiz:', error);
    res.status(500).json({ error: 'Erro ao criar quiz' });
  }
};


// Listar quizzes disponíveis para um aluno
exports.listarQuizzesDisponiveis = async (req, res) => {
  const { alunoId } = req.params;

  try {
    const hoje = new Date();

    const quizIdsRespondidos = await QuizResposta
      .find({ alunoId })
      .distinct('quizId');

    const quizzes = await Quiz.find({
      _id: { $nin: quizIdsRespondidos.map(id => new mongoose.Types.ObjectId(id)) },
      dataFinal: { $gte: hoje }
    });

    const quizzesComExtras = quizzes.map((quiz) => {
      const diasRestantes = Math.ceil((new Date(quiz.dataFinal) - hoje) / (1000 * 60 * 60 * 24));
      const xpTotal = (quiz.perguntas.length || 0) * 2;

      return {
        _id: quiz._id,
        nome: quiz.nome,
        materia: quiz.materia,
        anoLetivo: quiz.anoLetivo,
        quantidadePerguntas: quiz.perguntas.length,
        diasRestantes: diasRestantes >= 0 ? diasRestantes : 0,
        xpTotal
      };
    });

    res.json(quizzesComExtras);

  } catch (error) {
    console.error('Erro ao buscar quizzes disponíveis:', error);
    res.status(500).json({ error: 'Erro ao buscar quizzes disponíveis' });
  }
};

exports.listarQuizzesPorProfessor = async (req, res) => {
  const { professorId } = req.params;

  try {
    const quizzes = await Quiz.find({ professorId });

    // Enriquecer cada quiz com quantidade de perguntas e de respostas
    const quizzesComInfo = await Promise.all(
      quizzes.map(async (quiz) => {
        const totalRespostas = await QuizResposta.countDocuments({ quizId: quiz._id });

        return {
          _id: quiz._id,
          nome: quiz.nome,
          materia: quiz.materia,
          anoLetivo: quiz.anoLetivo,
          dataFinal: quiz.dataFinal,
          criadoEm: quiz.criadoEm,
          quantidadePerguntas: quiz.perguntas.length,
          quantidadeDeRespostas: totalRespostas
        };
      })
    );

    res.json(quizzesComInfo);
  } catch (error) {
    console.error('Erro ao buscar quizzes do professor:', error);
    res.status(500).json({ error: 'Erro ao buscar quizzes do professor' });
  }
};

exports.quizAlunoView = async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado' });

    const hoje = new Date();
    const diasRestantes = Math.ceil((new Date(quiz.dataFinal) - hoje) / (1000 * 60 * 60 * 24));

    res.json({
      id: quiz._id,
      nome: quiz.nome,
      materia: quiz.materia,
      anoLetivo: quiz.anoLetivo,
      professorId: quiz.professorId,
      criadoEm: quiz.criadoEm,
      dataFinal: quiz.dataFinal,
      perguntas: quiz.perguntas.map((p) => ({
        perguntaId: p.perguntaId,
        enunciado: p.enunciado,
        opcoes: p.opcoes
      })),
      quantidadePerguntas: quiz.perguntas.length,
      xpTotal: quiz.perguntas.length * 2,
      diasRestantes: diasRestantes >= 0 ? diasRestantes : 0
    });
  } catch (error) {
    console.error('Erro ao detalhar quiz (aluno):', error);
    res.status(500).json({ error: 'Erro ao detalhar quiz' });
  }
};
exports.quizProfessorView = async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado' });

    const hoje = new Date();
    const diasRestantes = Math.ceil((new Date(quiz.dataFinal) - hoje) / (1000 * 60 * 60 * 24));

    res.json({
      id: quiz._id,
      nome: quiz.nome,
      materia: quiz.materia,
      anoLetivo: quiz.anoLetivo,
      professorId: quiz.professorId,
      criadoEm: quiz.criadoEm,
      dataFinal: quiz.dataFinal,
      perguntas: quiz.perguntas.map((p) => ({
        perguntaId: p.perguntaId,
        enunciado: p.enunciado,
        opcoes: p.opcoes,
        respostaCorreta: p.respostaCorreta
      })),
      quantidadePerguntas: quiz.perguntas.length,
      xpTotal: quiz.perguntas.length * 2,
      diasRestantes: diasRestantes >= 0 ? diasRestantes : 0
    });
  } catch (error) {
    console.error('Erro ao detalhar quiz (professor):', error);
    res.status(500).json({ error: 'Erro ao detalhar quiz completo' });
  }
};


// POST /responder — funcionalidade 3
exports.responderQuiz = async (req, res) => {
  try {
    const { quizId, alunoId, respostas } = req.body;

    if (!quizId || !alunoId || !respostas || !Array.isArray(respostas)) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes ou inválidos" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado' });

    if (!quiz.perguntas || quiz.perguntas.length === 0) {
      return res.status(400).json({ error: "Quiz sem perguntas válidas" });
    }

    let xpGanho = 0;

    const respostasCorrigidas = respostas.map((resposta) => {
      const perguntaOriginal = quiz.perguntas.find(p => p.perguntaId === resposta.perguntaId);

      const correta = perguntaOriginal && perguntaOriginal.respostaCorreta === resposta.respostaEscolhida;
      if (correta) xpGanho += 2;

      return {
        perguntaId: resposta.perguntaId,
        respostaEscolhida: resposta.respostaEscolhida,
        correta
      };
    });

    const respostaRegistrada = new QuizResposta({
      quizId: new mongoose.Types.ObjectId(quizId),
      alunoId,
      respostas: respostasCorrigidas,
      xpGanho
    });

    await respostaRegistrada.save();

    try {
      await axios.patch(`http://localhost:3002/api/usuarios/${alunoId}/xp`, {
        xpGanho
      });
    } catch (err) {
      console.error('Erro ao atualizar XP no user-service:', err.message);
    }

    res.status(201).json({
      message: 'Resposta registrada e avaliada com sucesso!',
      xpGanho,
      quantidadeAcertos: respostasCorrigidas.filter(r => r.correta).length
    });

  } catch (error) {
    console.error('Erro ao responder o quiz:', error);
    res.status(500).json({ error: 'Erro ao responder o quiz' });
  }
};


// GET /:quizId/resumo/:alunoId — funcionalidade 4
exports.resumoResposta = async (req, res) => {
  const { quizId, alunoId } = req.params;

  try {
    const resposta = await QuizResposta.findOne({ quizId, alunoId });
    if (!resposta) return res.status(404).json({ error: 'Resposta não encontrada' });

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado' });

    res.json({
      quizId,
      alunoId,
      nome: quiz.nome,
      materia: quiz.materia,
      anoLetivo: quiz.anoLetivo,
      respondidoEm: resposta.respondidoEm,
      quantidadeTotal: resposta.respostas.length,
      quantidadeCorretas: resposta.respostas.filter(r => r.correta).length,
      xpGanho: resposta.xpGanho
    });

  } catch (error) {
    console.error('Erro ao buscar resumo do quiz:', error);
    res.status(500).json({ error: 'Erro ao buscar resumo da resposta' });
  }
};

exports.quizzesRespondidosPorAluno = async (req, res) => {
  const { alunoId } = req.params;

  try {
    const respostas = await QuizResposta.find({ alunoId }).populate('quizId');

    const quizzesRespondidos = respostas.map((resposta) => ({
      quizId: resposta.quizId._id,
      nome: resposta.quizId.nome,
      materia: resposta.quizId.materia,
      anoLetivo: resposta.quizId.anoLetivo,
      dataFinal: resposta.quizId.dataFinal,
      respondidoEm: resposta.respondidoEm,
      xpGanho: resposta.xpGanho
    }));

    res.json(quizzesRespondidos);
  } catch (error) {
    console.error('Erro ao listar quizzes respondidos:', error);
    res.status(500).json({ error: 'Erro ao listar quizzes respondidos' });
  }
};

exports.estatisticaUltimoQuiz = async (req, res) => {
  const { professorId } = req.params;

  try {
    // Encontra o último quiz criado pelo professor
    const ultimoQuiz = await Quiz.findOne({ professorId }).sort({ criadoEm: -1 });

    if (!ultimoQuiz) {
      return res.status(404).json({ message: "Nenhum quiz encontrado para este professor" });
    }

    // Conta quantos alunos responderam esse quiz
    const quantidadeAlunosResponderam = await QuizResposta.countDocuments({
      quizId: ultimoQuiz._id
    });

    res.json({
      quizId: ultimoQuiz._id,
      nome: ultimoQuiz.nome,
      dataFinal: ultimoQuiz.dataFinal,
      quantidadeAlunosResponderam
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas do último quiz:", error);
    res.status(500).json({ error: "Erro ao buscar estatísticas do último quiz" });
  }
};






