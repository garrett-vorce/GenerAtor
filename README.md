# Algorand - ASA Token Generator - 1.0

![Algorand](https://www.algorand.com/assets/media-kit/logos/full/png/algorand_full_logo_white.png)

This tool enables users to use new or existing credentials from the Algorand blockchain, on various networks such as (mainnet and testnet) to create Algorand Standard Assets (ASA).

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

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
