import Logger from '@helpers/logger';
import fastify from 'fastify';
import next from 'fastify-nextjs';
import fstatic from 'fastify-static';
import path from 'path';
import { routes as getAbsences } from './routes/goals';

const { NODE_ENV, SERVER_HOST = '0.0.0.0', SERVER_PORT = '1337' } = process.env;

if (!(SERVER_PORT && SERVER_HOST)) {
  throw new Error('Missing fastify configuration.');
}

(async () => {
  const server = fastify({
    logger: Logger,
    pluginTimeout: 60 * 1000,
    disableRequestLogging: true,
  });

  server.register(fstatic, {
    root: path.join(__dirname, '..', 'public'),
  });
  server.register(getAbsences);

  server.register(next, { dev: NODE_ENV === 'development' }).after((error) => {
    if (error) {
      throw error;
    } else {
      server.next('/');
    }
  });

  await server.listen(Number.parseInt(SERVER_PORT, 10), SERVER_HOST);
})();
