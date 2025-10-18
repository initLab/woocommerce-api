import express from 'express';
import cors from 'cors';
import { register as promRegister } from 'prom-client';
import { getAllProductVariations } from './woocommerce/index.js';

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

app.get('/productVariations', async function(req, res) {
    res.json(await getAllProductVariations());
});

export default app;
