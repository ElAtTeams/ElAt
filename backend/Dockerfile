# TypeScript destekli Node.js backend için Dockerfile
FROM node:18-alpine

# Global olarak gerekli paketleri kur
RUN npm install -g ts-node-dev typescript

WORKDIR /app

# Package dosyalarını kopyala ve bağımlılıkları kur
COPY package*.json ./
RUN npm install

# Kaynak kodunu kopyala
COPY . .

EXPOSE 4000
CMD ["npm", "run", "dev"]