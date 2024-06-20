import { Component } from '@angular/core';

interface SidenavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'custom_sideBar';
  sideNavCollapse: boolean = false;
  screenWidth!: number;
  toggleSideBar(data: SidenavToggle) {
    this.sideNavCollapse = data.collapsed;
    this.screenWidth = data.screenWidth;
  }
}
