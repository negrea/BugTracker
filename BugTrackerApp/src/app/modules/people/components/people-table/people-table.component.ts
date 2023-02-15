import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Person } from 'src/app/modules/shared/models/person.model';
@Component({
  selector: 'people-table',
  templateUrl: './people-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleTableComponent {
  @Input() people: Person[];
  @Output() clickPerson = new EventEmitter<Person>();

  onClickPerson(person: Person) {
    this.clickPerson.emit(person);
  }

  // setPeople(people: Person[]) {
  //   this.people = [...people];
  // }
}
