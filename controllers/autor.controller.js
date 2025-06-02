import * as autorService from '../services/autor.service.js';

export async function getAllAutores(req, res) {
  const autores = await autorService.getAllAutores();
  res.json(autores);
}

export async function getAutorById(req, res) {
  const autor = await autorService.getAutorById(req.params.id);
  if (autor) return res.json(autor);
  res.status(404).json({ error: 'Autor não encontrado' });
}

export async function createAutor(req, res) {
  try {
    const novoAutor = await autorService.createAutor(req.body);
    res.status(201).json(novoAutor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateAutor(req, res) {
  try {
    const autorAtualizado = await autorService.updateAutor(req.params.id, req.body);
    res.json(autorAtualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteAutor(req, res) {
  try {
    await autorService.deleteAutor(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}