import * as autorRepository from '../../repositories/autor.repository.js';

describe('Autor Repository', () => {
  let autorCriado;

  it('deve listar todos os autores', async () => {
    const autores = await autorRepository.getAll();
    expect(Array.isArray(autores)).toBe(true);
  });

  it('deve criar um novo autor', async () => {
    const novoAutor = { nome: 'Repo Teste', pais: 'Brasil' };
    autorCriado = await autorRepository.create(novoAutor);

    expect(autorCriado).toHaveProperty('id');
    expect(autorCriado.nome).toBe(novoAutor.nome);
    expect(autorCriado.pais).toBe(novoAutor.pais);
  });

  it('deve buscar um autor por ID', async () => {
    const autor = await autorRepository.getById(autorCriado.id);
    expect(autor).toBeDefined();
    expect(autor.id).toBe(autorCriado.id);
  });

  it('deve atualizar um autor existente', async () => {
    const atualizacao = { nome: 'Nome Atualizado', pais: 'Brasil' };
    const atualizado = await autorRepository.update(autorCriado.id, atualizacao);
    expect(atualizado.nome).toBe('Nome Atualizado');
  });

  it('deve remover o autor', async () => {
    await autorRepository.remove(autorCriado.id);
    const autor = await autorRepository.getById(autorCriado.id);
    expect(autor).toBeUndefined();
  });
});
