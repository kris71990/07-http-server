'use strict';

const logger = require('./lib/logger');
const server = require('./lib/server');

server.start(process.env.PORT, () => logger.log(logger.INFO, `Listening on port ${process.env.PORT}`));
