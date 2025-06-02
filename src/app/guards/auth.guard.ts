import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { StorageService } from "../services/storage.service";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private storage: StorageService, private authService: AuthService) {}

    canActivate(): boolean {
        let autenticated = false;
        const res = this.storage.get('session');
        if (res) {
            autenticated = this.authService.isLogged(res);
        }
        if (!autenticated) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}