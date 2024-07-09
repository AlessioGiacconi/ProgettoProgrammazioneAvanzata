import { Router } from 'express';
import { getAllPassages, createPassage, getPassage, updatePassage, deletePassage } from '../controllers/passageController';

const router = Router();

router.get('/badges', getAllPassages);
router.post('/badges', createPassage);
router.get('/badges/:id', getPassage);
router.put('/badges/:id', updatePassage);
router.delete('/badges/:id', deletePassage);

export default router;