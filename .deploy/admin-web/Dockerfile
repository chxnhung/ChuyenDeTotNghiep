FROM node:12
RUN apt-get update && apt-get install -y vim-tiny
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
RUN npm install pm2 -g --unsafe-perm
USER node
COPY --chown=node:node . .
RUN yarn
EXPOSE 3000
EXPOSE 9000
EXPOSE 8080
CMD [ "pm2-runtime", "process.json" ]