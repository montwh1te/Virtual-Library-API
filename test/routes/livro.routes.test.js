import request from 'supertest';
import app from '../../app.js';

describe('Rotas de Livro', () => {
  let token;
  let isbnTest = '1234567890123';

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: process.env.USER, password: process.env.PASSWORD });
    token = res.body.token;
  });

  it('GET /livros deve retornar lista de livros', async () => {
    const res = await request(app)
      .get('/livros')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /livros deve criar um novo livro', async () => {
    const novoLivro = {
      isbn: isbnTest,
      titulo: 'Livro Teste',
      autorId: 1,
      disponivel: true
    };
    const res = await request(app)
      .post('/livros')
      .set('Authorization', `Bearer ${token}`)
      .send(novoLivro);
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(novoLivro);
  });

  it('GET /livros/:isbn deve retornar o livro criado', async () => {
    const res = await request(app)
      .get(`/livros/${isbnTest}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.isbn).toBe(isbnTest);
  });

  it('PUT /livros/:isbn deve atualizar o livro', async () => {
    const res = await request(app)
      .put(`/livros/${isbnTest}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ titulo: 'Livro Atualizado' });
    expect(res.statusCode).toBe(200);
    expect(res.body.titulo).toBe('Livro Atualizado');
  });

  it('DELETE /livros/:isbn deve remover o livro', async () => {
    const res = await request(app)
      .delete(`/livros/${isbnTest}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });

  it('GET /livros/:isbn deve retornar 404 após remoção', async () => {
    const res = await request(app)
      .get(`/livros/${isbnTest}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
});