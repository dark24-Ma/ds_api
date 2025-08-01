FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production
COPY .env .


COPY --from=builder /app/dist ./dist

EXPOSE 8086
CMD ["node", "dist/main"]
