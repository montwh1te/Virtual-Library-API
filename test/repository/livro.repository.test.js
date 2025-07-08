import * as livroRepository from '../../repositories/livro.repository.js';

describe('Livro Repository', () => {
  const isbn = '1111111111111';

  it('getAll deve retornar um array', async () => {
    const livros = await livroRepository.getAll();
    expect(Array.isArray(livros)).toBe(true);
  });

  it('create deve adicionar um novo livro', async () => {
    const livro = {
      isbn,
      titulo: 'Repo Teste',
      autorId: 1,
      disponivel: true
    };
    const criado = await livroRepository.create(livro);
    expect(criado).toMatchObject(livro);
  });

  it('getByISBN deve retornar o livro criado', async () => {
    const livro = await livroRepository.getByISBN(isbn);
    expect(livro).toBeDefined();
    expect(livro.isbn).toBe(isbn);
  });

  it('update deve atualizar um livro existente', async () => {
    const atualizado = await livroRepository.update(isbn, { titulo: 'Atualizado Repo' });
    expect(atualizado.titulo).toBe('Atualizado Repo');
  });

  it('remove deve excluir o livro', async () => {
    await livroRepository.remove(isbn);
    const livro = await livroRepository.getByISBN(isbn);
    expect(livro).toBeUndefined();
  });
});
