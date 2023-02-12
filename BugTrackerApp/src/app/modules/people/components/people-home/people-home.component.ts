import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormMode } from 'src/app/modules/shared-forms/models/form-mode.model';
import { FormResult } from 'src/app/modules/shared-forms/models/form-result.model';
import { Person } from 'src/app/modules/shared-people/models/person.model';
import {
  createPerson,
  getPeople,
  setPerson,
  updatePerson,
} from '../../store/people.actions';
import {
  selectError,
  selectPeople,
  selectPerson,
} from '../../store/people.selectors';
import { PersonFormComponent } from '../person-form/person-form.component';

@Component({
  selector: 'people-home',
  templateUrl: './people-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleHomeComponent implements OnInit, AfterViewInit {
  @ViewChild('personForm') personForm: TemplateRef<PersonFormComponent>;

  personFormModal: NgbModalRef;

  people$: Observable<Person[]>;
  person$: Observable<Person>;
  error$: Observable<string>;

  constructor(private store: Store, private modalService: NgbModal) {
    this.people$ = this.store.select(selectPeople);
    this.person$ = this.store.select(selectPerson);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(getPeople());
  }

  ngAfterViewInit() {
    debugger;
  }

  onAddPerson() {
    this.store.dispatch(setPerson({ person: null }));

    this.personFormModal = this.modalService.open(this.personForm);
  }

  onClickPerson(person: Person) {
    this.store.dispatch(setPerson({ person }));

    this.personFormModal = this.modalService.open(this.personForm);
  }

  onSubmitPersonForm(result: FormResult<Person>) {
    if (result.mode == FormMode.Create) {
      this.store.dispatch(createPerson({ person: result.value }));
    } else {
      this.store.dispatch(updatePerson({ person: result.value }));
    }
    this.personFormModal.close();
  }

  onClosePersonForm() {
    this.personFormModal.close();
  }
}
