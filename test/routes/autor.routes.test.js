import request from 'supertest';
import express from 'express';
import autorRoutes from '../../routes/autor.routes.js';
import { db } from '../../db.js';

const app = express();
app.use(express.json());
app.use('/autores', autorRoutes);

describe('Autor Routes (Integração)', () => {
  let autorId;

  it('GET /autores deve retornar array', async () => {
    const res = await request(app).get('/autores');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /autores deve criar novo autor', async () => {
    const res = await request(app)
      .post('/autores')
      .send({ nome: 'Autor API', pais: 'Portugal' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('Autor API');
    autorId = res.body.id;
  });

  it('GET /autores/:id deve retornar o autor criado', async () => {
    const res = await request(app).get(`/autores/${autorId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(autorId);
  });

  it('PUT /autores/:id deve atualizar o autor', async () => {
    const res = await request(app)
      .put(`/autores/${autorId}`)
      .send({ nome: 'Autor Editado', pais: 'Brasil' });

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Autor Editado');
  });

  it('DELETE /autores/:id deve remover o autor', async () => {
    const res = await request(app).delete(`/autores/${autorId}`);
    expect(res.statusCode).toBe(204);

    const busca = await request(app).get(`/autores/${autorId}`);
    expect(busca.statusCode).toBe(404);
  });
});
