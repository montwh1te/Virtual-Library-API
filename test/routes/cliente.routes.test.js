import request from 'supertest';
import express from 'express';
import clienteRoutes from '../../routes/cliente.routes.js';
import { db } from '../../db.js';

const app = express();
app.use(express.json());
app.use('/clientes', clienteRoutes);

describe('Cliente Routes (Integração)', () => {
  const matricula = '20238888';

  it('POST /clientes deve criar novo cliente', async () => {
    const res = await request(app).post('/clientes').send({
      matricula,
      nome: 'Cliente API',
      telefone: '21988888888'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ matricula });
  });

  it('GET /clientes/:matricula deve retornar o cliente', async () => {
    const res = await request(app).get(`/clientes/${matricula}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.matricula).toBe(matricula);
  });

  it('DELETE /clientes/:matricula deve excluir o cliente', async () => {
    const res = await request(app).delete(`/clientes/${matricula}`);
    expect(res.statusCode).toBe(204);

    const check = await request(app).get(`/clientes/${matricula}`);
    expect(check.statusCode).toBe(404);
  });
});
