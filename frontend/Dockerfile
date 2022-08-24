FROM node:16.17.0-alpine3.16
WORKDIR /app/
COPY . .
RUN npm install
ENV API_URL=http://127.0.0.1:3001
EXPOSE 3000