import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '../models/person.model';

@Pipe({ name: 'personFullName' })
export class PersonFullNamePipe implements PipeTransform {
  transform(person: Person): string {
    return `${person.firstName} ${person.lastName}`;
  }
}
