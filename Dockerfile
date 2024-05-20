FROM node:12

RUN wget -q https://www.foundationdb.org/downloads/6.2.28/ubuntu/installers/foundationdb-clients_6.2.28-1_amd64.deb \
  && dpkg -i foundationdb-clients_6.2.28-1_amd64.deb \
  && rm foundationdb-clients_6.2.28-1_amd64.deb

COPY package.json yarn.lock ./
RUN yarn

COPY tsconfig.json index.ts ./

ENTRYPOINT [ "yarn", "ts-node", "index.ts" ]