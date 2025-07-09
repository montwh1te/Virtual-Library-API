import * as emprestimoRepository from '../../repositories/emprestimo.repository.js';
import * as clienteRepository from '../../repositories/cliente.repository.js';
import * as autorRepository from '../../repositories/autor.repository.js';
import * as livroRepository from '../../repositories/livro.repository.js';

describe('Emprestimo Repository', () => {
  let emprestimoCriado;
  let matricula = '20231111';
  let isbn = '9876543210001';
  let autorId;

  beforeAll(async () => {
    // Cria um cliente e um livro relacionados ao empréstimo
    await clienteRepository.create({
      matricula,
      nome: 'Cliente Emprestimo',
      telefone: '11999991111'
    });

    const autor = await autorRepository.create({ nome: 'Autor Teste Emprestimo', pais: 'Brasil' });
    autorId = autor.id;

    await livroRepository.create({
      isbn,
      titulo: 'Livro Emprestimo',
      autorId,
      disponivel: true
    });
  });

  it('create deve registrar novo empréstimo', async () => {
    const hoje = new Date();
    const dataPrevista = new Date();
    dataPrevista.setDate(hoje.getDate() + 7);

    const novoEmprestimo = {
      matriculaCliente: matricula,
      isbnLivro: isbn,
      dataRetirada: hoje.toISOString().slice(0, 10),
      dataPrevistaDevolucao: dataPrevista.toISOString().slice(0, 10),
      dataDevolucao: null,
      diasAtraso: null
    };

    emprestimoCriado = await emprestimoRepository.create(novoEmprestimo);
    expect(emprestimoCriado).toHaveProperty('id');
    expect(emprestimoCriado.isbnLivro).toBe(isbn);
  });

  it('getByCliente deve retornar empréstimos do cliente', async () => {
    const emprestimos = await emprestimoRepository.getByCliente(matricula);
    expect(Array.isArray(emprestimos)).toBe(true);
    expect(emprestimos.find(e => e.id === emprestimoCriado.id)).toBeDefined();
  });

  it('update deve registrar devolução', async () => {
    const hoje = new Date().toISOString().slice(0, 10);
    const atualizado = await emprestimoRepository.update(emprestimoCriado.id, {
      ...emprestimoCriado,
      dataDevolucao: hoje,
      diasAtraso: 0
    });

    expect(atualizado.dataDevolucao).toBe(hoje);
  });
});
