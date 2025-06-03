import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRadio, IonRadioGroup } from '@ionic/angular/standalone';
import { NavComponent } from "../components/nav/nav.component";
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonRadioGroup, IonRadio, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavComponent]
})
export class SettingsPage implements OnInit {
  difficulty: 1 | 2 | 3 = 2;

  constructor(private settings: SettingsService) {
    this.settings.difficulty$.subscribe(level => {
      this.difficulty = level ?? 2;
    })
   }

  ngOnInit() {
  }

  changeDifficulty(event: 1 | 2 | 3) {
    this.settings.setDifficulty(event);
  }

}
