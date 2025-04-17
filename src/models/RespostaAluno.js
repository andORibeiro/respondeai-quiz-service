const mongoose = require('mongoose');

const respostaSchema = new mongoose.Schema({
  quizId: String,
  alunoId: String,
  respostas: [
    {
      perguntaId: String,
      respostaEscolhida: String,
      correta: Boolean
    }
  ],
  xpGanho: Number,
  respondidoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RespostaAluno', respostaSchema);
