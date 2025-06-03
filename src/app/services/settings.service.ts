import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: "root" })
export class SettingsService {
    private _difficulty = new BehaviorSubject<1 | 2 | 3 | null>(null);
    difficulty$ = this._difficulty.asObservable();
    constructor(private storage: StorageService) {
        
    }

    setDifficulty(level: 1 | 2 | 3) {
        this._difficulty.next(level);
        this.storage.set('difficulty', JSON.stringify(level));
    }

    getDifficulty() {
        return this._difficulty.value;
    }

}