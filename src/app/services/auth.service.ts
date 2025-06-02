import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { User } from "../interfaces/user.interface";
import { PlayerService } from "./player.service";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private storage: StorageService, private playerService: PlayerService, private router: Router) {}

    register(user: User) {
        this.storage.set(user.name, JSON.stringify(user));
    }

    login(username: string, password: string): boolean | null {
        const res = this.storage.get(username);
        if (!res) { return null };

        let user = JSON.parse(res) as User;
        if (user.password !== password) {
            return false
        }
        user.logged = true;
        this.storage.set(user.name, JSON.stringify(user));
        this.storage.set('session', user.name);

        //Inicializando el Jugador
        this.playerService.setPlayer(user);

        return true;
    }

    isLogged(session: string): boolean {
        const res = this.storage.get(session);
        if (res) {
            const user: User = JSON.parse(res) as User;
            if (!this.playerService.getPlayer()) {
                this.playerService.setPlayer(user);
            }
            return user.logged;
        }
        return false;
    }

    logout() {
        const res = this.storage.get('session');
        if (res) {
            const resUser = this.storage.get(res);
            if (resUser) {
                let user: User = JSON.parse(resUser) as User;
                user.logged = false;
                this.storage.set(user.name, JSON.stringify(user));
                this.storage.remove('session');
                this.router.navigate(['/login']);
            }
        }
    }

}