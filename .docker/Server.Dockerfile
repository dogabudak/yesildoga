FROM node:16-alpine@sha256:2eee2f439d3b3509bbe40faff6584bd31b5745b4c137e93e2d795899a2927762

WORKDIR /build

COPY ["package.json", "yarn.lock", "/build/"]

RUN yarn install --ci

COPY ["tsconfig.json", "next.config.js", "next-env.d.ts", ".babelrc.js", "/build/"]
COPY ["src", "/build/src"]
COPY ["public", "/build/public"]

RUN yarn build

CMD ["yarn", "start"]

LABEL maintainer="Tom Sacher <me@dunklestoast.de>"
