import { Router } from 'express';
import * as clienteController from '../controllers/cliente.controller.js';

const router = Router();

router.get('/', clienteController.getAllClientes);
router.get('/:matricula', clienteController.getClienteByMatricula);
router.post('/', clienteController.createCliente);
router.put('/:matricula', clienteController.updateCliente);
router.delete('/:matricula', clienteController.deleteCliente);

export default router;