import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button'

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterModule, MatIconModule, MatMenuModule, MatButtonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    isApp: boolean = false;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {

    if (isPlatformBrowser(this.platformId)) {
       
      this.isApp = window.innerWidth < 620;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      this.isApp = window.innerWidth < 620;
    }
  }
}
