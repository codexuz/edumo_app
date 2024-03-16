import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { VueFire, VueFireAuth  } from 'vuefire'
import { firebaseApp } from '@/firebase'
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import "./style.css"
/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';


// Import Ionic-Vue components
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCol, 
  IonGrid, 
  IonRow,
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle,
  IonBackButton, 
  IonButtons,
  IonLoading,
  IonProgressBar,
  IonMenu,
  IonToast,
  IonTabs, 
  IonTabBar, 
  IonTabButton,
  IonSearchbar,
  IonAvatar,
  IonModal,
  IonRouterOutlet,
  IonApp,
  IonSpinner,
  IonToggle,
  IonList,
  IonListHeader
} from '@ionic/vue';


const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
          VueFireAuth(),
          ],
  })
  

  // Register Ionic-Vue components globally
app.component('ion-list', IonList)
app.component('ion-list-header', IonListHeader)
app.component('ion-spinner', IonSpinner)
app.component('ion-app', IonApp)
app.component('ion-router-outlet', IonRouterOutlet)
app.component('ion-modal', IonModal)
app.component('ion-avatar', IonAvatar)
app.component('ion-search-bar', IonSearchbar)
app.component('ion-tabs', IonTabs)
app.component('ion-tab-bar', IonTabBar) 
app.component('ion-tab-button', IonTabButton)
app.component('ion-toast', IonToast)
app.component('ion-menu', IonMenu)
app.component('ion-progress-bar', IonProgressBar)
app.component('ion-loading', IonLoading)
app.component('ion-buttons', IonButtons)
app.component('ion-back-button', IonBackButton)
app.component('ion-card-title', IonCardTitle)
app.component('ion-card-subtitle', IonCardSubtitle)
app.component('ion-card-content', IonCardContent)
app.component('ion-card-header', IonCardHeader)
app.component('ion-row', IonRow);
app.component('ion-grid', IonGrid);
app.component('ion-col', IonCol);
app.component('ion-card', IonCard);
app.component('ion-button', IonButton);
app.component('ion-content', IonContent);
app.component('ion-header', IonHeader);
app.component('ion-icon', IonIcon);
app.component('ion-input', IonInput);
app.component('ion-item', IonItem);
app.component('ion-label', IonLabel);
app.component('ion-page', IonPage);
app.component('ion-title', IonTitle);
app.component('ion-toolbar', IonToolbar);
app.component('ion-toggle', IonToggle)



router.isReady().then(() => {
  app.mount('#app');
});