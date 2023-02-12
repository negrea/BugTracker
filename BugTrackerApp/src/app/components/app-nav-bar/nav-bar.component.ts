import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  activeId = 1;

  ngOnInit() {
    let activeId = sessionStorage.getItem('activeNavId');
    if (activeId) {
      this.activeId = Number(activeId);
    }
  }

  onActiveIdChange(activeId: number) {
    sessionStorage.setItem('activeNavId', activeId.toString());
  }
}
