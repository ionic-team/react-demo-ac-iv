import {
  AuthMode,
  IonicIdentityVaultUser,
  IonicNativeAuthPlugin,
  BiometricType,
  VaultConfig
} from '@ionic-enterprise/identity-vault';
import { observable, action, runInAction, when } from 'mobx';

import { BrowserAuthPlugin } from '../mock/BrowserPlugin';

export enum PinMode {
  Dismiss = 0,
  New = 2,
  Unlock = 3,
  Verify = 4
}

export class VaultService extends IonicIdentityVaultUser<any> {
  @observable public authMode = AuthMode.InMemoryOnly;
  @observable public biometricType?: BiometricType;
  @observable public biometricsEnabled = false
  @observable public secureStorageEnabled = false;
  @observable public passcodeEnabled = false;
  @observable public hasSessionStored = false;
  @observable public pinMode = PinMode.Dismiss;
  @observable public pin = '';
  @observable public isLocked = true;

  constructor(private browserAuthPlugin?: BrowserAuthPlugin) {
    super({ ready: () => Promise.resolve() }, {
      restoreSessionOnReady: false,
      unlockOnReady: false,
      unlockOnAccess: true,
      lockAfter: 5000,
      hideScreenOnBackground: true
    });
    this.getBiometricType().then(biometricType => this.biometricType = biometricType);
    this.hasStoredSession().then(storedSession => this.hasSessionStored = storedSession);
    this.getVault().then(vault => vault.isLocked()).then(isLocked => this.isLocked = isLocked);
  }

  @action
  onConfigChange(config: VaultConfig) {
    if (config.authMode !== undefined) {
      switch(config.authMode) {
        case AuthMode.BiometricAndPasscode:
        case AuthMode.BiometricOrPasscode:
          this.setAuthModeState(true, true, false); break;
        case AuthMode.BiometricOnly:
          this.setAuthModeState(true, false, false); break;
        case AuthMode.InMemoryOnly:
          this.setAuthModeState(false, false, false); break;
        case AuthMode.PasscodeOnly:
          this.setAuthModeState(false, true, false); break;
        case AuthMode.SecureStorage:
          this.setAuthModeState(false, false, true); break;
      }
      this.authMode = config.authMode;
    }
  }

  private setAuthModeState(biometricsEnabled: boolean, passcodeEnabled: boolean, secureStorageEnabled: boolean) {
    this.biometricsEnabled = biometricsEnabled;
    this.passcodeEnabled = passcodeEnabled;
    this.secureStorageEnabled = secureStorageEnabled;
  }

  async onPasscodeRequest(isPasscodeSetRequest: boolean): Promise<string> {
    if (isPasscodeSetRequest) {
      this.pinMode = PinMode.New;
    } else {
      this.pinMode = PinMode.Unlock;
    }
    await when(() => this.pinMode === PinMode.Dismiss);
    const data = this.pin;
    this.pin = '';
    return data;
  }


  // there are no callbacks for storing/removing sessions, so we update stored session state here
  async onVaultUnlocked() {
    const hasSessionStored = await this.hasStoredSession();//
    runInAction(() => {
      this.isLocked = false;
      this.hasSessionStored = hasSessionStored;
    })
  }

  async onVaultLocked() {
    const hasSessionStored = await this.hasStoredSession();
    runInAction(() => {
      this.isLocked = true;
      this.hasSessionStored = hasSessionStored;
    })
  }

  getPlugin(): IonicNativeAuthPlugin {
    if (window.Capacitor) {
      return super.getPlugin();
    }
    return this.browserAuthPlugin!;
  }
}
