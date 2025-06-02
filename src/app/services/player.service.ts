import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "../interfaces/user.interface";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: "root" })
export class PlayerService {
    private _player = new BehaviorSubject<User | null>(null);
    player$ = this._player.asObservable();

    constructor(private storage: StorageService) {

    }

    setPlayer(player: User) {
        this._player.next(player);
    }

    updateMoney(type: "earning" | "lost", value: number) {
        let pj = this._player.value;
        if (!pj) { return }

        let newMoney = type === "earning" ? pj.money + value : pj.money - value;

        pj = {
            ...pj,
            money: newMoney
        }
        this.setPlayer(pj);
        this.storage.set(pj.name, JSON.stringify(pj));
    }

    getPlayer() {
        return this._player.value;
    }

    getDebts() {
        return this._player.value?.debts;
    }

    payDebt(index: number) {
        let pj = this._player.value;
        if (!pj) { return null };
        
        const debt = pj.debts[index];
        console.log(debt);

        if (!debt) { return null };

        if (debt > pj.money) { return false } ;

        pj = {
            ...pj,
            debts: pj.debts.filter((_, i) => i !== index),
            money: pj.money - debt
        }
        this.setPlayer(pj);
        this.storage.set(pj.name, JSON.stringify(pj));
        return true;
    }

    makeLoan(value: number) {
        let pj = this._player.value;
        if (!pj) { return null };

        pj = {
            ...pj,
            debts: [...pj.debts, value],
            money: pj.money + value
        }
        this.setPlayer(pj);
        this.storage.set(pj.name, JSON.stringify(pj));
        return true;
    }

}