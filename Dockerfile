FROM node:lts-stretch-slim
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
RUN npm install
RUN npm install -g typescript
RUN tsc
CMD ["node", "index.js"]