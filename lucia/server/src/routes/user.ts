import { auth } from '@/lib/lucia';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
	const authHandler = auth.handleRequest(req, res);
	// check if session exists
	const session = await authHandler.validate();
	if (!session) return res.status(401).json({ message: 'Unauthorized' });
	// get user
	return res.json({ user: session });
});

export default router;
