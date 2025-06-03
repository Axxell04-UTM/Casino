import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cash, diamond } from 'ionicons/icons';
import { CardComponent } from '../components/card/card.component';
import { RouterLink } from '@angular/router';
import { NavComponent } from "../components/nav/nav.component";
import { PlayerService } from '../services/player.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-find-the-diamond',
  templateUrl: './find-the-diamond.page.html',
  styleUrls: ['./find-the-diamond.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    CardComponent,
    NavComponent,
    IonIcon
],
})
export class FindTheDiamondPage implements OnInit {
  money: number = 0;

  numCards: 5 | 10 | 20 = 10;

  winningIndex: number | undefined;
  earningValue: 100 | 500 | 3000 = 500;
  lostValue: 10 | 50 = 10;

  constructor(private playerService: PlayerService, private settings: SettingsService) {
    this.playerService.player$.subscribe(pj => {
      this.money = pj?.money ?? 0;
    });

    this.settings.difficulty$.subscribe(level => {
      if (level === 1) {
        this.numCards = 5;
        this.earningValue = 100;
        this.lostValue = 10;
      } else if (level === 3) {
        this.numCards = 20;
        this.earningValue = 3000;
        this.lostValue = 50;
      } else {
        this.numCards = 10;
        this.earningValue = 500;
        this.lostValue = 10;
      }
    })

    addIcons({ cash });

    for (let index = 0; index < this.numCards; index++) {
      this.cards.push({ status: undefined });
    }
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  refreshWI() {
    this.winningIndex = this.getRandomInt(0, this.numCards - 1);
    this.revealed = false;
    this.resultMessage = "";
  }

  

  resultMessage = "";

  colorMessage = ""

  revealed: boolean | undefined;

  cards: { status: boolean | undefined }[] = [];

  revealCards() {
    this.revealed = true;
  }

  onPressCard(event: number) {
    if (this.resultMessage) { return };
    if (!this.money) {
      this.resultMessage = "Necesita más dinero para seguir jugando";
      this.colorMessage = "rgb(247, 97, 97)";
      return;
    }

    this.revealCards();
    if (event === this.winningIndex) {
      this.resultMessage = "Has ganado " + this.earningValue;
      this.colorMessage = "rgb(107, 255, 62)"
      this.playerService.updateMoney("earning", this.earningValue);
    } else {
      this.resultMessage = "Has perdido " + this.lostValue;
      this.colorMessage = "rgb(247, 97, 97)"
      this.playerService.updateMoney("lost", this.lostValue);
    }

  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.refreshWI();
  }
}
