ARG RUN_IMAGE=nginxinc/nginx-unprivileged:1.29.5-alpine3.23-perl
ARG BUILD_IMAGE=node:18-alpine
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN if [ -d "dist" ] && [ ! -d "build" ]; then mv dist build; \
    elif [ ! -d "build" ]; then \
        echo "❌ Neither 'build' nor 'dist' found after build." && exit 1; \
    fi

RUN if [ -z "$(ls -A build)" ]; then echo "❌ Build directory is empty." && exit 1; fi


FROM ${RUN_IMAGE}

COPY --chown=nginx:root nginx/templates  /etc/nginx/templates
COPY --chown=nginx:root --chmod=755 nginx/scripts/*.sh /docker-entrypoint.d/

USER root
RUN sed -i 's/\r$//' /docker-entrypoint.d/*.sh

COPY --from=builder --chown=nginx:root /app/build/ /www/
COPY certs/* /certs/
RUN for c in /certs/*.crt; do echo "" >>  /etc/ssl/certs/ca-certificates.crt; cat $c >> /etc/ssl/certs/ca-certificates.crt; done; rm -rf /certs
RUN mkdir -p /www/env && chown -R nginx:root /www/env && chmod o+rw /www/env && rm /etc/nginx/conf.d/default.conf
USER nginx

# Переменные окружения (значения по умолчанию)
ARG VERSION=1.14.2
ENV APPVERSION=${VERSION}
ENV FLAG_IS_PROD=true
ENV FLAG_IS_DEMO_STAND=false
ENV FLAG_SHOW_TOP_BANNER=false
ENV FLAG_AUTHENTIK_URL='http://authentik'
ENV FLAG_API_URL=''
ENV FLAG_DOC_SERVICE_URL='http://documents-local'
ENV FLAG_WEBIDE_URL='http://webide.local/'
ENV FLAG_AUTHENTIK_CLIENT_ID=''
ENV FLAG_EAUTH_URL='https://eauth-prod.ess-prod.vimpelcom.ru'
ENV FLAG_TEMPLATE_URL=''
ENV FLAG_DASHBOARD_URL=''

ENV NGINX_LOCATION_API_GATEWAY='http://gateway:8080'
ENV NGINX_LOCATION_API='http://backend:8080'
ENV NGINX_LOCATION_API_GATEWAY_ADDITIONAL_PARAMS=''
ENV NGINX_LOCATION_API_ADDITIONAL_PARAMS=''
