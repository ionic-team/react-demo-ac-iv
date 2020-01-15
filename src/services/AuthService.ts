import { observable, autorun, runInAction, action } from 'mobx';
import { IonicAuth, AuthResult } from '@ionic-enterprise/auth';

import environment from '../environment';
import { VaultService } from './VaultService';
import { User, IDToken } from '../definitions';

const { nativeAzureConfig, webAzureConfig } = environment;


export class AuthenticationService extends IonicAuth<IDToken> {
  private vaultService: VaultService;

  /** Access token exists and the vault is unlocked. */
  @observable public isLoggedIn: boolean;
  @observable public user?: User;
  @observable public accessToken?: string;
  onVaultLockChange: () => void;

  constructor(vaultService: VaultService) {
    const config = window.Capacitor ? nativeAzureConfig : webAzureConfig;
    config.tokenStorageProvider = vaultService;
    super(config);
    this.vaultService = vaultService;
    this.isLoggedIn = false;
    this.onVaultLockChange = autorun(() => { this.setLoginState(this.vaultService.isLocked); });
  }

  async login(): Promise<void> {
    await this.vaultService.logout();
    // await this.vaultService.setDesiredAuthMode();

    try {
      await super.login();
    } catch (err) {
      // This is to handle the password reset case for Azure AD
      //  This only applicable to Azure AD.
      console.log('login error:', +err);
      const message: string = err.message;
      // This is the error code returned by the Azure AD servers on failure.
      if (message !== undefined && message.startsWith('AADB2C90118')) {
        // The address you pass back is the custom user flow (policy) endpoint
        await super.login(
          'https://vikingsquad.b2clogin.com/vikingsquad.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_password_reset'
        );
      } else {
        throw new Error(err.error);
      }
    }
  }

  async setLoginState(isLocked: boolean, authResult: AuthResult = {}) {
    if (isLocked) {
      this.isLoggedIn = false;
      return
    }

    const { accessToken } = authResult;
    // swallow vault errors
    try {
      const [hasSession, idTokenInfo, accessTokenString] = await Promise.all([
        this.vaultService.hasStoredSession(),
        this.getIdToken(),
        accessToken ? Promise.resolve(accessToken) : this.getAccessToken()
      ]) as [boolean, IDToken, string] // https://github.com/microsoft/TypeScript/issues/33752;

      // batch state updates
      runInAction(() => {
        this.vaultService.hasSessionStored = hasSession;
        this.user = this.getUserInfo(idTokenInfo);
        this.accessToken = accessTokenString;
        this.isLoggedIn = true;
      });
    } catch (err) {}
  }

  onLoginSuccess(authResult: AuthResult) {
    // we pass isLocked as false, since we have access to all tokens in memory
    this.setLoginState(false, authResult);
  }


  @action
  onLogout() {
    this.isLoggedIn = false;
    this.user = undefined;
    this.accessToken = undefined;
    this.vaultService.logout();
    this.vaultService.hasSessionStored = false;
  }

  private getUserInfo(idToken?: IDToken): User | undefined {
    if (!idToken) return;

    let email = idToken.email;
    if (idToken.emails instanceof Array) {
      email = idToken.emails[0];
    }

    return {
      id: idToken.sub,
      email: email!, // one or the other will exist
      firstName: idToken.firstName,
      lastName: idToken.lastName
    };
  }
}
