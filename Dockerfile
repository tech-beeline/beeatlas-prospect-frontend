ARG RUN_IMAGE=nginxinc/nginx-unprivileged:1.29.5-alpine3.23-perl
FROM ${RUN_IMAGE}

COPY --chown=nginx:root nginx/templates  /etc/nginx/templates
COPY --chown=nginx:root --chmod=755 nginx/scripts/*.sh /docker-entrypoint.d/
COPY --chown=nginx:root build/  /www/
USER root
COPY certs/* /certs/
RUN for c in /certs/*.crt; do echo "" >>  /etc/ssl/certs/ca-certificates.crt; cat $c >> /etc/ssl/certs/ca-certificates.crt; done; rm -rf /certs
RUN mkdir -p /www/env && chown -R nginx:root /www/env && chmod o+rw /www/env && rm /etc/nginx/conf.d/default.conf
USER nginx

# defaults for /www/env/env
ARG VERSION=1.10.2
ENV APPVERSION=${VERSION}
ENV FLAG_IS_PROD=true
ENV FLAG_IS_DEMO_STAND=false
ENV FLAG_AUTHENTIK_URL='http://authentik'
ENV FLAG_API_URL=''
ENV FLAG_DOC_SERVICE_URL='http://documents-local'
ENV FLAG_WEBIDE_URL='http://webide.local/'
ENV FLAG_AUTHENTIK_CLIENT_ID=''
ENV FLAG_EAUTH_URL='https://eauth-prod.ess-prod.vimpelcom.ru'
ENV FLAG_TEMPLATE_URL=''
ENV FLAG_DASHBOARD_URL=''

# defaults for nginx\site.d\http-frontend.conf.template
ENV NGINX_LOCATION_API_GATEWAY='http://gateway:8080'
ENV NGINX_LOCATION_API='http://backend:8080'
ENV NGINX_LOCATION_API_GATEWAY_ADDITIONAL_PARAMS=''
ENV NGINX_LOCATION_API_ADDITIONAL_PARAMS=''

