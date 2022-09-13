const pino = require('pino');
const transport = pino.transport({
    targets: [
        {
            target: 'pino/file',
            "options": { destination: './logs/log.log', mkdir: true },
        },
        {
            target: 'pino-dev',
        }
    ]
    
});
const logger = pino(transport);

module.exports = logger;