import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { User } from "../interfaces/user.interface";

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private storage: StorageService) {}

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
        return true;
    }

    isLogged(session: string): boolean {
        const res = this.storage.get(session);
        if (res) {
            const user: User = JSON.parse(res) as User;
            return user.logged;
        }
        return false;
    }

}