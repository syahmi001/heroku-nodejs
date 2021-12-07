const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

logger.info('What rolls down stairs');
logger.info('alone or in pairs,');
logger.info('and over your neighbors dog?');
logger.warn('Whats great for a snack,');
logger.info('And fits on your back?');
logger.error('Its log, log, log');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use( (req, res, done) => {
    logger.info(req.originalUrl);
    done();
});

const handler = (func) => (req, res) => {
    try {
        logger.info('server.handler.begun');
        logger.info("Server started successfully", { port: port, environment: process.env.NODE_ENV });
        func(req, res, logger);
    } catch(e){
        logger.info('server.handler.failed');
        res.send('Oh no, something did not go well!');
    }
};

app.get('/', (req, res) => res.send('This is the landing page. Change to "/success" or "/error" for logging test'))
app.get('/success', handler((req, res) => { res.send('Yay!'); }))
app.get('/error', handler((req, res) => { throw new Error('Doh!'); }))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))