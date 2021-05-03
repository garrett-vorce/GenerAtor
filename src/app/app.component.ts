import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AlgoTokenGeneratorService } from './services/algoTokenGenerator.service';
import { networks } from './utils/networks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  buttonText: string = 'Create';
  isLoading: boolean = false;
  title: string =
    'Algorand - <a href="https://developer.algorand.org/docs/features/asa/" target="_blank">ASA</a> Token Generator';
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  destroyed$: Subject<boolean> = new Subject<boolean>();
  networks: { name: string; host: string }[] = networks;

  constructor(
    private _formBuilder: FormBuilder,
    private _algoTokenGenerator: AlgoTokenGeneratorService
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  initializeForms(): void {
    this.firstFormGroup = this._formBuilder.group({
      network: ['', Validators.required],
      accountOneMnemonic: ['', Validators.required],
      accountTwoMnemonic: ['', Validators.required],
      accountThreeMnemonic: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      totalIssuance: [0, Validators.required],
      unitName: ['', Validators.required],
      assetName: ['', Validators.required],
      assetURL: ['', Validators.required],
    });
  }

  setLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  async createAsset(): Promise<void> {
    if (Boolean(this.firstFormGroup.invalid || this.secondFormGroup.invalid)) {
      return;
    }

    const createAssetParams = {
      accounts: {
        accountOneMnemonic: this.firstFormGroup.get('accountOneMnemonic').value,
        accountTwoMnemonic: this.firstFormGroup.get('accountTwoMnemonic').value,
        accountThreeMnemonic: this.firstFormGroup.get('accountThreeMnemonic')
          .value,
      },
      asset: {
        totalIssuance: this.secondFormGroup.get('totalIssuance').value,
        unitName: this.secondFormGroup.get('unitName').value,
        assetName: this.secondFormGroup.get('assetName').value,
        assetURL: this.secondFormGroup.get('assetURL').value,
      },
      network: this.firstFormGroup.get('network').value,
    };

    this.setLoading(true);
    this.buttonText = 'Creating...';

    try {
      const { response, err } = await this._algoTokenGenerator.createAsset(
        createAssetParams
      );

      console.log('RESULT', {
        response,
        err,
      });

      this.setLoading(false);
      this.setProperties(response, createAssetParams);
    } catch (err) {
      console.error('Error', err);
      this.setLoading(false);
      this.buttonText = 'Retry';
    }
  }

  setProperties(response: any, params: any): void {
    const assetId = response.createdAsset['asset-id'];
    let linkToAsset: string;

    if (params.network.name.includes('Main')) {
      linkToAsset = `https://algoexplorer.io/asset/${assetId}`;
    }

    if (params.network.name.includes('Beta')) {
      linkToAsset = `https://betanet.algoexplorer.io/asset/${assetId}`;
    }

    if (params.network.name.includes('Test')) {
      linkToAsset = `https://testnet.algoexplorer.io/asset/${assetId}`;
    }
  }
}
