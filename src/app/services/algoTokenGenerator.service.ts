import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import algosdk, { Account } from 'algosdk';
import {
  waitForConfirmation,
  printAssetHolding,
  printCreatedAsset,
} from '../utils';

export interface CreationParams {
  accounts: {
    accountOneMnemonic: string;
    accountTwoMnemonic: string;
    accountThreeMnemonic: string;
  };
  asset: {
    totalIssuance: number;
    unitName: string;
    assetName: string;
    assetURL: string;
  };
  network: { name: string; host: string; token: string };
}

@Injectable({
  providedIn: 'root',
})
export class AlgoTokenGeneratorService implements OnDestroy {
  destroyed$: Subject<boolean> = new Subject<boolean>();
  token: string;
  server: string;
  port = '';
  algosdk: any;

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  async createAsset(creationParams: CreationParams): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        this.setNetwork(creationParams);

        const {
          accountOne,
          accountTwo,
          accountThree,
        } = this.getAccountAddresses(creationParams);

        const {
          params,
          note,
          addr,
          defaultFrozen,
          decimals,
          totalIssuance,
          unitName,
          assetName,
          assetURL,
          assetMetadataHash,
          manager,
          reserve,
          freeze,
          clawback,
        } = await this.getTransactionParams(
          creationParams,
          accountOne,
          accountTwo
        );

        const transaction = await this.getTransaction(
          params,
          note,
          addr,
          defaultFrozen,
          decimals,
          totalIssuance,
          unitName,
          assetName,
          assetURL,
          assetMetadataHash,
          manager,
          reserve,
          freeze,
          clawback
        );

        let finalizedAssetID = null;
        let finalizedTX = null;
        let rawSignedTxn = transaction.signTxn(accountOne.sk);
        let tx = await this.algosdk.sendRawTransaction(rawSignedTxn).do();
        let assetID = null;

        await waitForConfirmation(this.algosdk, tx.txId);
        // Get the new asset's information from the creator account
        let ptx = await this.algosdk
          .pendingTransactionInformation(tx.txId)
          .do();

        assetID = ptx['asset-index'];
        finalizedAssetID = assetID;
        finalizedTX = tx;

        const { createdAsset } = await printCreatedAsset(
          this.algosdk,
          accountOne.addr,
          finalizedAssetID
        );

        const { assetHoldings } = await printAssetHolding(
          this.algosdk,
          accountOne.addr,
          finalizedAssetID
        );

        resolve({
          response: {
            createdAsset,
            assetHoldings,
            transaction: finalizedTX,
            accounts: [accountOne.addr, accountTwo.addr, accountThree.addr],
          },
        });
      } catch (err) {
        reject({ err: err });
      }
    });
  }

  setNetwork(creationParams: CreationParams): void {
    const { host: server, token: secret } = creationParams.network;
    this.server = server;
    this.token = secret;
    const token = { 'X-API-Key': this.token };

    this.algosdk = new algosdk.Algodv2(token, this.server, this.port);
  }

  getAccountAddresses(creationParams: CreationParams) {
    const accountOne: Account = algosdk.mnemonicToSecretKey(
      creationParams.accounts.accountOneMnemonic
    );

    const accountTwo: Account = algosdk.mnemonicToSecretKey(
      creationParams.accounts.accountTwoMnemonic
    );

    const accountThree: Account = algosdk.mnemonicToSecretKey(
      creationParams.accounts.accountThreeMnemonic
    );

    return { accountOne, accountTwo, accountThree };
  }

  async getTransactionParams(
    creationParams: CreationParams,
    accountOne: Account,
    accountTwo: Account
  ) {
    let params = await this.algosdk.getTransactionParams().do();
    let note = undefined; // arbitrary data to be stored in the transaction; here, none is stored
    let addr = accountOne.addr;
    let defaultFrozen = false;
    let decimals = 0;
    let totalIssuance = Number(creationParams.asset.totalIssuance);
    let unitName = String(creationParams.asset.unitName);
    let assetName = String(creationParams.asset.assetName);
    let assetURL = String(creationParams.asset.assetURL);
    let assetMetadataHash = '16efaa3924a6fd9d3a4824799a4ac65d';

    let manager = accountTwo.addr;
    let reserve = accountTwo.addr;
    let freeze = accountTwo.addr;
    let clawback = accountTwo.addr;

    return {
      params,
      note,
      addr,
      defaultFrozen,
      decimals,
      totalIssuance,
      unitName,
      assetName,
      assetURL,
      assetMetadataHash,
      manager,
      reserve,
      freeze,
      clawback,
    };
  }

  async getTransaction(
    params,
    note,
    addr,
    defaultFrozen,
    decimals,
    totalIssuance,
    unitName,
    assetName,
    assetURL,
    assetMetadataHash,
    manager,
    reserve,
    freeze,
    clawback
  ) {
    return await algosdk.makeAssetCreateTxnWithSuggestedParams(
      addr,
      note,
      totalIssuance,
      decimals,
      defaultFrozen,
      manager,
      reserve,
      freeze,
      clawback,
      unitName,
      assetName,
      assetURL,
      assetMetadataHash,
      params
    );
  }
}
