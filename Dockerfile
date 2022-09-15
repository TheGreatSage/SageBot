FROM node:18.9.0 as discbot

WORKDIR /bot

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

ENTRYPOINT ["./scripts/docker-entry.sh"]
CMD ["npm", "run", "dev"]