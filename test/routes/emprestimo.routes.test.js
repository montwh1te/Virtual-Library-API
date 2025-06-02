import request from 'supertest';
import app from '../../app.js';

describe('Rotas de Emprestimo', () => {
  let token;
  let idEmprestimoCriado;

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: process.env.USER, password: process.env.PASSWORD });
    token = res.body.token;
  });

  it('GET /emprestimos deve retornar lista de emprestimos', async () => {
    const res = await request(app)
      .get('/emprestimos')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /emprestimos deve criar um novo emprestimo', async () => {
    const novoEmprestimo = {
      matriculaCliente: '20230002',
      isbnLivro: '9780439139601'
    };
    const res = await request(app)
      .post('/emprestimos')
      .set('Authorization', `Bearer ${token}`)
      .send(novoEmprestimo);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.matriculaCliente).toBe(novoEmprestimo.matriculaCliente);
    expect(res.body.isbnLivro).toBe(novoEmprestimo.isbnLivro);
    idEmprestimoCriado = res.body.id;
  });

  it('GET /emprestimos/:id deve retornar o emprestimo criado', async () => {
    const res = await request(app)
      .get(`/emprestimos/${idEmprestimoCriado}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(idEmprestimoCriado);
  });

  // Adapte este teste se você tiver rota de devolução implementada
  // it('POST /emprestimos/devolucao/:id deve devolver o livro', async () => {
  //   const res = await request(app)
  //     .post(`/emprestimos/devolucao/${idEmprestimoCriado}`)
  //     .set('Authorization', `Bearer ${token}`);
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.dataDevolucao).not.toBeNull();
  // });
});