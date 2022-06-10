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

Check out the SC in [Etherscan](https://rinkeby.etherscan.io/address/0xe9f7f026355d691238f628cd8bcbb39bf7f4f8e2)

## API Documentation

The following endpoints are available:

- **Create wallet**
  - `POST api/v1/wallets/:userId`
    - Path: _userId_ is the id of the user.
    - Body: empty
    - Example: `POST /wallets/asd123`
    - Response: the _address_ property is the address of the wallet for that particular user.
```json
{
    "id": 5,
    "user_id": "asd123",
    "private_key": "0x8082e5c8b45ce5698af26a51b314503eb0488d239d49c225e59405373aa1bda9",
    "address": "0x00Bd8EbEeBEE720cF3Cabe401bc4b96E362B9C61"
}
```

- **Get wallets**
  - `GET api/v1/wallets`
    - Path: empty
    - Body: empty
    - Example: `GET /wallets`
    - Response: the _address_ property is the address of the wallet for that particular user.
```json
[
    {
        "id": 1,
        "user_id": "1",
        "private_key": "0x8cd44b554456c3185ba845388b10943a2f36e4f5d9e9ddcfc217f55aa083f18b",
        "address": "0x95B883F075d438CEA5952c5a7163EF1ED49c4Eda"
    },
    {
        "id": 2,
        "user_id": "8f4g5f6g",
        "private_key": "0x2cd9e69a82aa14c796cfdfc499cc429d8ff6ebfdc5994f25cef30ca223da9d51",
        "address": "0xCe52D4545A36c1366e21B86Cf8040Bd307b6318F"
    },
    {
        "id": 3,
        "user_id": "facu1",
        "private_key": "0xafd5ea47258633c390cfbe9235720423495c03900101e083b4bfb2c19caa2653",
        "address": "0xaa994f63f812A136158aC937aCC806E40b85739d"
    },
    {
        "id": 5,
        "user_id": "asd123",
        "private_key": "0x8082e5c8b45ce5698af26a51b314503eb0488d239d49c225e59405373aa1bda9",
        "address": "0x00Bd8EbEeBEE720cF3Cabe401bc4b96E362B9C61"
    }
]
```
- **Get wallet from specific user**
  - `GET api/v1/wallets/:userId`
    - Path: _userId_ is the id of the user.
    - Body: empty
    - Example: `GET /wallets/asd123`
    - Response: the _address_ property is the address of the wallet for that particular user.
```json
{
    "id": 5,
    "user_id": "asd123",
    "private_key": "0x8082e5c8b45ce5698af26a51b314503eb0488d239d49c225e59405373aa1bda9",
    "address": "0x00Bd8EbEeBEE720cF3Cabe401bc4b96E362B9C61"
}
```

- **Deposit ethers _into the Smart contract_**
  - `POST api/v1/deposit/:userId`
    - Path: _userId_ is the id of the user.
    - Body: _amountInEthers_ is the amount of ethers to deposit as a string. `{
    "amountInEthers": "0.0001"
}`
    - Example: `POST /deposit/asd123`
    - Response: transaction receipt. _from_ property should be the address of the wallet for that _userId_
```json
{
    "nonce": 2,
    "gasPrice": {
        "type": "BigNumber",
        "hex": "0x4190ab08"
    },
    "gasLimit": {
        "type": "BigNumber",
        "hex": "0x6d78"
    },
    "to": "0xE9f7F026355d691238F628Cd8BCBb39Bf7F4f8E2",
    "value": {
        "type": "BigNumber",
        "hex": "0x5af3107a4000"
    },
    "data": "0xd0e30db0",
    "chainId": 4,
    "v": 43,
    "r": "0xc8fc145f611e8e5552374c3dedc2f588458d7214a523b095d70f5478bf06bdf8",
    "s": "0x0ff83c7c81028bfa59aa8375b489daaa77787aa80ba4d7421a1ea09621abc607",
    "from": "0xaa994f63f812A136158aC937aCC806E40b85739d",
    "hash": "0xcc9c8acb976d44bc96e4a10f6c89d7431ab5e08fc681db5a6e682c213ab5c101"
}
```

- **Get transactions**
  - GET api/v1/transactions
    - Path: empty
    - Body: empty
    - Example: `GET /transactions`
    - Response example: _id_ represents the tx's hash.
```json
[
    {
        "id": "0x8d9f054f2bae4c5a3a243c6878a47e31dc5e63d55dfa144964ccb59711e5653d",
        "user_id": "facu1",
        "receiver_address": "0xE9f7F026355d691238F628Cd8BCBb39Bf7F4f8E2",
        "sender_address": "0xaa994f63f812A136158aC937aCC806E40b85739d",
        "amount": 0.0001,
        "day": 28,
        "month": 5,
        "year": 2022
    },
    {
        "id": "0xcc9c8acb976d44bc96e4a10f6c89d7431ab5e08fc681db5a6e682c213ab5c101",
        "user_id": "facu1",
        "receiver_address": "0xE9f7F026355d691238F628Cd8BCBb39Bf7F4f8E2",
        "sender_address": "0xaa994f63f812A136158aC937aCC806E40b85739d",
        "amount": 0.0001,
        "day": 28,
        "month": 5,
        "year": 2022
    }
]
```
- **Get transactions from specific user**
  - `GET api/v1/transactions/:userId`
    - Path: _userId_ is the id of the user.
    - Body: empty
    - Example: `GET /transactions/asd123`
    - Response example: _id_ represents the tx's hash.

```json
[
    {
        "id": "0x8d9f054f2bae4c5a3a243c6878a47e31dc5e63d55dfa144964ccb59711e5653d",
        "user_id": "asd123",
        "receiver_address": "0xE9f7F026355d691238F628Cd8BCBb39Bf7F4f8E2",
        "sender_address": "0xaa994f63f812A136158aC937aCC806E40b85739d",
        "amount": 0.0001,
        "day": 28,
        "month": 5,
        "year": 2022
    }
]
```

- **Make payment to specific user**
  - `POST api/v1/pay/:userId`
    - Path: _userId_ is the id of the user.
    - Body: _amountInEthers_ is the amount of ethers to deposit as a string. `{"amountInEthers": "0.0001"}`
    - Example: `POST /pay/asd123`
    - Response example: _id_ represents the tx's hash, _to_ is the address of the receiver, _from_ is the address of the sender.
```json
{
    "nonce": 9,
    "gasPrice": {
        "type": "BigNumber",
        "hex": "0x3c6b6cca"
    },
    "gasLimit": {
        "type": "BigNumber",
        "hex": "0x919f"
    },
    "to": "0xaa994f63f812A136158aC937aCC806E40b85739d",
    "value": {
        "type": "BigNumber",
        "hex": "0x00"
    },
    "data": "0x935f4c18000000000000000000000000aa994f63f812a136158ac937acc806e40b85739d000000000000000000000000000000000000000000000000002386f26fc10000",
    "chainId": 4,
    "v": 44,
    "r": "0x757a11857014df7a6efcc444e6857891c8a3a74e575361e442208c227c7c57ba",
    "s": "0x68929ce2f7b530535a813b6aeb2a1da630efa842e359e4ec4c6480f4ad9a736c",
    "from": "0xE9f7F026355d691238F628Cd8BCBb39Bf7F4f8E2",
    "hash": "0x342d49c9ee513ffefebdb9120abce0eb9045bb5040ce337a228cba2851b3a53e"
}
```

- **Get balance from a wallet for a specific user**
  - `GET api/v1/balances/`
    - Headers: _user-id_ is the id of the user formatted as a string.
    - Response example: _balance_ represents the balance of the user in ethers.
```json
{
    "balance": "0.05156058679858502"
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
