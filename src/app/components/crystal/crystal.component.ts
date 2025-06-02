import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IonCard } from '@ionic/angular/standalone';
import { PlayerService } from 'src/app/services/player.service';

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

  constructor(private playerService: PlayerService) {
    this.playerService.player$.subscribe(pj => {
      this.money = pj?.money ?? 0;
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
