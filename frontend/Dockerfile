FROM node:22 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM pierrezemb/gostatic
COPY --from=build /app/dist /srv/http/

# CMD ["-port","8080"]
CMD ["-port","8080","-https-promote","-enable-logging","-fallback","index.html"]