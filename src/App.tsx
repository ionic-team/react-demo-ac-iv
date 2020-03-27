import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonModal } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { observer } from 'mobx-react-lite';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';

import Login from './pages/Login';
import Tabs from './pages/Tabs';
import { AuthenticationService } from './services/AuthService';
import { VaultService } from './services/VaultService';
import { AuthProvider } from './contexts/Auth';
import { VaultProvider } from './contexts/Vault';
import CustomPinDialog from './components/CustomPinDialog';
import { BrowserAuthPlugin } from './mock/BrowserPlugin';
import { BrowserAuthService } from './mock/BrowserService';

const App: React.FC = () => {
  let browserPlugin;
  if (!window.Capacitor) {
    browserPlugin = new BrowserAuthPlugin(new BrowserAuthService());
  }
  const vaultService = new VaultService(browserPlugin);
  const authService = new AuthenticationService(vaultService);
  return (
    <VaultProvider value={vaultService}>
      <AuthProvider value={authService}>
        <AppComponent authService={authService} vaultService={vaultService}/>
      </AuthProvider>
    </VaultProvider>
  );
}

type AppComponentProps = { authService: AuthenticationService, vaultService: VaultService };
const AppComponent: React.FC<AppComponentProps> = observer((props) => {
  // mobx will reload this for us
  const isLoggedIn = props.authService.isLoggedIn;
  return (
    <IonApp>
      <IonModal isOpen={props.vaultService.pinMode > 1}>
        <CustomPinDialog></CustomPinDialog>
      </IonModal>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* <Route path="/edit-tea-category/:id" render={() => isLoggedIn ? <EditTeaCategory /> : <Redirect to="/login" />} /> */}
          <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
          <Route path="/tabs" render={() => isLoggedIn ? <Tabs /> : <Redirect to="/login"/>} />
          <Route path="/login" render={() => isLoggedIn ? <Redirect to="/tabs/home"/> : <Login />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
})

export default App;
