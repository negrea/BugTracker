import { Person } from '../../shared/models/person.model';
import { Bug } from '../models/bug.model';

export interface BugsState {
  bugs: Bug[];
  bug: Bug | null;
  people: Person[];
  error: string | null;
}
