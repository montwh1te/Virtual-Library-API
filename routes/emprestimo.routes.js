import { Router } from 'express';
import * as emprestimoController from '../controllers/emprestimo.controller.js';

const router = Router();

router.get('/', emprestimoController.getAllEmprestimos);
router.get('/:id', emprestimoController.getEmprestimoById);
router.post('/', emprestimoController.createEmprestimo);
router.post('/devolucao/:id', emprestimoController.devolverEmprestimo);

export default router;