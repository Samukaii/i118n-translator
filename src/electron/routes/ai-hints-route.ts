import express from 'express';
import { aiHintsController } from '../controllers/ai-hints/ai-hints.controller.js';

const router = express.Router();

router.post('/fill_empty_languages', aiHintsController.translateEmptyLanguages);

export const aiHintsRoute = router;
