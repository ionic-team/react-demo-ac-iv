import { IonicAuthOptions } from '@ionic-enterprise/auth';
import { isPlatform } from '@ionic/react';

const platform = isPlatform('capacitor') ? 'capacitor' : 'web';
const redirectUri = isPlatform('capacitor')
  ? 'myapp://callback'
  : 'http://localhost:8100/login';
const logoutUrl = isPlatform('capacitor')
  ? 'myapp://callback?logout=true'
  : 'http://localhost:8100/logout';

const azureConfig: IonicAuthOptions = {
  clientID: 'b69e2ee7-b67a-4e26-8a38-f7ca30d2e4d4',
  redirectUri,
  scope:
    'openid offline_access email profile https://vikingsquad.onmicrosoft.com/api/Hello.Read',
  discoveryUrl:
    'https://vikingsquad.b2clogin.com/vikingsquad.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_Signup_Signin',
  audience: 'https://api.myapp.com',
  logoutUrl,
  platform,
  iosWebView: 'private',
  authConfig: 'azure',
  androidToolbarColor: 'Red',
};


const DEVenvironment = {
  production: false,
  // dataService: 'http://localhost:5000' // switch to this to run local
  dataService: 'https://cs-demo-api.herokuapp.com',
};

const PRODenvironment = {
  production: true,
  dataService: 'https://cs-demo-api.herokuapp.com',
};

const config =
  process.env.NODE_ENV === 'development'
    ? {
        azureConfig,
        environment: DEVenvironment,
      }
    : {
        azureConfig,
        environment: PRODenvironment,
      };

export default config;
