const mongoose = require("mongoose");

const quizDraftSchema = new mongoose.Schema({
  professorId: { type: String, required: true },
  turma: { type: String, required: true },
  materia: { type: String, required: true },
  quantidade: { type: Number, required: true },
  status: {
    type: String,
    enum: ["em_preparacao", "completo"],
    default: "em_preparacao"
  },
  questoes: [
    {
      enunciado: String,
      opcoes: [String],
      respostaCorreta: String,
      aprovada: { type: Boolean, default: null } // null = não avaliada
    }
  ],
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QuizDraft", quizDraftSchema);
