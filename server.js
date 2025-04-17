const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const quizRoutes = require('./src/routes/quizRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/quizzes', quizRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor de quizzes rodando na porta ${PORT}`);
});
