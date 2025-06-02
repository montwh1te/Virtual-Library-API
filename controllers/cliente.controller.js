import * as clienteService from '../services/cliente.service.js';

export async function getAllClientes(req, res) {
  const clientes = await clienteService.getAllClientes();
  res.json(clientes);
}

export async function getClienteByMatricula(req, res) {
  const cliente = await clienteService.getClienteByMatricula(req.params.matricula);
  if (cliente) return res.json(cliente);
  res.status(404).json({ error: 'Cliente não encontrado' });
}

export async function createCliente(req, res) {
  try {
    const novoCliente = await clienteService.createCliente(req.body);
    res.status(201).json(novoCliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateCliente(req, res) {
  try {
    const clienteAtualizado = await clienteService.updateCliente(req.params.matricula, req.body);
    res.json(clienteAtualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteCliente(req, res) {
  try {
    await clienteService.deleteCliente(req.params.matricula);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}