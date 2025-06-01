FROM node:20.2-buster

ARG APP_ENV=''
RUN echo ${APP_ENV}
ENV APP_ENV=${APP_ENV}

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build:${APP_ENV}
EXPOSE 8080
CMD yarn start:${APP_ENV}

