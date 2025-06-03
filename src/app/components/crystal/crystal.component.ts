import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IonCard } from '@ionic/angular/standalone';
import { PlayerService } from 'src/app/services/player.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-crystal',
  templateUrl: './crystal.component.html',
  styleUrls: ['./crystal.component.scss'],
  imports: [IonCard, CommonModule],
})
export class CrystalComponent implements OnInit {
  @Input() initState!: boolean;
  @Input() rowId!: number;
  @Input() index!: number;
  @Input() tempered!: boolean;
  @Input() pressable!: boolean;
  @Output() crushedCrystal = new EventEmitter<{
    rowId: number;
    index: number;
    gameover: boolean;
  }>();

  money: number = 0;
  difficulty: 1 | 2 | 3 = 2;
  crystalsWH: string = "100px";

  constructor(private playerService: PlayerService, private settings: SettingsService) {
    this.playerService.player$.subscribe(pj => {
      this.money = pj?.money ?? 0;
    });

    this.settings.difficulty$.subscribe(level => {
      if (level === 1) {
        this.crystalsWH = "100px"
      } else if (level === 3) {
        this.crystalsWH = "60px"
      } else {
        this.crystalsWH = "80px"
      }
    })
  }

  crystalColor = 'rgba(214, 252, 252, 0.568)';

  pressCrystal() {
    if (!this.pressable) { return };
    if (this.tempered) {
      if (this.money) { 
        this.crystalColor = 'rgba(26, 236, 19, 0.57)';
       };
      this.crushedCrystal.emit({ rowId: this.rowId, index: this.index, gameover: false });
    } else {
      if (this.money) { 
        this.crystalColor = 'rgba(236, 19, 19, 0.57)';
       };
      this.crushedCrystal.emit({ rowId: this.rowId, index: this.index, gameover: true });
    }
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initState']) {
      if (changes['initState'].currentValue) {
        this.crystalColor = 'rgba(214, 252, 252, 0.568)'
      }
    } else if (changes['rowId']) {
      console.log(changes['rowId'].currentValue)
    }
  }

}
