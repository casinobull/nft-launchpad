import { Router } from 'express';
import authRouter from './modules/auth.routes';
import uploadRouter from './modules/upload.routes';
import deployRouter from './modules/deploy.routes';
import collectionsRouter from './modules/collections.routes';
import mintRouter from './modules/mint.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/upload', uploadRouter);
router.use('/deploy', deployRouter);
router.use('/collections', collectionsRouter);
router.use('/mint', mintRouter);

export default router;


