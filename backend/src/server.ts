import fastify from 'fastify';
import cors from '@fastify/cors';
import config from './plugins/config.js';
import database from './plugins/database.js';
import routes from './routes/index.js';

const server = fastify({
  ajv: {
    customOptions: {
      removeAdditional: "all",
      coerceTypes: true,
      useDefaults: true,
    }
  },
  logger: {
    level: process.env.LOG_LEVEL,
  },
});

await server.register(config);

// Register CORS to allow Chrome extension requests
await server.register(cors, {
  origin: true, // Allow all origins (for Chrome extensions)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
});

await server.register(database);
await server.register(routes);
await server.ready();

export default server;
