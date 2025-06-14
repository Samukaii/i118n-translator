import express from 'express';
import { translationsController } from '../controllers/translations/translations.controller.js';

const router = express.Router();

router.get('/', translationsController.getAll);
router.post('/changes', translationsController.registerChange);
router.get('/changes', translationsController.getAllChanges);
router.post('/:path/changes/deletion', translationsController.registerRemoveChange);
router.post('/changes/save', translationsController.saveAll);

router.delete('/:path/changes/revert', translationsController.revertTranslationChange);
router.delete('/:path/changes/entries/:language/revert', translationsController.revertEntryChange);
router.delete('/changes/discard_all', translationsController.discardAllChanges);

export const translationsRoute = router;
