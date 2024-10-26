import express from 'express';

import { createTeam, inviteMember, joinTeam, getTeamDetails } from "../controllers/team.controller.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createTeam);
router.post('/:teamId/invite', authMiddleware,inviteMember);
router.get('/:teamId', authMiddleware, getTeamDetails);
router.post('/:teamId/join', authMiddleware, joinTeam);

export default router;
