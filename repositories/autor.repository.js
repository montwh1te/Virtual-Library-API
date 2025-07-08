import { db } from '../db.js';

export async function getAll() {
  const [rows] = await db.query('SELECT * FROM autores');
  return rows;
}

export async function getById(id) {
  const [rows] = await db.query('SELECT * FROM autores WHERE id = ?', [id]);
  return rows[0];
}

export async function create(data) {
  if (!data.nome || !data.pais) throw new Error('Nome e país são obrigatórios');
  const [result] = await db.query(
    'INSERT INTO autores (nome, pais) VALUES (?, ?)',
    [data.nome, data.pais]
  );
  return { id: result.insertId, ...data };
}

export async function update(id, data) {
  const [result] = await db.query(
    'UPDATE autores SET nome = ?, pais = ? WHERE id = ?',
    [data.nome, data.pais, id]
  );
  if (result.affectedRows === 0) throw new Error('Autor não encontrado');
  return { id, ...data };
}

export async function remove(id) {
  const [result] = await db.query('DELETE FROM autores WHERE id = ?', [id]);
  if (result.affectedRows === 0) throw new Error('Autor não encontrado');
}
