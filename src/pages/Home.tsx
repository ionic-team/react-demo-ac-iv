import React, { useEffect, useState } from 'react';
import { IonLabel } from '@ionic/react';
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
import { useHistory } from 'react-router';
import { TeaCategory, isTeaCategories } from '../definitions';
import environment from '../environment';
import { logOut } from 'ionicons/icons';

async function loadTeaCategories(accessToken?: string) {
  if (!accessToken) {
    throw new Error('No access token! Unable to load tea categories.');
  }

  const teaCategoriesResp = await fetch(
    `${environment.environment.dataService}/tea-categories`,
    { headers: { "Authorization": `Bearer ${accessToken}` } }
  );

  if (teaCategoriesResp.status === 200) {
    const teaCategories = await teaCategoriesResp.json();
    if (isTeaCategories(teaCategories)) {
      return teaCategories;
    } else {
      throw new Error('Malformed response');
    }
  } else {
    throw new Error(`Unable to fetch tea categories. ${teaCategoriesResp.status}: ${teaCategoriesResp.statusText}`);
  }
}

const Home: React.FC = () => {
  const authService = useAuthService();
  const history = useHistory();
  const [teaCategories, setTeaCategories] = useState<TeaCategory[]>([]);
  //https://github.com/facebook/react/issues/14920#issuecomment-466145690
  const accessToken = useState(authService.accessToken)[0];

  useEffect(() => {
      loadTeaCategories(accessToken)
        .then(tc => setTeaCategories(tc))
        .catch(err => alert(err));
  }, [accessToken]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Home</IonTitle>
          <IonButtons slot="primary">
            <IonButton slot="icon-only" onClick={() => authService.logout()}>
              <IonIcon icon={logOut}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>

      </IonHeader>
      <IonContent class="ion-padding">
          <IonList>
            {
              teaCategories.map((category: TeaCategory) => (
                <IonItem key={category.id} onClick={() => history.push(`/edit-tea-category/${category.id}`)}>
                  <IonLabel style={{"whiteSpace": "normal"}}>
                    <div className="title">{ category.name }</div>
                    <div>{ category.description }</div>
                  </IonLabel>
                </IonItem>
              ))
            }
          </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
