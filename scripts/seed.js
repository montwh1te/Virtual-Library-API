import { db } from '../db.js';

async function seed() {
  await db.query(`INSERT IGNORE INTO autores (id, nome, pais) VALUES
    (1, 'Machado de Assis', 'Brasil'),
    (2, 'J.K. Rowling', 'Reino Unido')
  `);

  await db.query(`INSERT IGNORE INTO clientes (matricula, nome, telefone) VALUES
    ('20230001', 'João Silva', '11999999999'),
    ('20230002', 'Maria Souza', '21988888888')
  `);

  await db.query(`INSERT IGNORE INTO livros (isbn, titulo, autorId, disponivel) VALUES
    ('9788535914849', 'Dom Casmurro', 1, FALSE),
    ('9780439139601', 'Harry Potter e o Prisioneiro de Azkaban', 2, TRUE)
  `);

  await db.query(`INSERT IGNORE INTO emprestimos (
    id, matriculaCliente, isbnLivro, dataRetirada, dataPrevistaDevolucao, dataDevolucao, diasAtraso
  ) VALUES (
    1, '20230001', '9788535914849', '2024-06-01', '2024-06-08', NULL, NULL
  )`);

  console.log('✅ Seed aplicado com sucesso!');
  process.exit();
}

seed().catch((err) => {
  console.error('❌ Erro no seed:', err);
  process.exit(1);
});
