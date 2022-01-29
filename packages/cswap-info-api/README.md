# CSWAP Finance API

The CSWAP Finance API is a set of endpoints used by market aggregators (e.g. coinmarketcap.com) to surface CSWAP Finance liquidity
and volume information. All information is fetched from the underlying subgraphs.

## Documentation

The documentation of the endpoints, for CSWAP Finance, can be found [here](documentation.md).

## Development

### Build

```shell
# Install dependencies
yarn

# Build project
yarn build

# Start local server
yarn start:dev
```

Find the endpoints in `src/api/index.ts`.

```shell
# api/pairs.ts
curl -X GET 'localhost:3000/api/pairs'

# ...
```

## Docker

### Build image
```shell
docker build . -t cswap/cswap-info-api --no-cache
docker build --build-arg DOT_ENV_ARG=dev . -t cswap/cswap-info-api --no-cache
docker build --build-arg DOT_ENV_ARG=sta . -t cswap/cswap-info-api --no-cache
docker build --build-arg DOT_ENV_ARG=prod . -t cswap/cswap-info-api --no-cache
```

### Run on port
```shell
docker run -dp <port>:3000 cswap/cswap-info-api
```

## Production

### Deploy

