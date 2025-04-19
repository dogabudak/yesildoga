FROM node:16-alpine@sha256:2eee2f439d3b3509bbe40faff6584bd31b5745b4c137e93e2d795899a2927762 as BUILD

WORKDIR /build

COPY ["package.json", "yarn.lock", "/build/"]

RUN yarn install --ci

COPY ["tsconfig.json", "next.config.js", "next-env.d.ts", ".babelrc.js", "/build/"]
COPY ["src", "/build/src"]
COPY ["public", "/build/public"]
COPY [".storybook", "/build/.storybook"]

RUN yarn build:storybook

FROM nginx:1-alpine@sha256:07ab71a2c8e4ecb19a5a5abcfb3a4f175946c001c8af288b1aa766d67b0d05d2

RUN rm /etc/nginx/conf.d/default.conf

# Copy Static Files from Stage 2 and our custom config
COPY [".docker/config/nginx.storybook.conf", "/etc/nginx/nginx.conf"]
COPY --from=BUILD /build/storybook-static /usr/share/nginx/html

EXPOSE 80

LABEL maintainer="Tom Sacher <me@dunklestoast.de>"
