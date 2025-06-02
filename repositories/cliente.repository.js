let clientes = [
  { matricula: '20230001', nome: 'João Silva', telefone: '11999999999' },
  { matricula: '20230002', nome: 'Maria Souza', telefone: '21988888888' }
];

export function getAll() {
  return clientes;
}

export function getByMatricula(matricula) {
  return clientes.find(cliente => cliente.matricula === matricula);
}

export function create(data) {
  if (!data.matricula || !data.nome || !data.telefone) {
    throw new Error('Matrícula, nome e telefone são obrigatórios');
  }
  if (getByMatricula(data.matricula)) {
    throw new Error('Cliente já cadastrado');
  }
  clientes.push(data);
  return data;
}

export function update(matricula, data) {
  const index = clientes.findIndex(cliente => cliente.matricula === matricula);
  if (index === -1) throw new Error('Cliente não encontrado');
  clientes[index] = { ...clientes[index], ...data };
  return clientes[index];
}

export function remove(matricula) {
  const index = clientes.findIndex(cliente => cliente.matricula === matricula);
  if (index === -1) throw new Error('Cliente não encontrado');
  clientes.splice(index, 1);
}