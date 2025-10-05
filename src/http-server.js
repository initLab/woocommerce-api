import http from 'node:http';
import app from './app.js';

export async function initServer() {
    // Get port from environment and store in Express.
    const port = normalizePort(process.env.PORT ?? '3000');
    app.set('port', port);

    // Create HTTP server.
    const httpServer = http.createServer(app);

    httpServer.on('error', function(error) {
        throw error;
    });

    // Listen on provided port
    await new Promise(function(resolve) {
        httpServer.listen(port, process.env.HOST, function() {
            const addr = httpServer.address();
            const bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr.port;
            console.info('Listening on', bind);
            resolve();
        });
    });
}

// Normalize a port into a number, string, or false.
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
