export const printAssetHolding = async (
  algodclient,
  account,
  assetid
): Promise<any> => {
  return new Promise(async (resolve) => {
    let accountInfo = await algodclient.accountInformation(account).do();
    for (let idx = 0; idx < accountInfo['assets'].length; idx++) {
      let scrutinizedAsset = accountInfo['assets'][idx];
      if (scrutinizedAsset['asset-id'] == assetid) {
        resolve({ assetHoldings: scrutinizedAsset });
      }
    }
  });
};

export const printCreatedAsset = async (
  algodclient,
  account,
  assetid
): Promise<any> => {
  return new Promise(async (resolve) => {
    let accountInfo = await algodclient.accountInformation(account).do();
    for (let idx = 0; idx < accountInfo['created-assets'].length; idx++) {
      let scrutinizedAsset = accountInfo['created-assets'][idx];
      if (scrutinizedAsset['index'] == assetid) {
        resolve({ createdAsset: scrutinizedAsset });
        break;
      }
    }
  });
};

export const waitForConfirmation = async (algodclient, txId) => {
  let response = await algodclient.status().do();
  let lastround = response['last-round'];
  while (true) {
    const pendingInfo = await algodclient
      .pendingTransactionInformation(txId)
      .do();
    if (
      pendingInfo['confirmed-round'] !== null &&
      pendingInfo['confirmed-round'] > 0
    ) {
      //Got the completed Transaction
      console.log(
        'Transaction ' +
          txId +
          ' confirmed in round ' +
          pendingInfo['confirmed-round']
      );
      break;
    }
    lastround++;
    await algodclient.statusAfterBlock(lastround).do();
  }
};
