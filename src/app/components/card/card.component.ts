import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { IonCard, IonCardTitle, IonIcon, } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { close, diamond, help } from 'ionicons/icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [
    IonCard, IonCardTitle, IonIcon, CommonModule
  ]
})
export class CardComponent  implements OnInit {
  @Input() status!: boolean | undefined;
  @Input() index!: number | undefined;
  @Input() revealed!: boolean | undefined;
  @Input() winningIndex!: number | undefined;
  @Output() cardClicked = new EventEmitter<number>();
  constructor() { 
    addIcons({help,close,diamond});

  }

  pressCard (index: number) {
    this.cardClicked.emit(index);
  }

  verifyStatus() {
    if (this.index === this.winningIndex) {
      this.status = true
    } else {
      this.status = false;
    }
  }

  resetStatus() {
    this.status = undefined;
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['revealed']) {
      if (changes['revealed'].currentValue === true) {
        this.verifyStatus();
      } else {
        this.resetStatus();
      }
    }
  }

}
