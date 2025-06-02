let emprestimos = [];
let idCounter = 1;

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