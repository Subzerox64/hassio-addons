FROM node:lts

WORKDIR /addons/Node

RUN npm install puppeteer-core rfbproxy express

RUN npx @puppeteer/browsers install browsers

COPY . .

EXPOSE ${rfbproxy_port}

CMD [ "node", "index.js" ]