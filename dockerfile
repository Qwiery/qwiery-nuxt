ARG NODE_VERSION=21.0.0

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

COPY --link package.json package-lock.json ./
COPY --link ./data.sqlite ./
RUN npm install --production=false

COPY --link . .

RUN npm run build
RUN npm prune


# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/dist /src/dist
COPY --from=build /src/data.sqlite /src/data.sqlite

# for some strange reason sqlite3 does not installed in the build phase
WORKDIR /src/dist/server
RUN npm install sqlite3

WORKDIR /src
CMD [ "node", "./dist/server/index.mjs" ]
