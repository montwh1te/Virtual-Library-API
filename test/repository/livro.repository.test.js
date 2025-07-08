import * as livroRepository from '../../repositories/livro.repository.js';
import * as autorRepository from '../../repositories/autor.repository.js';

describe('Livro Repository', () => {
  const isbn = '9999999999999';
  let autorId;

  beforeAll(async () => {
    // Cria um autor para associar ao livro
    const autor = await autorRepository.create({ nome: 'Autor do Livro', pais: 'Brasil' });
    autorId = autor.id;
  });

  it('getAll deve retornar um array', async () => {
    const livros = await livroRepository.getAll();
    expect(Array.isArray(livros)).toBe(true);
  });

  it('create deve adicionar um novo livro', async () => {
    const livro = {
      isbn,
      titulo: 'Livro Repo',
      autorId,
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
    const atualizado = await livroRepository.update(isbn, {
      titulo: 'Livro Atualizado',
      autorId,
      disponivel: false
    });
    expect(atualizado.titulo).toBe('Livro Atualizado');
    expect(atualizado.disponivel).toBe(false);
  });

  it('remove deve excluir o livro', async () => {
    await livroRepository.remove(isbn);
    const livro = await livroRepository.getByISBN(isbn);
    expect(livro).toBeUndefined();
  });
});
