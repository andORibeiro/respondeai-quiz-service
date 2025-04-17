const mongoose = require('mongoose');

const respostaSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  alunoId: { type: String, required: true },
  respostas: [
    {
      perguntaId: String,
      respostaEscolhida: String,
      correta: Boolean
    }
  ],
  xpGanho: { type: Number, default: 0 },
  respondidoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuizResposta', respostaSchema);
