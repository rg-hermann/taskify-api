const dotenv = require('dotenv');

dotenv.config();

const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  rateLimitWindowMs: process.env.RATE_LIMIT_WINDOW_MS ? Number(process.env.RATE_LIMIT_WINDOW_MS) : 15 * 60 * 1000,
  rateLimitMax: process.env.RATE_LIMIT_MAX ? Number(process.env.RATE_LIMIT_MAX) : 100,
  // No DB URI required for local SQLite
  rabbitmqUri: process.env.RABBITMQ_URI || 'amqp://localhost:5672',
};

module.exports = config;
