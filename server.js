import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';

const app = express()
const port = process.env.PORT || 5000
dotenv.config();

app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))