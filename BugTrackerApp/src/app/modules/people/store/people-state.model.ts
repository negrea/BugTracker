import { Person } from '../../shared/models/person.model';

export interface PeopleState {
  people: Person[];
  person: Person | null;
  error: string | null;
}
