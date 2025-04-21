const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  nome: String,
  materia: String,
  tema: String,
  anoLetivo: String,
  professorId: String,
  perguntas: [
    {
      perguntaId: String,
      enunciado: String,
      opcoes: [String],
      respostaCorreta: String
    }
  ],
  dataFinal: Date,
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', quizSchema);
