import request from 'supertest';
import express from 'express';
import emprestimoRoutes from '../../routes/emprestimo.routes.js';
import * as clienteRepository from '../../repositories/cliente.repository.js';
import * as autorRepository from '../../repositories/autor.repository.js';
import * as livroRepository from '../../repositories/livro.repository.js';
import { db } from '../../db.js';

const app = express();
app.use(express.json());
app.use('/emprestimos', emprestimoRoutes);

describe('Emprestimo Routes (Integração)', () => {
  let idEmprestimo;
  const matricula = '20232222';
  const isbn = '9998887776661';
  let autorId;

  beforeAll(async () => {
    await clienteRepository.create({ matricula, nome: 'Cliente API', telefone: '21999998888' });
    const autor = await autorRepository.create({ nome: 'Autor API', pais: 'Portugal' });
    autorId = autor.id;

    await livroRepository.create({ isbn, titulo: 'Livro API', autorId, disponivel: true });
  });

  it('GET /emprestimos deve retornar array', async () => {
    const res = await request(app).get('/emprestimos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /emprestimos deve registrar novo empréstimo', async () => {
    const res = await request(app).post('/emprestimos').send({
      matriculaCliente: matricula,
      isbnLivro: isbn
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    idEmprestimo = res.body.id;
  });

  it('GET /emprestimos/:id deve retornar o empréstimo criado', async () => {
    const res = await request(app).get(`/emprestimos/${idEmprestimo}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(idEmprestimo);
  });

  it('POST /emprestimos/devolucao/:id deve registrar devolução', async () => {
    const res = await request(app).post(`/emprestimos/devolucao/${idEmprestimo}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.dataDevolucao).toBeDefined();
  });
});
