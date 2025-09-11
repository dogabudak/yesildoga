import { FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Pool } from 'pg';

declare module 'fastify' {
  interface FastifyInstance {
    pg: Pool;
  }
}

const databasePlugin: FastifyPluginAsync = async (fastify) => {
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'yesildoga',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    max: parseInt(process.env.DB_MAX_CONNECTIONS || '10'),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000'),
    connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || '2000'),
  });

  // Test the connection
  try {
    const client = await pool.connect();
    fastify.log.info('Database connected successfully');
    client.release();
  } catch (error) {
    fastify.log.error('Failed to connect to database:', error);
    throw error;
  }

  // Add pool to fastify instance
  fastify.decorate('pg', pool);

  // Graceful shutdown
  fastify.addHook('onClose', async () => {
    await pool.end();
    fastify.log.info('Database pool closed');
  });
};

export default fastifyPlugin(databasePlugin);