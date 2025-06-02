import * as autorRepository from '../repositories/autor.repository.js';

export async function getAllAutores() {
  return autorRepository.getAll();
}

export async function getAutorById(id) {
  return autorRepository.getById(id);
}

export async function createAutor(data) {
  return autorRepository.create(data);
}

export async function updateAutor(id, data) {
  return autorRepository.update(id, data);
}

export async function deleteAutor(id) {
  return autorRepository.remove(id);
}