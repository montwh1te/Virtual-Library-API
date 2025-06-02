import request from 'supertest';
import app from '../../app.js';

describe('Rotas de Autor', () => {
  let token;
  let idAutor;

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: process.env.USER, password: process.env.PASSWORD });
    token = res.body.token;
  });

  it('GET /autores deve retornar lista de autores', async () => {
    const res = await request(app)
      .get('/autores')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /autores deve criar um novo autor', async () => {
    const novoAutor = {
      nome: 'Autor Teste',
      pais: 'Brasil'
    };
    const res = await request(app)
      .post('/autores')
      .set('Authorization', `Bearer ${token}`)
      .send(novoAutor);
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(novoAutor);
    idAutor = res.body.id;
  });

  it('GET /autores/:id deve retornar o autor criado', async () => {
    const res = await request(app)
      .get(`/autores/${idAutor}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(idAutor);
  });

  it('PUT /autores/:id deve atualizar o autor', async () => {
    const res = await request(app)
      .put(`/autores/${idAutor}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Autor Atualizado' });
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Autor Atualizado');
  });

  it('DELETE /autores/:id deve remover o autor', async () => {
    const res = await request(app)
      .delete(`/autores/${idAutor}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });

  it('GET /autores/:id deve retornar 404 após remoção', async () => {
    const res = await request(app)
      .get(`/autores/${idAutor}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
});