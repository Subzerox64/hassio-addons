FROM node:lts

WORKDIR /addons/Node

RUN npm install puppeteer-core rfbproxy express

RUN npx @puppeteer/browsers install browsers

RUN npm install vnc-rfb-client

COPY . .

EXPOSE ${rfbproxy_port}

CMD [ "node", "index.js" ]
