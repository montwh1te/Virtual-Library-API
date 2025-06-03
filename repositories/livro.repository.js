let livros = [
  { isbn: '9788535914849', titulo: 'Dom Casmurro', autorId: 1, disponivel: false },
  { isbn: '9780439139601', titulo: 'Harry Potter e o Prisioneiro de Azkaban', autorId: 2, disponivel: true }
];

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