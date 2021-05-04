# Algorand - ASA Token Generator - 1.0

![Algorand](https://www.algorand.com/assets/media-kit/logos/full/png/algorand_full_logo_white.png)
[GenerAtor](https://raw.githubusercontent.com/garrett-vorce/GenerAtor/master/src/assets/logo/Generator-Logo.png)

## Overview

This tool enables users to use new or existing credentials on the Algorand blockchain, on various networks such as (Main Net and Test Net) to create Algorand Standard Assets (ASA).

<br/>

> Assets that represent many of the same type, like a stable coin, may be referred to as fungible assets. Single, unique assets are referred to as non-fungible assets.

<br/>

# Flow

![Step 1](https://raw.githubusercontent.com/garrett-vorce/algorand-generator/master/src/assets/steps/1/1.png)

![Step 2](https://raw.githubusercontent.com/garrett-vorce/algorand-generator/master/src/assets/steps/2/2.png)

![Step 3](https://raw.githubusercontent.com/garrett-vorce/algorand-generator/master/src/assets/steps/3/3.png)

![Popup](https://raw.githubusercontent.com/garrett-vorce/algorand-generator/master/src/assets/algoExplorer/popup.png)

## Installation

Clone the repository

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

1). Generate 3 accounts

```bash
node createAccounts.js
```

2). Copy Addresses and Mnenomic keys in a separate location

3). Add Algo's to each test account via [Test Network Faucet](https://bank.testnet.algorand.network/) (+10 ALGO per request)

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

4). Minimum Balances

- All accounts must have a minimum balance of 0.1 ALGO
- Main account must have an account balance of >= 0.2 ALGO

## Debug

Uncomment inside app.js

```bash
// browserWinder.webContents.openDevTools()
```

## Donation

If this project helps you reduce time to develop, consider tipping! :)

Algorand: `6Q2GWWMPSTTIM27IRKRQHJHHGOUM5K254ORZORVYR52XKZ7LKEAS2X4IE4`

Bitcoin: `bc1ql0q533mwk5m29l69gh2wtgq0lxcv0f50v5r2qp`

Ethereum: `0x70B592d81A045e57b849e2b2754630115671b1B7`

# Social

[Medium](https://garrettvorce.medium.com/)

[Publish0x](https://www.publish0x.com/garrettv)

## License

[MIT](https://choosealicense.com/licenses/mit/)
