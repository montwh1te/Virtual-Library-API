let emprestimos = [
  {
    id: 1,
    matriculaCliente: '20230001',
    isbnLivro: '9788535914849',
    dataRetirada: '2024-06-01',
    dataPrevistaDevolucao: '2024-06-08',
    dataDevolucao: null,
    diasAtraso: null
  }
];
let idCounter = 2;

export function getAll() {
  return emprestimos;
}

export function getById(id) {
  return emprestimos.find(e => e.id === Number(id));
}

export function getByCliente(matriculaCliente) {
  return emprestimos.filter(e => e.matriculaCliente === matriculaCliente);
}

export function create(data) {
  const novoEmprestimo = { id: idCounter++, ...data };
  emprestimos.push(novoEmprestimo);
  return novoEmprestimo;
}

export function update(id, data) {
  const index = emprestimos.findIndex(e => e.id === Number(id));
  if (index === -1) throw new Error('Empréstimo não encontrado');
  emprestimos[index] = { ...emprestimos[index], ...data };
  return emprestimos[index];
}