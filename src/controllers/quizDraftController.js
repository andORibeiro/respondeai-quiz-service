const QuizDraft = require("../models/QuizDraft");
const { generateQuestions } = require("../services/geminiService");

exports.criarRascunho = async (req, res) => {
  try {
    const { professorId, turma, materia, quantidade } = req.body;

    if (!professorId || !turma || !materia || !quantidade) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }

    const questoesGeradas = await generateQuestions(materia, turma, quantidade);

    const draft = new QuizDraft({
      professorId,
      turma,
      materia,
      quantidade,
      questoes: questoesGeradas.map((q) => ({
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

