let livros = [];

export function getAll() {
  return livros;
}

export function getByISBN(isbn) {
  return livros.find(livro => livro.isbn === isbn);
}

export function create(data) {
  if (getByISBN(data.isbn)) {
    throw new Error('Livro já cadastrado');
  }
  livros.push(data);
  return data;
}

export function update(isbn, data) {
  const index = livros.findIndex(livro => livro.isbn === isbn);
  if (index === -1) throw new Error('Livro não encontrado');
  livros[index] = { ...livros[index], ...data };
  return livros[index];
}

export function remove(isbn) {
  const index = livros.findIndex(livro => livro.isbn === isbn);
  if (index === -1) throw new Error('Livro não encontrado');
  livros.splice(index, 1);
}