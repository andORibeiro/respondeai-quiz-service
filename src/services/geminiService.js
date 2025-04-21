const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateQuestions = async (assunto, anoLetivo, quantidade) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Gere ${quantidade} questões de múltipla escolha sobre o assunto "${assunto}" para o ano letivo "${anoLetivo}". 
Cada questão deve incluir 4 opções e a resposta correta. Retorne o resultado no seguinte formato JSON puro (sem comentários ou texto adicional):

[
  {
    "questao": "Texto da questão",
    "opcoes": ["Opção A", "Opção B", "Opção C", "Opção D"],
    "respostaCorreta": "Opção A"
  }
]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let questionsText = response.text();

    // Limpa formatação
    questionsText = questionsText.replace(/```json/g, "").replace(/```/g, "").trim();

    let questions;
    try {
      questions = JSON.parse(questionsText);
    } catch (parseErr) {
      console.error("❌ Erro ao fazer parse do JSON retornado:");
      throw new Error("A IA retornou um JSON malformado. Tente reduzir a quantidade de questões ou revisar o prompt.");
    }

    return questions.map((q) => ({
      enunciado: q.questao,
      opcoes: q.opcoes,
      respostaCorreta: q.respostaCorreta
    }));
  } catch (error) {
    console.error("Erro ao gerar questões com Gemini:", error.message || error);
    throw new Error("Erro ao gerar questões");
  }
};
