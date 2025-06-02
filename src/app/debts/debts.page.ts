import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonIcon
} from '@ionic/angular/standalone';
import { NavComponent } from '../components/nav/nav.component';
import { PlayerService } from '../services/player.service';
import { addIcons } from 'ionicons';
import { cash } from 'ionicons/icons';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.page.html',
  styleUrls: ['./debts.page.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonButton,
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
export class DebtsPage implements OnInit {
  debts: number[] = [];
  money: number = 0;

  resultMessage = "";
  colorMessage = "";

  constructor(public playerService: PlayerService) {
    this.playerService.player$.subscribe((pj) => {
      this.debts = pj?.debts ?? [];
      this.money = pj?.money ?? 0;
    });

    addIcons({ cash });

  }

  payDebt(index: number) {
    const res = this.playerService.payDebt(index);
    if (!res) {
      this.resultMessage = "No se pudo realizar el pago";
      this.colorMessage = "rgb(247, 97, 97)";
      setTimeout(() => {
        this.resultMessage = "";
      }, 3000)
      return
    }

    this.resultMessage = "Deuda pagada con éxito";
    this.colorMessage = "rgb(107, 255, 62)";
    setTimeout(() => {
      this.resultMessage = "";
    }, 3000)

  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.debts = this.playerService.getDebts() ?? [];
    this.money = this.playerService.getPlayer()?.money ?? 0;
  }
}
