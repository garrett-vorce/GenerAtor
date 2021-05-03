# Algorand - ASA Token Generator - 1.0

![Algorand](https://www.algorand.com/assets/media-kit/logos/full/png/algorand_full_logo_white.png)

This tool enables users to use new or existing credentials from the Algorand blockchain, on various networks such as (mainnet and testnet) to create Algorand Standard Assets (ASA).

<br/>

> Assets that represent many of the same type, like a stablecoin, may be referred to as fungible assets. Single, unique assets are referred to as non-fungible assets.

<br/>

## Installation

Clone the respository

```bash
git clone https://github.com/garrett-vorce/algorand-generator.git
```

Use [npm](https://www.npmjs.com/) to dependencies.

```bash
npm install
```

Compile Angular assets & launch Electron

```bash
npm run start
```

## Set up & Installation

Choose between networks located in src/app/utils/networks.ts

```python
export const networks = [
  {
    name: 'Main Network',
    host: '',
    token: '',
  },
  {
    name: 'Test Network',
    host: 'https://testnet.algoexplorerapi.io',
    token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  },
];

```

### Test Network

1). Generate 3 acccounts

```bash
node createAccounts.js
```

2). Copy Addresses and Mnenomic keys in a seperate location

3). Add Algo's to each test account via [Test Network Faucet](https://bank.testnet.algorand.network/)

<br />

### Main Network

1). Sign up on [Purestake](https://developer.purestake.io/)

2). Navigate to [YOUR API KEY](https://developer.purestake.io/home)

3). Copy API KEY, insert like so:

```bash
  {
    name: 'Main Network',
    host: 'https://mainnet-algorand.api.purestake.io/ps2',
    token: '<YOUR-API-KEY>',
  },
```

## Debug

Uncomment inside app.js

```bash
// browserWinder.webContents.openDevTools()
```

## Donate

All of this software is open source and meant to improve productivity. Consider funding me!

Algorand: `6Q2GWWMPSTTIM27IRKRQHJHHGOUM5K254ORZORVYR52XKZ7LKEAS2X4IE4`

Bitcoin: `bc1ql0q533mwk5m29l69gh2wtgq0lxcv0f50v5r2qp`

Ethereum: `0x70B592d81A045e57b849e2b2754630115671b1B7`

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
