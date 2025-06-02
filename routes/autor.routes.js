import { Router } from 'express';
import * as autorController from '../controllers/autor.controller.js';

const router = Router();

router.get('/', autorController.getAllAutores);
router.get('/:id', autorController.getAutorById);
router.post('/', autorController.createAutor);
router.put('/:id', autorController.updateAutor);
router.delete('/:id', autorController.deleteAutor);

export default router;