import * as emprestimoRepository from '../../repositories/emprestimo.repository.js';

describe('Emprestimo Repository', () => {
  let emprestimoCriado;
  const matriculaCliente = '20239999';

  it('getAll deve retornar um array', async () => {
    const emprestimos = await emprestimoRepository.getAll();
    expect(Array.isArray(emprestimos)).toBe(true);
  });

  it('create deve adicionar um novo emprestimo', async () => {
    const emprestimo = {
      matriculaCliente,
      isbnLivro: '9788535914849',
      dataRetirada: '2024-06-01',
      dataPrevistaDevolucao: '2024-06-08',
      dataDevolucao: null,
      diasAtraso: null
    };
    emprestimoCriado = await emprestimoRepository.create(emprestimo);
    expect(emprestimoCriado).toMatchObject(emprestimo);
    expect(emprestimoCriado).toHaveProperty('id');
  });

  it('getById deve retornar o emprestimo criado', async () => {
    const emprestimo = await emprestimoRepository.getById(emprestimoCriado.id);
    expect(emprestimo).toBeDefined();
    expect(emprestimo.id).toBe(emprestimoCriado.id);
  });

  it('getByCliente deve retornar emprestimos do cliente', async () => {
    const emprestimos = await emprestimoRepository.getByCliente(matriculaCliente);
    expect(Array.isArray(emprestimos)).toBe(true);
    expect(emprestimos.some(e => e.id === emprestimoCriado.id)).toBe(true);
  });

  it('update deve atualizar um emprestimo existente', async () => {
    const atualizado = await emprestimoRepository.update(emprestimoCriado.id, { diasAtraso: 2 });
    expect(atualizado.diasAtraso).toBe(2);
  });
});
