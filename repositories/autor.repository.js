let autores = [
  { id: 1, nome: 'Machado de Assis', pais: 'Brasil' },
  { id: 2, nome: 'J.K. Rowling', pais: 'Reino Unido' }
];
let idCounter = 3;

// ...existing code...

export function getAll() {
  return autores;
}

export function getById(id) {
  return autores.find(autor => autor.id === Number(id));
}

export function create(data) {
  if (!data.nome || !data.pais) {
    throw new Error('Nome e país são obrigatórios');
  }
  const novoAutor = { id: idCounter++, ...data };
  autores.push(novoAutor);
  return novoAutor;
}

export function update(id, data) {
  const index = autores.findIndex(autor => autor.id === Number(id));
  if (index === -1) throw new Error('Autor não encontrado');
  autores[index] = { ...autores[index], ...data };
  return autores[index];
}

export function remove(id) {
  const index = autores.findIndex(autor => autor.id === Number(id));
  if (index === -1) throw new Error('Autor não encontrado');
  autores.splice(index, 1);
}