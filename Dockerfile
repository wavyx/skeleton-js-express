FROM node:lts-alpine

ARG BUILD_NUMBER_CI
ENV APP_NAME=api \
 BUILD_NUMBER_CI=$BUILD_NUMBER_CI

WORKDIR /var/www

COPY ./config /var/www/config
COPY ./src /var/www/src
COPY ./package.json /var/www/package.json
COPY ./package-lock.json /var/www/package-lock.json

RUN npm ci

CMD ["npm", "start"]
