import { config as dotenvConfig } from 'dotenv';

let dotenvFileSkipped = false;
const env = dotenvConfig();

if (env.error) {
    if (env.error.syscall === 'open' || env.error.code === 'ENOENT') {
        dotenvFileSkipped = true;
    }
    else {
        throw env.error;
    }
}

export {
    env,
    dotenvFileSkipped,
};
