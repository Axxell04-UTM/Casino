import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class RankingService {
  constructor(private storage: StorageService) {}

  isUser(obj: any): obj is User {
    return (
      obj &&
      typeof obj.name === 'string' &&
      typeof obj.password === 'string' &&
      typeof obj.money === 'number' &&
      typeof obj.logged === 'boolean' &&
      Array.isArray(obj.debts)
    );
  }

  getRanking() {
    let users: User[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (value) {
          try {
            const parsed = JSON.parse(value);
            if (this.isUser(parsed)) {
              users.push(parsed);
            }
          } catch (e) {}
        }
      }
    }
    let ranking = users.map(user => {
        user.money = user.money - user.debts.reduce((pv, cv) => pv + cv, 0);
        return user;
    })

    ranking = ranking.sort((a, b) => b.money - a.money );
    return ranking;
  }
}
