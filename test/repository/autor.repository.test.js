import * as autorRepository from '../../repositories/autor.repository.js';

describe('Autor Repository', () => {
  let autorCriado;

  it('getAll deve retornar um array', async () => {
    const autores = await autorRepository.getAll();
    expect(Array.isArray(autores)).toBe(true);
  });

  it('create deve adicionar um novo autor', async () => {
    const autor = {
      nome: 'Autor Repo Teste',
      pais: 'Brasil'
    };
    autorCriado = await autorRepository.create(autor);
    expect(autorCriado).toMatchObject(autor);
    expect(autorCriado).toHaveProperty('id');
  });

  it('getById deve retornar o autor criado', async () => {
    const autor = await autorRepository.getById(autorCriado.id);
    expect(autor).toBeDefined();
    expect(autor.id).toBe(autorCriado.id);
  });

  it('update deve atualizar um autor existente', async () => {
    const atualizado = await autorRepository.update(autorCriado.id, { nome: 'Autor Atualizado' });
    expect(atualizado.nome).toBe('Autor Atualizado');
  });

  it('remove deve excluir o autor', async () => {
    await autorRepository.remove(autorCriado.id);
    const autor = await autorRepository.getById(autorCriado.id);
    expect(autor).toBeUndefined();
  });
});
