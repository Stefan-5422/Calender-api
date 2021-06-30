FROM node:current-alpine3.10

RUN mkdir /home/server

COPY . /home/server

WORKDIR /home/server
RUN npm i

CMD ["npm", "run", "start"]
