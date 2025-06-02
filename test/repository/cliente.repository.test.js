import * as clienteRepository from '../../repositories/cliente.repository.js';

describe('Cliente Repository', () => {
  it('getAll deve retornar um array', () => {
    const clientes = clienteRepository.getAll();
    expect(Array.isArray(clientes)).toBe(true);
  });

  it('create deve adicionar um novo cliente', () => {
    const cliente = {
      matricula: '20238888',
      nome: 'Cliente Repo',
      telefone: '11999998888'
    };
    const criado = clienteRepository.create(cliente);
    expect(criado).toMatchObject(cliente);
    expect(clienteRepository.getByMatricula(cliente.matricula)).toBeDefined();
  });

  it('update deve atualizar um cliente', () => {
    const atualizado = clienteRepository.update('20238888', { nome: 'Atualizado Repo' });
    expect(atualizado.nome).toBe('Atualizado Repo');
  });

  it('remove deve excluir um cliente', () => {
    clienteRepository.remove('20238888');
    expect(clienteRepository.getByMatricula('20238888')).toBeUndefined();
  });
});