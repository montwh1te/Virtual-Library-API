import { db } from '../db.js';

export async function getAll() {
  const [rows] = await db.query('SELECT * FROM emprestimos');
  return rows;
}

export async function getById(id) {
  const [rows] = await db.query(`
    SELECT 
      e.id,
      e.dataRetirada,
      e.dataPrevistaDevolucao,
      e.dataDevolucao,
      e.diasAtraso,
      
      c.matricula AS clienteMatricula,
      c.nome AS clienteNome,
      c.telefone AS clienteTelefone,
      
      l.isbn AS livroIsbn,
      l.titulo AS livroTitulo,
      l.disponivel AS livroDisponivel,
      
      a.id AS autorId,
      a.nome AS autorNome,
      a.pais AS autorPais
      
    FROM emprestimos e
    JOIN clientes c ON e.matriculaCliente = c.matricula
    JOIN livros l ON e.isbnLivro = l.isbn
    JOIN autores a ON l.autorId = a.id
    WHERE e.id = ?
  `, [id]);

  return rows[0];
}

export async function getByCliente(matriculaCliente) {
  const [rows] = await db.query(
    'SELECT * FROM emprestimos WHERE matriculaCliente = ?',
    [matriculaCliente]
  );
  return rows;
}

export async function create(data) {
  const [result] = await db.query(
    `INSERT INTO emprestimos 
     (matriculaCliente, isbnLivro, dataRetirada, dataPrevistaDevolucao, dataDevolucao, diasAtraso) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.matriculaCliente,
      data.isbnLivro,
      data.dataRetirada,
      data.dataPrevistaDevolucao,
      data.dataDevolucao ?? null,
      data.diasAtraso ?? null,
    ]
  );

  return { id: result.insertId, ...data };
}

export async function update(id, data) {
  const [result] = await db.query(
    `UPDATE emprestimos SET 
      matriculaCliente = ?, 
      isbnLivro = ?, 
      dataRetirada = ?, 
      dataPrevistaDevolucao = ?, 
      dataDevolucao = ?, 
      diasAtraso = ? 
     WHERE id = ?`,
    [
      data.matriculaCliente,
      data.isbnLivro,
      data.dataRetirada,
      data.dataPrevistaDevolucao,
      data.dataDevolucao,
      data.diasAtraso,
      id
    ]
  );

  if (result.affectedRows === 0) throw new Error('Empréstimo não encontrado');
  return { id, ...data };
}
