import { Person } from '../../shared-people/models/person.model';

export interface PeopleState {
  people: Person[];
  person: Person | null;
  error: string | null;
}
