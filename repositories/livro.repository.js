import { db } from '../db.js';

export async function getAll() {
  const [rows] = await db.query('SELECT * FROM livros');
  return rows;
}

export async function getByISBN(isbn) {
  const [rows] = await db.query('SELECT * FROM livros WHERE isbn = ?', [isbn]);
  return rows[0];
}

export async function create(data) {
  const existing = await getByISBN(data.isbn);
  if (existing) throw new Error('Livro já cadastrado');

  await db.query(
    'INSERT INTO livros (isbn, titulo, autorId, disponivel) VALUES (?, ?, ?, ?)',
    [data.isbn, data.titulo, data.autorId, data.disponivel ?? true]
  );

  return data;
}

export async function update(isbn, data) {
  const [result] = await db.query(
    'UPDATE livros SET titulo = ?, autorId = ?, disponivel = ? WHERE isbn = ?',
    [data.titulo, data.autorId, data.disponivel, isbn]
  );

  if (result.affectedRows === 0) throw new Error('Livro não encontrado');
  return { isbn, ...data };
}

export async function remove(isbn) {
  const [result] = await db.query('DELETE FROM livros WHERE isbn = ?', [isbn]);
  if (result.affectedRows === 0) throw new Error('Livro não encontrado');
}
