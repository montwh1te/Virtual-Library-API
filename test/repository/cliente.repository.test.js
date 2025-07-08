import * as clienteRepository from '../../repositories/cliente.repository.js';

describe('Cliente Repository', () => {
  const matricula = '20239999';
  const mockCliente = {
    matricula,
    nome: 'Cliente Repo',
    telefone: '11988887777'
  };

  it('getAll deve retornar um array', async () => {
    const clientes = await clienteRepository.getAll();
    expect(Array.isArray(clientes)).toBe(true);
  });

  it('create deve adicionar um novo cliente', async () => {
    const criado = await clienteRepository.create(mockCliente);
    expect(criado).toMatchObject(mockCliente);
  });

  it('getByMatricula deve retornar o cliente criado', async () => {
    const cliente = await clienteRepository.getByMatricula(matricula);
    expect(cliente).toBeDefined();
    expect(cliente.nome).toBe('Cliente Repo');
  });

  it('update deve atualizar um cliente existente', async () => {
    const atualizado = await clienteRepository.update(matricula, {
      nome: 'Cliente Atualizado',
      telefone: '11999999999'
    });
    expect(atualizado.nome).toBe('Cliente Atualizado');
  });

  it('remove deve excluir o cliente', async () => {
    await clienteRepository.remove(matricula);
    const cliente = await clienteRepository.getByMatricula(matricula);
    expect(cliente).toBeUndefined();
  });
});
