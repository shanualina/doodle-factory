FROM ubuntu:20.04

COPY ./ /app

ENV NODE_VERSION="14.18.0"

RUN apt-get -y update && apt-get -y upgrade && apt-get install -y wget
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash \

    && . /root/.nvm/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV PATH="/bin/versions/node/v${NODE_VERSION}/bin:${PATH}"

WORKDIR /app

RUN npm install

EXPOSE 5000

ENTRYPOINT [ "node", "index.js" ]
