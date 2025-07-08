import request from 'supertest';
import express from 'express';
import livroRoutes from '../../routes/livro.routes.js';
import * as autorRepository from '../../repositories/autor.repository.js';
import { db } from '../../db.js';

const app = express();
app.use(express.json());
app.use('/livros', livroRoutes);

describe('Livro Routes (Integração)', () => {
  const isbn = '1234567890123';
  let autorId;

  beforeAll(async () => {
    const autor = await autorRepository.create({ nome: 'Autor Teste Livro', pais: 'Portugal' });
    autorId = autor.id;
  });

  it('GET /livros deve retornar array', async () => {
    const res = await request(app).get('/livros');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /livros deve criar novo livro', async () => {
    const res = await request(app).post('/livros').send({
      isbn,
      titulo: 'Livro API',
      autorId,
      disponivel: true
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.isbn).toBe(isbn);
  });

  it('GET /livros/:isbn deve retornar o livro criado', async () => {
    const res = await request(app).get(`/livros/${isbn}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.isbn).toBe(isbn);
  });

  it('PUT /livros/:isbn deve atualizar o livro', async () => {
    const res = await request(app).put(`/livros/${isbn}`).send({
      titulo: 'Livro Editado',
      autorId,
      disponivel: false
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.titulo).toBe('Livro Editado');
  });

  it('DELETE /livros/:isbn deve excluir o livro', async () => {
    const res = await request(app).delete(`/livros/${isbn}`);
    expect(res.statusCode).toBe(204);

    const check = await request(app).get(`/livros/${isbn}`);
    expect(check.statusCode).toBe(404);
  });
});
