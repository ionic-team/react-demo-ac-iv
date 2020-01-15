import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton
} from '@ionic/react';

import environment from '../environment';
import { isTeaCategory, TeaCategory } from '../definitions';


function saveTeaCategory(teaCategory: TeaCategory) {
  fetch(`${environment.environment.dataService}/tea-categories/${teaCategory.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teaCategory)
  });
}

const EditTeaCategory: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  let { id } = useParams();

  useEffect(() => {
    async function loadTeaCategory() {
      if (id) {
        const teaCategory = await (await fetch(`${environment.environment.dataService}/tea-categories/${id}`)).json();
        if (isTeaCategory(teaCategory)) {
          setName(teaCategory.name);
          setDescription(teaCategory.description);
        }
      }
    }

    loadTeaCategory();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit Category</IonTitle>
          <IonButtons>
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>

      </IonHeader>
      <IonContent>
        <form>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput
                id="name-input"
                type="text"
                name="name"
                value={name}
                onChange={(event: any) => setName(event.target.value)}>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Description</IonLabel>
              <IonTextarea
                id="description-textarea"
                name="description"
                required
                rows={5}
                value={description}
                onChange={(event: any) => setDescription(event.target.value)}>
              </IonTextarea>
            </IonItem>
          </IonList>
        </form>
      </IonContent>
      <IonToolbar>
        <IonButton
          id="save-button"
          expand="full"
          disabled={!name.length && !description.length}
          onClick={() => saveTeaCategory({ id: id as any, name, description })}>
        </IonButton>
      </IonToolbar>
    </IonPage>
   );
}

export default EditTeaCategory;

