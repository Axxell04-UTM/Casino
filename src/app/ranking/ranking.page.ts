import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonIcon
} from '@ionic/angular/standalone';
import { NavComponent } from '../components/nav/nav.component';
import { RankingService } from '../services/ranking.service';
import { User } from '../interfaces/user.interface';
import { addIcons } from 'ionicons';
import { cash, personCircle } from 'ionicons/icons';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    NavComponent,
    IonIcon
  ],
})
export class RankingPage implements OnInit {
  ranking: User[] = [];

  constructor(private rankingService: RankingService) {
    addIcons({personCircle,cash});
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.ranking = this.rankingService.getRanking();
    console.log(this.ranking);
  }
}
