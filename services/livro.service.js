import * as livroRepository from '../repositories/livro.repository.js';

export async function getAllLivros() {
  return livroRepository.getAll();
}

export async function getLivroByISBN(isbn) {
  return livroRepository.getByISBN(isbn);
}

export async function createLivro(data) {
  return livroRepository.create(data);
}

export async function updateLivro(isbn, data) {
  return livroRepository.update(isbn, data);
}

export async function deleteLivro(isbn) {
  return livroRepository.remove(isbn);
}