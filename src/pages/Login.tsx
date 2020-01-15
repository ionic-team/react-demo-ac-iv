import React, { useState } from 'react';
import { AuthMode } from '@ionic-enterprise/identity-vault';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonContent,
  IonIcon
} from '@ionic/react';

import { useAuthService } from '../contexts/Auth';
import { useVaultService } from '../contexts/Vault';
import { observer } from 'mobx-react-lite';
import { unlock } from 'ionicons/icons';

import './Login.scss';


const Login: React.FC = observer(() => {
  const [errorMessage, setErrorMessage] = useState('');
  const vaultService = useVaultService();
  const authService = useAuthService();
  let loginType: string | undefined = "";

  const tryAction = async (fn: () => Promise<any>, defaultError: string) => {
    try {
      await fn();
    } catch (err) {
      if (err && err.message) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(defaultError);
        console.error(err);
      }
    }
  }

  try {
    if (vaultService.hasSessionStored) {
      switch (vaultService.authMode) {
        case AuthMode.BiometricAndPasscode:
          loginType = vaultService.biometricType + ' (Passcode Fallback)';
          break;
        case AuthMode.BiometricOnly:
          loginType = vaultService.biometricType;
          break;
        case AuthMode.PasscodeOnly:
          loginType = 'Passcode';
          break;
        case AuthMode.SecureStorage:
          loginType = 'Secure Storage';
          break;
        case AuthMode.InMemoryOnly:
          loginType = 'In Memory Only';
          break;
      }
      loginType = loginType && loginType.charAt(0).toUpperCase() + loginType.slice(1);
    }
  } catch (e) {
    console.error('Unable to check token status', e);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        {
          !authService.isLoggedIn && !vaultService.hasSessionStored
          ?
          <IonButton
            expand="full"
            onClick={() => tryAction(authService.login.bind(authService), 'There was an error logging in')}
            color="tertiary"
          >
            Sign In
          </IonButton>
          :
          <div
            className="unlock ion-text-center"
            onClick={() => tryAction(vaultService.unlock.bind(vaultService), 'There was an error unlocking the vault')}
           >
            <IonIcon icon={unlock}></IonIcon>
            <div>{loginType}</div>
          </div>
        }
        <div className="error">
          {errorMessage}
        </div>
      </IonContent>
    </IonPage>
  );
});

export default Login;
