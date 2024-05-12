FROM node

COPY . /home/usr

ENV DIR=/home/usr
ENV PORT=3001

WORKDIR ${DIR}

RUN npm install

EXPOSE ${PORT}

CMD ["npm", "start"]