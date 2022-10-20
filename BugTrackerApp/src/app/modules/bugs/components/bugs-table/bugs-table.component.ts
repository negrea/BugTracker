import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Bug } from '../../models/bug.model';

@Component({
  selector: 'bugs-table',
  templateUrl: './bugs-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BugsTableComponent {
  @Input() bugs: Bug[];
  @Output() clickBug = new EventEmitter<Bug>();

  onClickBug(bug: Bug) {
    this.clickBug.emit(bug);
  }
}
