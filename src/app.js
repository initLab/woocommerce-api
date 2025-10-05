import express from 'express';
import cors from 'cors';
import { register as promRegister } from 'prom-client';

const app = express();

app.use(cors());

app.get('/metrics', async function(req, res) {
    try {
        res.set('Content-Type', promRegister.contentType);
        res.end(await promRegister.metrics());
    } catch (ex) {
        res.status(500).end(ex.toString());
    }
});

export default app;
