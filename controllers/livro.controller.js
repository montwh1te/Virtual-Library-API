import * as livroService from '../services/livro.service.js';

export async function getAllLivros(req, res) {
  const livros = await livroService.getAllLivros();
  res.json(livros);
}

export async function getLivroByISBN(req, res) {
  const livro = await livroService.getLivroByISBN(req.params.isbn);
  if (livro) return res.json(livro);
  res.status(404).json({ error: 'Livro não encontrado' });
}

export async function createLivro(req, res) {
  try {
    const novoLivro = await livroService.createLivro(req.body);
    res.status(201).json(novoLivro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateLivro(req, res) {
  try {
    const livroAtualizado = await livroService.updateLivro(req.params.isbn, req.body);
    res.json(livroAtualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteLivro(req, res) {
  try {
    await livroService.deleteLivro(req.params.isbn);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}