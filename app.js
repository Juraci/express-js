import express from 'express';
import blocks from './routes/blocks';

const app = express();
app.use('/blocks', blocks);

export default app;
