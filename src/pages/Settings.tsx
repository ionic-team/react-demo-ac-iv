
import React from 'react';
import { IonLabel, IonToggle } from '@ionic/react';
import { useAuthService } from '../contexts/Auth';
import {
  IonIcon,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem
} from '@ionic/react';
import { lock, logOut } from 'ionicons/icons';
import { useVaultService } from '../contexts/Vault';
import { observer } from 'mobx-react-lite';
import { AuthMode } from '@ionic-enterprise/identity-vault';


const Settings: React.FC = observer(() => {
  const vaultService = useVaultService();
  const authService = useAuthService();

  function toggleSecureStorage(checked: boolean) {
    const authMode = checked ? AuthMode.SecureStorage : AuthMode.InMemoryOnly;
    vaultService.setAuthMode(authMode);
  }

  return (
    <IonPage id="settings-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Settings</IonTitle>
          <IonButtons slot="primary">
            <IonButton slot="icon-only" onClick={authService.logout}>
              <IonIcon name="log-out"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-text-center ion-padding">
          <IonList>
            <IonItem>
              <IonLabel>Use Biometrics { vaultService.biometricType }</IonLabel>
              <IonToggle
                checked={ vaultService.biometricsEnabled }
                disabled={ vaultService.secureStorageEnabled }
                onIonChange={ev => vaultService.setBiometricsEnabled(ev.detail.checked)}>
              </IonToggle>
            </IonItem>
            <IonItem>
              <IonLabel>Use Passcode</IonLabel>
              <IonToggle
                checked={ vaultService.passcodeEnabled }
                disabled={ vaultService.secureStorageEnabled }
                onIonChange={ev => vaultService.setPasscodeEnabled(ev.detail.checked)}>
              </IonToggle>
            </IonItem>
            <IonItem>
              <IonLabel>Secure Storage Mode</IonLabel>
              <IonToggle
                checked={ vaultService.secureStorageEnabled }
                onIonChange={ev => toggleSecureStorage(ev.detail.checked)}>
              </IonToggle>
            </IonItem>
            <IonItem>
              <IonLabel>Lock</IonLabel>
              <IonButton disabled={ vaultService.secureStorageEnabled } onClick={() => vaultService.lockOut()}>
                <IonIcon icon={lock}></IonIcon>
              </IonButton>
            </IonItem>
            <IonItem>
              <IonLabel>Logout</IonLabel>
              <IonButton onClick={() => authService.logout()}>
                <IonIcon icon={logOut}></IonIcon>
              </IonButton>
            </IonItem>
          </IonList>
      </IonContent>
    </IonPage>
  );
});


export default Settings;
