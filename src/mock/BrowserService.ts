import { BiometricType, IdentityVault, PluginConfiguration, AuthMode } from '@ionic-enterprise/identity-vault';

export class BrowserAuthService implements IdentityVault {
  private storage = window.localStorage;

  config = {
    authMode: AuthMode.SecureStorage,
    descriptor: {
      username: '',
      vaultId: ''
    },
    isBiometricsEnabled: false,
    isPasscodeEnabled: false,
    isPasscodeSetupNeeded: false,
    isSecureStorageModeEnabled: true,
    hideScreenOnBackground: false,
    lockAfter: 50000
  };

  unsubscribe(): Promise<void> {
    return Promise.resolve();
  }

  async clear() {
    await this.storage.clear();
  }

  lock(): Promise<void> {
    return Promise.resolve();
  }

  isLocked(): Promise<boolean> {
    return Promise.resolve(false);
  }

  async isInUse(): Promise<boolean> {
    return !!(await this.storage.getItem('session'));
  }

  getConfig(): Promise<PluginConfiguration> {
    return Promise.resolve(this.config);
  }

  remainingAttempts(): Promise<number> {
    return Promise.resolve(5);
  }

  getUsername(): Promise<string> {
    return Promise.resolve('MyUsername');
  }

  storeToken(token: any): Promise<void> {
    return Promise.resolve();
  }

  getToken(): Promise<any> {
    return Promise.resolve('MyToken');
  }

  async storeValue(key: string, value: any): Promise<void> {
    await this.storage.setItem(key, value);
  }

  async getValue(key: string): Promise<any> {
    return await this.storage.getItem(key);
  }

  removeValue(key: string): Promise<any> {
    this.storage.removeItem(key);
    return Promise.resolve();
  }

  async getKeys(): Promise<any> {
    return await Object.keys(this.storage);
  }

  getBiometricType(): Promise<BiometricType> {
    const none: BiometricType = 'none';
    return Promise.resolve(none);
  }

  setBiometricsEnabled(isBiometricsEnabled: boolean): Promise<void> {
    return Promise.resolve();
  }

  isBiometricsEnabled(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isBiometricsAvailable(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isBiometricsSupported(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isPasscodeSetupNeeded(): Promise<boolean> {
    return Promise.resolve(false);
  }

  setPasscode(passcode?: string): Promise<void> {
    return Promise.resolve();
  }

  isPasscodeEnabled(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isSecureStorageModeEnabled(): Promise<boolean> {
    return Promise.resolve(true);
  }

  setPasscodeEnabled(isPasscodeEnabled: boolean): Promise<void> {
    return Promise.resolve();
  }

  setSecureStorageModeEnabled(enabled: boolean): Promise<void> {
    return Promise.resolve();
  }

  unlock(usingPasscode?: boolean, passcode?: string): Promise<void> {
    return Promise.resolve();
  }

}
