import { db } from '../db.js';

export async function getAll() {
  const [rows] = await db.query('SELECT * FROM clientes');
  return rows;
}

export async function getByMatricula(matricula) {
  const [rows] = await db.query('SELECT * FROM clientes WHERE matricula = ?', [matricula]);
  return rows[0];
}

export async function create(data) {
  if (!data.matricula || !data.nome || !data.telefone) {
    throw new Error('Matrícula, nome e telefone são obrigatórios');
  }

  const existing = await getByMatricula(data.matricula);
  if (existing) throw new Error('Cliente já cadastrado');

  await db.query(
    'INSERT INTO clientes (matricula, nome, telefone) VALUES (?, ?, ?)',
    [data.matricula, data.nome, data.telefone]
  );

  return data;
}

export async function update(matricula, data) {
  const [result] = await db.query(
    'UPDATE clientes SET nome = ?, telefone = ? WHERE matricula = ?',
    [data.nome, data.telefone, matricula]
  );

  if (result.affectedRows === 0) throw new Error('Cliente não encontrado');
  return { matricula, ...data };
}

export async function remove(matricula) {
  const [result] = await db.query('DELETE FROM clientes WHERE matricula = ?', [matricula]);
  if (result.affectedRows === 0) throw new Error('Cliente não encontrado');
}
