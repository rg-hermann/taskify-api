const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
// sqlite DB init
const { init: initDb } = require('./db');

const { errorHandler } = require('./middleware/errorHandler');
const { logger } = require('./utils/logger');
const config = require('./config');
const apiRoutes = require('./routes');

const app = express();

// Basic middleware
app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(compression());

// Rate limiter
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api', apiRoutes);

// Swagger UI (optional)
try {
  const swaggerDocument = require('./swagger.json');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (err) {
  logger.debug('Swagger document not found, skipping /api-docs');
}

// Health
app.get('/health', (req, res) => res.json({ status: 'UP' }));

// Error handler (last middleware)
app.use(errorHandler);

// Start server after DB connection (best-effort)
const start = async () => {
  try {
    logger.info('Initializing SQLite database...');
    await initDb();
    logger.info('SQLite initialized');

    const server = app.listen(config.port, () => {
      logger.info(`Server listening on port ${config.port}`);
    });

    // graceful shutdown
    const shutdown = async () => {
      logger.info('Shutting down...');
      server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    logger.error('Failed to start server', err);
    process.exit(1);
  }
};

start();

module.exports = app;