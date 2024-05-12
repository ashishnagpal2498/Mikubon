FROM node

COPY . /home/usr

ENV DIR=/home/usr
ENV PORT=6000

WORKDIR ${DIR}

RUN npm install

EXPOSE ${PORT}

CMD ["node", "server1.js"]