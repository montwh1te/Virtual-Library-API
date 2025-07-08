import { db } from '../db.js'

const cleanDb = async () => {
    // Limpar dados relacionados para evitar duplicidade
    await db.query('DELETE FROM emprestimos');
    await db.query('DELETE FROM livros');
    await db.query('DELETE FROM clientes');
    await db.query('DELETE FROM autores');

    console.log('✅ Migrations executadas com sucesso!');
    process.exit();
}

await cleanDb().catch((err) => {
  console.error('❌ Erro ao limpar o banco:', err);
  process.exit(1);
});