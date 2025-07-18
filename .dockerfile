
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN npm ci || npm install
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
COPY --from=builder /app/public ./public
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
