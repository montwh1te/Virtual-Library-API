import * as emprestimoService from '../services/emprestimo.service.js';

export async function getAllEmprestimos(req, res) {
  const emprestimos = await emprestimoService.getAllEmprestimos();
  res.json(emprestimos);
}

export async function getEmprestimoById(req, res) {
  const emprestimo = await emprestimoService.getEmprestimoById(req.params.id);
  if (emprestimo) return res.json(emprestimo);
  res.status(404).json({ error: 'Empréstimo não encontrado' });
}

export async function createEmprestimo(req, res) {
  try {
    const novoEmprestimo = await emprestimoService.createEmprestimo(req.body);
    res.status(201).json(novoEmprestimo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function devolverEmprestimo(req, res) {
  try {
    const resultado = await emprestimoService.devolverEmprestimo(req.params.id);
    res.json(resultado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}