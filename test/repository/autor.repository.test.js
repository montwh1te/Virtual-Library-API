import * as autorRepository from '../../repositories/autor.repository.js';

describe('Autor Repository', () => {
  let autorCriado;

  it('getAll deve retornar um array', () => {
    const autores = autorRepository.getAll();
    expect(Array.isArray(autores)).toBe(true);
  });

  it('create deve adicionar um novo autor', () => {
    const autor = {
      nome: 'Autor Repo Teste',
      pais: 'Brasil'
    };
    autorCriado = autorRepository.create(autor);
    expect(autorCriado).toMatchObject(autor);
    expect(autorCriado).toHaveProperty('id');
  });

  it('getById deve retornar o autor criado', () => {
    const autor = autorRepository.getById(autorCriado.id);
    expect(autor).toBeDefined();
    expect(autor.id).toBe(autorCriado.id);
  });

  it('update deve atualizar um autor existente', () => {
    const atualizado = autorRepository.update(autorCriado.id, { nome: 'Autor Atualizado' });
    expect(atualizado.nome).toBe('Autor Atualizado');
  });

  it('remove deve excluir o autor', () => {
    autorRepository.remove(autorCriado.id);
    const autor = autorRepository.getById(autorCriado.id);
    expect(autor).toBeUndefined();
  });
});