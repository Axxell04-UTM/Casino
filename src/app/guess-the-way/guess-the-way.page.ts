import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';
import { CrystalComponent } from '../components/crystal/crystal.component';
import { NavComponent } from '../components/nav/nav.component';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-guess-the-way',
  templateUrl: './guess-the-way.page.html',
  styleUrls: ['./guess-the-way.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    CrystalComponent,
    NavComponent,
  ],
})
export class GuessTheWayPage implements OnInit {
  constructor(private playerService: PlayerService) {}

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  initState = true;

  resultMessage: 'Has ganado' | 'Has perdido' | '' = '';
  colorMessage: 'rgb(107, 255, 62)' | 'rgb(247, 97, 97)' | '' = "";

  crystals = [
    {
      rowId: 0,
      pressed: false,
      pressable: true,
      values: [0, 0],
    },
    {
      rowId: 1,
      pressed: false,
      pressable: false,
      values: [0, 0],
    },
    {
      rowId: 2,
      pressed: false,
      pressable: false,
      values: [0, 0],
    },
    {
      rowId: 3,
      pressed: false,
      pressable: false,
      values: [0, 0],
    },
  ].reverse();

  resetGame() {
    this.initState = true;
    this.resultMessage = '';
    this.refreshCrystals();
  }

  refreshCrystals() {
    this.crystals = this.crystals.map((row) => {
      if (this.getRandomInt(0, 1) === 1) {
        row.values = [1, 0];
        row.pressed = false;
        if (row.rowId === 0) {
          row.pressable = true;
        }
        return row;
      } else {
        row.values = [0, 1];
        row.pressed = false;
        if (row.rowId === 0) {
          row.pressable = true;
        }
        return row;
      }
    });
  }

  onCrushedCrystal(event: { rowId: number; index: number; gameover: boolean }) {
    this.initState = false;
    let row = this.crystals.find((row) => row.rowId === event.rowId);
    if (row) {
      row.pressed = true;
      row.pressable = false;
    }
    if (event.gameover) {
      this.resultMessage = 'Has perdido';
      this.colorMessage = "rgb(247, 97, 97)";
      this.playerService.updateMoney("lost", 10);
    } else if (row) {
      if (row.rowId + 1 <= 3) {
        let newRow = this.crystals.find((r) => r.rowId === row.rowId + 1);
        if (newRow) {
          newRow.pressable = true;
        }
      } else {
        this.resultMessage = 'Has ganado';
        this.colorMessage = "rgb(107, 255, 62)";
        this.playerService.updateMoney("earning", 1000);
      }
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.resetGame();
  }
}
