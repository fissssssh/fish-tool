FROM nginx:alpine AS base
WORKDIR /
COPY ./nginx.conf /etc/nginx/nginx.conf

FROM node AS build
WORKDIR /src
COPY . .
RUN npm install && npm run build

FROM base as final
WORKDIR /app
COPY --from=build /src/build .