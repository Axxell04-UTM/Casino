import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardTitle,
  IonIcon,
} from '@ionic/angular/standalone';
import { NavComponent } from '../components/nav/nav.component';
import { addIcons } from 'ionicons';
import { diamond, journal, map, people, settings, wallet } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonIcon,
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCardTitle,
    RouterLink,
    NavComponent,
  ],
})
export class HomePage {
  constructor() {
    addIcons({ diamond, map, journal, wallet, people, settings });
  }
}
