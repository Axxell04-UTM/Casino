import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { NavComponent } from "../components/nav/nav.component";
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-russian-roulette',
  templateUrl: './russian-roulette.page.html',
  styleUrls: ['./russian-roulette.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavComponent]
})
export class RussianRoulettePage{
 chamber: boolean[] = [];
  currentPosition: number = 0;
  message: string = 'Presiona el gatillo si te atreves...';
  disabled: boolean = false;

  // erningsValue: 300 

  constructor(private playerService: PlayerService) {
    this.reloadGun();
  }

  reloadGun() {
    this.chamber = Array(6).fill(false);
    const bulletPosition = Math.floor(Math.random() * 6);
    this.chamber[bulletPosition] = true;
    this.currentPosition = 0;
    this.message = 'Revolver cargado. ¿Listo para jugar?';
    this.disabled = false;
  }

  pullTrigger() {
    if (this.chamber[this.currentPosition]) {
      this.message = '💥 ¡Perdiste! 💀';
      this.disabled = true;
    } else {
      this.message = '😅 Sobreviviste...';
      this.currentPosition++;
      if (this.currentPosition >= 6) {
        this.message = '¡Se acabaron las balas! Recargando...';
        this.disabled = true;
      }
    }
  }
}
