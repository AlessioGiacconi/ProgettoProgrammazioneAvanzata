FROM node:alpine

#EXPOSE 8080
#VOLUME [ "/usr/app" ]
#WORKDIR /usr/app
#COPY ./package*.json .
#RUN npm install
#RUN npm install -g typescript nodemon ts-node
#CMD ["npx", "nodemon", "src/index.ts", "-L"]

WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
RUN npm install
RUN npm install -g typescript
RUN tsc
CMD ["node", "build/index.js"]