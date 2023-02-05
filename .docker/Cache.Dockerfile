FROM nginx:alpine@sha256:cc8c413c74aba9fef9dae7f3da736725136bad1e3f24fbc93788aea1944f51c4

COPY [".docker/config/nginx.cache.conf", "/etc/nginx/nginx.conf"]
