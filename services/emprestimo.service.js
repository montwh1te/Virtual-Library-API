import * as emprestimoRepository from '../repositories/emprestimo.repository.js';
import * as clienteRepository from '../repositories/cliente.repository.js';
import * as livroRepository from '../repositories/livro.repository.js';

export async function getAllEmprestimos() {
  return emprestimoRepository.getAll();
}

export async function getEmprestimoById(id) {
  return emprestimoRepository.getById(id);
}
 
export async function createEmprestimo(data) {
  // data: { matriculaCliente, isbnLivro }
  const cliente = clienteRepository.getByMatricula(data.matriculaCliente);
  if (!cliente) throw new Error('Cliente não encontrado');

  const emprestimosCliente = emprestimoRepository.getByCliente(data.matriculaCliente)
    .filter(e => !e.dataDevolucao);

  if (emprestimosCliente.length >= 3) {
    throw new Error('Cliente já possui três livros retirados');
  }

  const livro = livroRepository.getByISBN(data.isbnLivro);
  if (!livro) throw new Error('Livro não encontrado');
  if (livro.disponivel === false) throw new Error('Livro não está disponível');

  // Marcar o livro como indisponível
  livroRepository.update(data.isbnLivro, { ...livro, disponivel: false });

  // Calcular data prevista de devolução (ex: 7 dias)
  const hoje = new Date();
  const dataPrevista = new Date();
  dataPrevista.setDate(hoje.getDate() + 7);

  return emprestimoRepository.create({
    matriculaCliente: data.matriculaCliente,
    isbnLivro: data.isbnLivro,
    dataRetirada: hoje.toISOString().slice(0, 10),
    dataPrevistaDevolucao: dataPrevista.toISOString().slice(0, 10),
    dataDevolucao: null,
    diasAtraso: null,
  });
}

export async function devolverEmprestimo(id) {
  const emprestimo = emprestimoRepository.getById(id);
  if (!emprestimo) throw new Error('Empréstimo não encontrado');
  if (emprestimo.dataDevolucao) throw new Error('Empréstimo já devolvido');

  const hoje = new Date();
  const dataPrevista = new Date(emprestimo.dataPrevistaDevolucao);
  let diasAtraso = 0;

  if (hoje > dataPrevista) {
    diasAtraso = Math.ceil((hoje - dataPrevista) / (1000 * 60 * 60 * 24));
  }

  emprestimoRepository.update(id, {
    ...emprestimo,
    dataDevolucao: hoje.toISOString().slice(0, 10),
    diasAtraso,
  });

  // Marcar o livro como disponível novamente
  const livro = livroRepository.getByISBN(emprestimo.isbnLivro);
  livroRepository.update(emprestimo.isbnLivro, { ...livro, disponivel: true });

  return { ...emprestimo, dataDevolucao: hoje.toISOString().slice(0, 10), diasAtraso };
}