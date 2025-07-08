import { db } from '../db.js';

async function migrate() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS autores (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      pais VARCHAR(100) NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS clientes (
      matricula VARCHAR(20) PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      telefone VARCHAR(20) NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS livros (
      isbn VARCHAR(20) PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      autorId INT NOT NULL,
      disponivel BOOLEAN DEFAULT TRUE,
      FOREIGN KEY (autorId) REFERENCES autores(id)
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS emprestimos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      matriculaCliente VARCHAR(20),
      isbnLivro VARCHAR(20),
      dataRetirada DATE,
      dataPrevistaDevolucao DATE,
      dataDevolucao DATE,
      diasAtraso INT,
      FOREIGN KEY (matriculaCliente) REFERENCES clientes(matricula),
      FOREIGN KEY (isbnLivro) REFERENCES livros(isbn)
    );
  `);

  console.log('✅ Migrations executadas com sucesso!');
  process.exit();
}

migrate().catch((err) => {
  console.error('❌ Erro nas migrations:', err);
  process.exit(1);
});
