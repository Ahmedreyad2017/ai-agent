import {Router} from 'express';
import container from "../config/awilix";

const router = Router();
const dialRouter = container.resolve('dialRouter');
const authRouter = container.resolve('authRouter');
router.use('/dials', dialRouter);
router.use('/auth', authRouter);
export default router;
