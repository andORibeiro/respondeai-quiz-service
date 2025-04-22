const Quiz = require('../models/Quiz');
const QuizDraft = require("../models/QuizDraft");
const { generateQuestions } = require("../services/geminiService.js");

// Utilitário para gerar um ID único simples para cada pergunta
const gerarIdUnico = () => 'ex' + Math.random().toString(36).substr(2, 9);

exports.criarRascunho = async (req, res) => {
  try {
    const { professorId, turma, materia, tema, quantidade } = req.body;

    if (!tema || !professorId || !turma || !materia || !quantidade) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }

    const questoesGeradas = await generateQuestions(tema, materia, turma, quantidade);

    const draft = new QuizDraft({
      professorId,
      turma,
      materia,
      tema,
      quantidade,
      questoes: questoesGeradas.map((q) => ({
        perguntaId: gerarIdUnico(),
        enunciado: q.enunciado,
        opcoes: q.opcoes,
        respostaCorreta: q.respostaCorreta,
        aprovada: null
      }))
    });

    await draft.save();

    res.status(201).json({
      message: "Rascunho de quiz criado com sucesso.",
      draftId: draft._id,
      questoes: draft.questoes
    });
  } catch (error) {
    console.error("Erro ao criar rascunho de quiz:", error);
    res.status(500).json({ error: "Erro ao criar rascunho de quiz." });
  }
};

exports.finalizarRascunho = async (req, res) => {
  const { draftId } = req.params;

  try {
    const draft = await QuizDraft.findById(draftId);
    if (!draft) return res.status(404).json({ error: 'Rascunho não encontrado' });

    const aprovadas = draft.questoes.filter(q => q.aprovada === true);

    if (aprovadas.length < draft.quantidade) {
      return res.status(400).json({
        error: `Faltam ${draft.quantidade - aprovadas.length} questões para completar o quiz`
      });
    }

    const perguntasFormatadas = aprovadas.map((q, index) => ({
      perguntaId: `ex${index + 1}`,
      enunciado: q.enunciado,
      opcoes: q.opcoes,
      respostaCorreta: q.respostaCorreta,
      status: 'aprovada'
    }));

    const novoQuiz = new Quiz({
      nome: `Quiz de ${draft.materia} - ${draft.turma}`,
      materia: draft.materia,
      tema: draft.tema,
      turma: draft.turma,
      professorId: draft.professorId,
      anoLetivo: draft.anoLetivo,
      perguntas: perguntasFormatadas,
      dataFinal: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    await novoQuiz.save();
    await draft.deleteOne();

    res.status(201).json({
      message: 'Quiz final criado com sucesso',
      quizId: novoQuiz._id
    });
  } catch (error) {
    console.error("Erro ao finalizar rascunho:", error);
    res.status(500).json({ error: 'Erro ao finalizar rascunho do quiz' });
  }
};

exports.listarPerguntasPendentes = async (req, res) => {
  const { draftId } = req.params;

  try {
    const draft = await QuizDraft.findById(draftId);
    if (!draft) {
      return res.status(404).json({ error: 'Rascunho não encontrado' });
    }

    const pendentes = draft.questoes.filter(p => p.aprovada === null);

    res.json({
      draftId: draft._id,
      pendentes: pendentes.map(p => ({
        perguntaId: p.perguntaId,
        enunciado: p.enunciado,
        opcoes: p.opcoes
      }))
    });
  } catch (error) {
    console.error("Erro ao listar perguntas pendentes:", error);
    res.status(500).json({ error: 'Erro ao buscar perguntas pendentes' });
  }
};

exports.avaliarPergunta = async (req, res) => {
  const { draftId } = req.params;
  const { perguntaId, aprovada } = req.body;

  if (typeof aprovada !== 'boolean') {
    return res.status(400).json({ error: 'Campo "aprovada" deve ser booleano' });
  }

  try {
    const draft = await QuizDraft.findById(draftId);
    if (!draft) {
      return res.status(404).json({ error: 'Rascunho não encontrado' });
    }

    const pergunta = draft.questoes.find(q => q.perguntaId === perguntaId);
    if (!pergunta) {
      return res.status(404).json({ error: 'Pergunta não encontrada' });
    }

    if (pergunta.aprovada !== null) {
      return res.status(400).json({ error: 'Pergunta já foi avaliada' });
    }

    pergunta.aprovada = aprovada;
    await draft.save();

    res.json({ message: `Pergunta ${aprovada ? 'aprovada' : 'rejeitada'} com sucesso.` });
  } catch (error) {
    console.error("Erro ao avaliar pergunta:", error);
    res.status(500).json({ error: 'Erro ao avaliar pergunta' });
  }
};

exports.regerarPerguntasRejeitadas = async (req, res) => {
  const { draftId } = req.params;

  try {
    const draft = await QuizDraft.findById(draftId);
    if (!draft) return res.status(404).json({ error: 'Rascunho não encontrado' });

    const rejeitadas = draft.questoes
      .map((q, index) => ({ ...q.toObject(), index }))
      .filter(q => q.aprovada === false);

    if (rejeitadas.length === 0) {
      return res.status(400).json({ message: 'Não há perguntas rejeitadas para substituir.' });
    }

    const novasQuestoes = await generateQuestions(draft.tema, draft.materia, draft.turma, rejeitadas.length);

    rejeitadas.forEach((rejeitada, i) => {
      draft.questoes[rejeitada.index] = {
        perguntaId: gerarIdUnico(),
        enunciado: novasQuestoes[i].enunciado,
        opcoes: novasQuestoes[i].opcoes,
        respostaCorreta: novasQuestoes[i].respostaCorreta,
        aprovada: null
      };
    });

    await draft.save();

    res.status(201).json({
      message: `${novasQuestoes.length} pergunta(s) regenerada(s) com sucesso.`,
      novasPerguntas: novasQuestoes
    });
  } catch (error) {
    console.error("Erro ao regerar perguntas:", error);
    res.status(500).json({ error: 'Erro ao regerar perguntas' });
  }
};
