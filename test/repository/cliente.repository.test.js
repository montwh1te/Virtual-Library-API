import * as clienteRepository from '../../repositories/cliente.repository.js';

describe('Cliente Repository', () => {
  const matricula = '20238888';

  it('getAll deve retornar um array', async () => {
    const clientes = await clienteRepository.getAll();
    expect(Array.isArray(clientes)).toBe(true);
  });

  it('create deve adicionar um novo cliente', async () => {
    const cliente = {
      matricula,
      nome: 'Cliente Repo',
      telefone: '11999998888'
    };
    const criado = await clienteRepository.create(cliente);
    expect(criado).toMatchObject(cliente);
    const buscado = await clienteRepository.getByMatricula(matricula);
    expect(buscado).toBeDefined();
  });

  it('update deve atualizar um cliente', async () => {
    const atualizado = await clienteRepository.update(matricula, { nome: 'Atualizado Repo' });
    expect(atualizado.nome).toBe('Atualizado Repo');
  });

  it('remove deve excluir um cliente', async () => {
    await clienteRepository.remove(matricula);
    const cliente = await clienteRepository.getByMatricula(matricula);
    expect(cliente).toBeUndefined();
  });
});
