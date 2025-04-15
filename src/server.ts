import Logger from '@helpers/logger';
import fastify from 'fastify';
import next from 'fastify-nextjs';
import fstatic from 'fastify-static';
import path from 'path';
import { goalProgress, registerSearch } from './routes/goals';

const { NODE_ENV, SERVER_HOST = '0.0.0.0', SERVER_PORT = '1337' } = process.env;

if (!(SERVER_PORT && SERVER_HOST)) {
  throw new Error('Missing fastify configuration.');
}
(async () => {
  try {
    const server = fastify({
      logger: Logger,
      pluginTimeout: 60 * 1000,
      disableRequestLogging: true,
    });
    console.log('PORT from env:', process.env.PORT);

    server.register(fstatic, {
      root: path.join(__dirname, '..', 'public'),
    });
    console.log('Registering goalProgress...');

    server.register(goalProgress);
    console.log('Registering registerSearch...');
    server.register(registerSearch);
    console.log('Registering next.js...');

    server
      .register(next, {
        dev: true,
        dir: path.join(__dirname, '..'), // or wherever next.config.js is
      })
      .after((error) => {
        if (error) {
          console.error('Next.js registration failed:', error);
        } else {
          console.log('Next.js registered.');
          server.next('/');
        }
      });
    console.log('Listening...', Number.parseInt(SERVER_PORT, 10), SERVER_HOST);

    await server.listen(Number.parseInt(SERVER_PORT, 10), SERVER_HOST);
    console.log(`Server is running at http://${SERVER_HOST}:${SERVER_PORT}`);
  } catch (err) {
    console.error('Server failed to start:', err);
  }
})();
