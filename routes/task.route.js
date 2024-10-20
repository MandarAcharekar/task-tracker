import express from 'express';

import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../controllers/task.controller.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/',authMiddleware, createTask);
router.get('/:id',authMiddleware, getTaskById);
router.put('/:id',authMiddleware, updateTask);
router.delete('/:id',authMiddleware, deleteTask);
router.get('/',authMiddleware, getTasks);

export default router;
