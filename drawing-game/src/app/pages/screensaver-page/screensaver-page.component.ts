import { Component, OnInit, HostListener } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-screensaver-page',
  templateUrl: './screensaver-page.component.html',
  styleUrls: ['./screensaver-page.component.scss']
})
export class ScreensaverPageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  @HostListener('document:keypress', ['$event'])
  private goToHome(event: KeyboardEvent): void {
    this.router.navigate(['']);
  }

}
