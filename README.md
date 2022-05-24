[![Production pipeline](https://github.com/taller2-grupo5-rostov-1c2022/payments-server/actions/workflows/pipeline.yml/badge.svg?branch=master)](https://github.com/taller2-grupo5-rostov-1c2022/payments-server/actions/workflows/pipeline.yml)
[![codecov](https://codecov.io/gh/taller2-grupo5-rostov-1c2022/payments-server/branch/master/graph/badge.svg?token=htOzOZRHPV)](https://codecov.io/gh/taller2-grupo5-rostov-1c2022/payments-server)
[![](https://img.shields.io/badge/Node-12.18.1-green.svg)](https://nodejs.org/en/)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![](https://img.shields.io/badge/version-0.1-blue.svg)

# Spotifiuby Payments Server

## Dependencies

This project is based on [Taller 2 - Basic Payment SC](https://github.com/taller-de-programacion-2/basic_payment_sc).
To install the project we recommend that you use NVM and install the node version defined in `.nvmrc` `(v12.18.1)` or `nvm use`

Once you have that in place, you can install the dependencies with npm through `npm i`

## API Documentation

The following endpoints are available:

- Create wallet: POST /wallet - No body
- Get wallets: GET /wallet
- Get wallet: GET /wallet/:id:
- Deposit ethers into the Smart contract: POST /deposit - Body params: senderId(integer), amountInEthers(string)
- Get deposit receipt: GET /deposit/:txHash:

## Usage example

```sh
$ http POST http://localhost:3000/wallet
HTTP/1.1 200 OK
Connection: keep-alive
Date: Sun, 08 Aug 2021 19:26:53 GMT
Keep-Alive: timeout=5
content-length: 145
content-type: application/json; charset=utf-8

{
    "address": "0x7E039A00fFFD8d8C898e77e52351c799C99D3a2D",
    "id": 1,
    "privateKey": "0x67bb00f89f7b50f9e2924e423d00889c627b9acdc20b738ce00ccdcf6e4b8da0"
}

$ http POST http://localhost:3000/wallet
HTTP/1.1 200 OK
Connection: keep-alive
Date: Sun, 08 Aug 2021 19:26:54 GMT
Keep-Alive: timeout=5
content-length: 145
content-type: application/json; charset=utf-8

{
    "address": "0x6698F9b4c67AeDAcd728297F2bF9eC15993398a4",
    "id": 2,
    "privateKey": "0x7d7b4134704871ea90bc417a9fb21d8e643e076bd67f1253189e75181258c500"
}

$ http POST http://localhost:3000/deposit senderId=1 amountInEthers='0.01'
HTTP/1.1 200 OK
Connection: keep-alive
Date: Sun, 08 Aug 2021 19:27:38 GMT
Keep-Alive: timeout=5
content-length: 538
content-type: application/json; charset=utf-8

{
    "chainId": 4,
    "data": "0xd0e30db0",
    "from": "0x7E039A00fFFD8d8C898e77e52351c799C99D3a2D",
    "gasLimit": {
        "hex": "0xb044",
        "type": "BigNumber"
    },
    "gasPrice": {
        "hex": "0x3b9aca08",
        "type": "BigNumber"
    },
    "hash": "0x9f98447de34d3245ce1976956334336a6302befc4f204ac44a7cac0526caa82d",
    "nonce": 0,
    "r": "0xc78a2f0914988bb37e62c16ffb91ae0335d39fd3dc246fd0c269dbaf0b331589",
    "s": "0x423f245bcc46c872404b43c34fcb789cb0d3befdd44ec928b96bb25a5a887762",
    "to": "0x76b8DA0BB9b9981403586A574d10fA783f08Aa05",
    "type": null,
    "v": 44,
    "value": {
        "hex": "0x2386f26fc10000",
        "type": "BigNumber"
    }
}

$ http GET http://localhost:3000/deposit/0x9f98447de34d3245ce1976956334336a6302befc4f204ac44a7cac0526caa82d
HTTP/1.1 200 OK
Connection: keep-alive
Date: Sun, 08 Aug 2021 19:28:00 GMT
Keep-Alive: timeout=5
content-length: 121
content-type: application/json; charset=utf-8

{
    "amountSent": {
        "hex": "0x2386f26fc10000",
        "type": "BigNumber"
    },
    "senderAddress": "0x7E039A00fFFD8d8C898e77e52351c799C99D3a2D"
}

```

## Heroku

You'll need to set the following actions secrets to deploy the project to Heroku:

- `HEROKU_APP_NAME`: App name
- `HEROKU_EMAIL`: Account email
- `HEROKU_API_KEY`: Account [API key](https://dashboard.heroku.com/account)

## Datadog

The heroku Dockerfile includes the DataDog agent. Create a new DataDog API Key from [here](https://app.datadoghq.com/organization-settings/api-keys).
Also, you need to set the following config vars in Heroku (you can use [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) if you want):

```bash
DD_API_KEY=<api_key_from_datadog>
DD_DYNO_HOST=false
HEROKU_APP_NAME=<app_name>
DD_TAGS=service:<meaningful_tag_for_datadog>
```

## Upload Coverage to Codecov

The pipeline automatically generates a coverage report and uploads it to [codecov](https://about.codecov.io/)

You'll need to set the following actions secrets:

- `CODECOV_TOKEN`: Repo Token. Can be obtained on codecov when setting up or on settings

## Usage

### Environment variables

Keep in mind that you have to set the following variables in a `.env` file in the root of the project:

- `INFURA_API_KEY`: The API key for the Infura node, you can get it from the [Infura dashboard](https://infura.io/dashboard)
- `MNEMONIC`: The mnemonic for the wallet, you can get it from MetaMask.
- `PORT`: The port to run the server on. The default port is 3000.

This repository already contains these variables set as actions secrets and the deployment pipeline generates a `.env`
file with those secrets.


### Testing

To run the tests, after you installed the dependencies, just run `npm t`

### Linting

To run the linter, after you installed the dependencies, just run `npm run lint`

### Coverage

To create a coverage report, after you installed the dependencies, just run `npm run coverage`

### Doc generation

To create the smart contract documentation, after you installed the dependencies, just run `npm run docgen`

This will generate a browsable html file within the `./docs` folder, to view it you can open it with any browser.

### SC Deployment

To deploy the smart contract just run `npm run deploy-rinkeby` or `npm run deploy-local` for local development.
