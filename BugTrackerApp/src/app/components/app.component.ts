import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  active = 1;

  ngOnInit() {
    let activeNavId = sessionStorage.getItem('activeNavId');
    if (activeNavId) {
      this.active = Number(activeNavId);
    }
  }

  onActiveIdChange(activeNavId: number) {
    sessionStorage.setItem('activeNavId', activeNavId.toString());
  }
}
