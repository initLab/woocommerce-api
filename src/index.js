#!/usr/bin/env node

import { dotenvFileSkipped, env } from './dotenv.js';
import { initMetrics } from './prometheus.js';
import { initServer } from './http-server.js';

if (dotenvFileSkipped) {
    console.info('Skipping dotenv file loading', env.error.message);
}

await initMetrics();
await initServer();
