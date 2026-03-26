FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY tsconfig.json next.config.js next-env.d.ts .babelrc.js ./
COPY src/ ./src/
COPY public/ ./public/

RUN yarn build

EXPOSE 3000

CMD yarn start -p ${PORT:-3000}
