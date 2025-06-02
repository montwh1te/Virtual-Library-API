import * as emprestimoRepository from '../../repositories/emprestimo.repository.js';

describe('Emprestimo Repository', () => {
  let emprestimoCriado;

  it('getAll deve retornar um array', () => {
    const emprestimos = emprestimoRepository.getAll();
    expect(Array.isArray(emprestimos)).toBe(true);
  });

  it('create deve adicionar um novo emprestimo', () => {
    const emprestimo = {
      matriculaCliente: '20239999',
      isbnLivro: '9788535914849',
      dataRetirada: '2024-06-01',
      dataPrevistaDevolucao: '2024-06-08',
      dataDevolucao: null,
      diasAtraso: null
    };
    emprestimoCriado = emprestimoRepository.create(emprestimo);
    expect(emprestimoCriado).toMatchObject(emprestimo);
    expect(emprestimoCriado).toHaveProperty('id');
  });

  it('getById deve retornar o emprestimo criado', () => {
    const emprestimo = emprestimoRepository.getById(emprestimoCriado.id);
    expect(emprestimo).toBeDefined();
    expect(emprestimo.id).toBe(emprestimoCriado.id);
  });

  it('getByCliente deve retornar emprestimos do cliente', () => {
    const emprestimos = emprestimoRepository.getByCliente('20239999');
    expect(Array.isArray(emprestimos)).toBe(true);
    expect(emprestimos.some(e => e.id === emprestimoCriado.id)).toBe(true);
  });

  it('update deve atualizar um emprestimo existente', () => {
    const atualizado = emprestimoRepository.update(emprestimoCriado.id, { diasAtraso: 2 });
    expect(atualizado.diasAtraso).toBe(2);
  });
});