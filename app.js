import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import autorRoutes from './routes/autor.routes.js';
import clienteRoutes from './routes/cliente.routes.js';
import livroRoutes from './routes/livro.routes.js';
import emprestimoRoutes from './routes/emprestimo.routes.js';
import { realizaLog } from './middleware/logger_middleware.js'
import { autenticar } from './middleware/auth.middleware.js'

const app = express()
const port = 3000

// Config da API
app.use(express.json())
app.use(cors());

// Importando Middleware de Log
app.use(realizaLog);

// Rotas
app.use('/auth', authRoutes);
app.use('/autores', autenticar,  autorRoutes);
app.use('/clientes', autenticar, clienteRoutes);
app.use('/livros', autenticar, livroRoutes);
app.use('/emprestimos', autenticar, emprestimoRoutes);

// Rota de resposta rápida.
app.get('/', (req, res) => res.send('API Biblioteca rodando!'));

export default app;

const PORT = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API running on port ${port}`)
})