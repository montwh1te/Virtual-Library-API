import * as livroRepository from '../../repositories/livro.repository.js';

describe('Livro Repository', () => {
  let livroCriado;

  it('getAll deve retornar um array', () => {
    const livros = livroRepository.getAll();
    expect(Array.isArray(livros)).toBe(true);
  });

  it('create deve adicionar um novo livro', () => {
    const livro = {
      isbn: '1111111111111',
      titulo: 'Repo Teste',
      autorId: 1,
      disponivel: true
    };
    livroCriado = livroRepository.create(livro);
    expect(livroCriado).toMatchObject(livro);
  });

  it('getByISBN deve retornar o livro criado', () => {
    const livro = livroRepository.getByISBN('1111111111111');
    expect(livro).toBeDefined();
    expect(livro.isbn).toBe('1111111111111');
  });

  it('update deve atualizar um livro existente', () => {
    const atualizado = livroRepository.update('1111111111111', { titulo: 'Atualizado Repo' });
    expect(atualizado.titulo).toBe('Atualizado Repo');
  });

  it('remove deve excluir o livro', () => {
    livroRepository.remove('1111111111111');
    const livro = livroRepository.getByISBN('1111111111111');
    expect(livro).toBeUndefined();
  });
});