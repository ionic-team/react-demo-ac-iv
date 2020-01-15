import { IonicAuthOptions } from '@ionic-enterprise/auth';

const DEVnativeAzureConfig: IonicAuthOptions = { // client or application id for provider
  clientID: 'b69e2ee7-b67a-4e26-8a38-f7ca30d2e4d4',
  // This is the expected redirectUri from the login page.
  redirectUri: 'myapp://callback',
  // requested scopes from provider
  scope: 'openid offline_access email profile https://vikingsquad.onmicrosoft.com/api/Hello.Read',
  // The discovery url for the provider
  discoveryUrl:
    'https://vikingsquad.b2clogin.com/vikingsquad.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_Signup_Signin',
  // The audience if applicable
  audience: 'https://api.myapp.com',
  // The expected logout url
  logoutUrl: 'myapp://callback?logout=true',
  // The platform which we are running on
  platform: 'capacitor',
  // The type of iOS webview to use. 'shared' will use a webview that can share session/cookies
  // on iOS to provide SSO across multiple apps but will cause a prompt for the user which asks them
  // to confirm they want to share site data with the app. 'private' uses a webview which will not
  // prompt the user but will not be able to share session/cookie data either for true SSO across
  // multiple apps.
  iosWebView: 'private',
  // The auth provider.
  authConfig: 'azure',
  // This sets the color of the toolbar at the top of the login webview for android.
  //  Red is just to call attention to what is being set (you don't want to use Red)
  androidToolbarColor: 'Red'
};

const DEVwebAzureConfig: IonicAuthOptions = {
  // client or application id for provider
  clientID: 'b69e2ee7-b67a-4e26-8a38-f7ca30d2e4d4',
  // This is the expected redirectUri from the login page.
  redirectUri: 'http://localhost:8100/login',
  // requested scopes from provider
  scope: 'openid offline_access email profile https://vikingsquad.onmicrosoft.com/api/Hello.Read',
  // The discovery url for the provider
  discoveryUrl:
    'https://vikingsquad.b2clogin.com/vikingsquad.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_Signup_Signin',
  // The audience if applicable
  audience: 'https://api.myapp.com',
  // The expected logout url
  logoutUrl: 'http://localhost:8100/login',
  // The platform which we are running on
  platform: 'web',
  // The auth provider.
  authConfig: 'azure'
};

const DEVenvironment = {
  production: false,
  // dataService: 'http://localhost:5000' // switch to this to run local
  dataService: 'https://cs-demo-api.herokuapp.com'
};

const PRODnativeAzureConfig: IonicAuthOptions = {
  clientID: 'b69e2ee7-b67a-4e26-8a38-f7ca30d2e4d4',
  redirectUri: 'myapp://callback',
  scope: 'openid offline_access email profile https://vikingsquad.onmicrosoft.com/api/Hello.Read',
  discoveryUrl:
    'https://vikingsquad.b2clogin.com/vikingsquad.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_Signup_Signin',
  audience: 'https://api.myapp.com',
  logoutUrl: 'myapp://callback?logout=true',
  platform: 'capacitor',
  iosWebView: 'private',
  authConfig: 'azure',
  androidToolbarColor: 'Red'
};

const PRODwebAzureConfig: IonicAuthOptions = {
  clientID: 'b69e2ee7-b67a-4e26-8a38-f7ca30d2e4d4',
  redirectUri: 'http://localhost:8100/login',
  scope: 'openid offline_access email profile https://vikingsquad.onmicrosoft.com/api/Hello.Read',
  discoveryUrl:
    'https://vikingsquad.b2clogin.com/vikingsquad.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_Signup_Signin',
  audience: 'https://api.myapp.com',
  logoutUrl: 'http://localhost:8100/login',
  platform: 'web',
  authConfig: 'azure'
};

const PRODenvironment = {
  production: true,
  dataService: 'https://cs-demo-api.herokuapp.com'
};

const config = process.env.NODE_ENV === "development" ? {
  webAzureConfig: DEVwebAzureConfig,
  nativeAzureConfig: DEVnativeAzureConfig,
  environment: DEVenvironment
} : {
  webAzureConfig: PRODwebAzureConfig,
  nativeAzureConfig: PRODnativeAzureConfig,
  environment: PRODenvironment
}

export default config;




