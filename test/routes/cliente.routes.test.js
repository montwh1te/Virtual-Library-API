import request from 'supertest';
import app from '../../app.js';

describe('Rotas de Cliente', () => {
  let token;
  let matriculaCliente = '20239999';

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: process.env.USER, password: process.env.PASSWORD });
    token = res.body.token;
  });

  it('GET /clientes deve retornar lista de clientes', async () => {
    const res = await request(app)
      .get('/clientes')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /clientes deve criar um novo cliente', async () => {
    const novoCliente = {
      matricula: matriculaCliente,
      nome: 'Cliente Teste',
      telefone: '11988887777'
    };
    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send(novoCliente);
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(novoCliente);
  });

  it('GET /clientes/:matricula deve retornar o cliente criado', async () => {
    const res = await request(app)
      .get(`/clientes/${matriculaCliente}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.matricula).toBe(matriculaCliente);
  });

  it('PUT /clientes/:matricula deve atualizar o cliente', async () => {
    const res = await request(app)
      .put(`/clientes/${matriculaCliente}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Cliente Atualizado' });
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Cliente Atualizado');
  });

  it('DELETE /clientes/:matricula deve remover o cliente', async () => {
    const res = await request(app)
      .delete(`/clientes/${matriculaCliente}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });

  it('GET /clientes/:matricula deve retornar 404 após remoção', async () => {
    const res = await request(app)
      .get(`/clientes/${matriculaCliente}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
});