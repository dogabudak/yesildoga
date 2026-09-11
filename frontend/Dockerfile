FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY tsconfig.json next.config.js next-env.d.ts .babelrc.js ./
COPY src/ ./src/
COPY public/ ./public/

RUN find . -name "*.stories.*" -delete

# NEXT_PUBLIC_* vars are inlined at build time, so they must be build args.
# Render passes service env vars to the Docker build; the code falls back to
# production defaults if they are absent.
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_CHROME_STORE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_CHROME_STORE_URL=$NEXT_PUBLIC_CHROME_STORE_URL

RUN yarn build

EXPOSE 3000

CMD yarn start -p ${PORT:-3000}
