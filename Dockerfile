# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Build args → env vars pour le build Astro
ARG SITE_URL=https://smanchajm.me
ENV SITE_URL=$SITE_URL

RUN npm run build

# Stage 2: Serve avec Caddy (léger, Traefik gère le reverse proxy + TLS)
FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist /srv

EXPOSE 80
