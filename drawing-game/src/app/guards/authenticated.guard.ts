import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {GameService} from "../services/game.service";

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  constructor(
    private gameService: GameService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.gameService.validateSession())
      return true;

    this.router.navigate(['']);
    return true;
  }
}
