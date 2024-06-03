FROM nginx:alpine

ENV API_SERVER_URL="http://34.207.182.179:8080"

COPY . /usr/share/nginx/html