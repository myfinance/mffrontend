FROM nginx:alpine

COPY ./dist/apps/mffrontend/ /usr/share/nginx/html