import express from 'express';

import { createTask, getTasks } from "../controllers/task.controller.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/',authMiddleware, getTasks);
router.post('/',authMiddleware, createTask);

export default router;
