import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { navData } from './navData';
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

interface SidenavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'sideMenu',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '500ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidenavComponent {
  @Output() OnToggleSideNav: EventEmitter<SidenavToggle> = new EventEmitter();

  @HostListener('window:resize', ['event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapse = false;
      this.OnToggleSideNav.emit({
        collapsed: this.collapse,
        screenWidth: this.screenWidth,
      });
    }
    if (this.screenWidth > 768) {
      this.collapse = true;
      this.OnToggleSideNav.emit({
        collapsed: this.collapse,
        screenWidth: this.screenWidth,
      });
    }
  }

  collapse: boolean = false;
  screenWidth: number = 0;
  navData = navData;

  ngOnInit() {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
    this.OnToggleSideNav.emit({
      collapsed: this.collapse,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav() {
    this.collapse = false;
    this.OnToggleSideNav.emit({
      collapsed: this.collapse,
      screenWidth: this.screenWidth,
    });
  }
}
