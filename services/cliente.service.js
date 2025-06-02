import * as clienteRepository from '../repositories/cliente.repository.js';

export async function getAllClientes() {
  return clienteRepository.getAll();
}

export async function getClienteByMatricula(matricula) {
  return clienteRepository.getByMatricula(matricula);
}

export async function createCliente(data) {
  return clienteRepository.create(data);
}

export async function updateCliente(matricula, data) {
  return clienteRepository.update(matricula, data);
}

export async function deleteCliente(matricula) {
  return clienteRepository.remove(matricula);
}