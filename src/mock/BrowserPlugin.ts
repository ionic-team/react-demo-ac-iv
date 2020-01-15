import {
  IdentityVault, PluginOptions,
  IonicNativeAuthPlugin
} from '@ionic-enterprise/identity-vault';
import { BrowserAuthService } from './BrowserService';

export class BrowserAuthPlugin implements IonicNativeAuthPlugin {
  constructor(private browserAuthService: BrowserAuthService) {}

  getVault(config: PluginOptions): IdentityVault {
    config.onReady && config.onReady(this.browserAuthService);
    return this.browserAuthService;
  }
}
