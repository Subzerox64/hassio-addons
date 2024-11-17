FROM node:21-alpine

WORKDIR /app

COPY script.mjs /app/script.mjs
COPY package.json /app/package.json

RUN apk update
RUN apk add python3 py3-pip alpine-sdk openssl-dev build-base python3-dev
RUN python3 -m pip install setuptools --break-system-packages
RUN npm i -g @rubynetwork/rammerhead

COPY Run.sh /Run.sh

EXPOSE 8080

RUN chmod a+x /Run.sh

CMD [ "/Run.sh" ]
