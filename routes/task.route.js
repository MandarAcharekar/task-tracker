import express from 'express';

import { createTask, getTasks, getTaskById, updateTask, deleteTask, addComment, addAttachment } from "../controllers/task.controller.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/',authMiddleware, createTask);
router.get('/:taskId',authMiddleware, getTaskById);
router.put('/:taskId',authMiddleware, updateTask);
router.delete('/:taskId',authMiddleware, deleteTask);
router.get('/',authMiddleware, getTasks);

router.post('/:taskId/comments', authMiddleware, addComment);
router.post('/:taskId/attachments', authMiddleware, addAttachment);

export default router;
