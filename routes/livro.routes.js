import { Router } from 'express';
import * as livroController from '../controllers/livro.controller.js';

const router = Router();

router.get('/', livroController.getAllLivros);
router.get('/:isbn', livroController.getLivroByISBN);
router.post('/', livroController.createLivro);
router.put('/:isbn', livroController.updateLivro);
router.delete('/:isbn', livroController.deleteLivro);

export default router;