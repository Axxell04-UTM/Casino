import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonIcon } from "@ionic/angular/standalone";
import { AuthService } from 'src/app/services/auth.service';
import { PlayerService } from 'src/app/services/player.service';
import { addIcons } from 'ionicons';
import { cash, personCircle } from 'ionicons/icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  imports: [IonIcon, 
    IonButton,
    RouterLink,
    CommonModule
  ]
})
export class NavComponent  implements OnInit {
  @Input() type!: "home" | "game";

  playerName: string | undefined;
  playerMoney: number | undefined;

  constructor(private player: PlayerService, private authService: AuthService) {
    this.player.player$.subscribe(pj => {
      this.playerName = pj?.name;
      this.playerMoney = pj?.money;
    })

    addIcons({ personCircle, cash });

   }

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }

}
