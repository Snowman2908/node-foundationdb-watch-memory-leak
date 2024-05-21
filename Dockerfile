FROM --platform=linux/amd64 node:20

RUN wget -q https://github.com/apple/foundationdb/releases/download/7.2.0/foundationdb-clients_7.2.0-1_amd64.deb \
  && dpkg -i foundationdb-clients_7.2.0-1_amd64.deb \
  && rm foundationdb-clients_7.2.0-1_amd64.deb

COPY package.json yarn.lock ./

RUN yarn

COPY tsconfig.json index.ts ./

ENTRYPOINT [ "yarn", "ts-node", "index.ts" ]