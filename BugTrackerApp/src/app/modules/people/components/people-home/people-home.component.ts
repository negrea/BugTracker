import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FormMode } from 'src/app/modules/shared/models/form-mode.model';
import { FormResult } from 'src/app/modules/shared/models/form-result.model';
import { Person } from 'src/app/modules/shared/models/person.model';
import { PeopleService } from '../../services/people.service';
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
import { PeopleTableComponent } from '../people-table/people-table.component';
import { PersonFormComponent } from '../person-form/person-form.component';

@Component({
  selector: 'people-home',
  templateUrl: './people-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class PeopleHomeComponent implements OnInit, AfterViewInit, OnDestroy {
export class PeopleHomeComponent implements OnInit, OnDestroy {
  @ViewChild('personForm') private personForm: TemplateRef<PersonFormComponent>;
  // @ViewChild(PeopleTableComponent)
  // private peopleTableComponent: PeopleTableComponent;
  private personFormModal: NgbModalRef;
  private subscription: Subscription = new Subscription();

  people$: Observable<Person[]>;
  person$: Observable<Person>;
  error$: Observable<string>;

  constructor(private store: Store, private _modalService: NgbModal) {
    this.people$ = this.store.select(selectPeople);
    this.person$ = this.store.select(selectPerson);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(getPeople());
  }

  // ngAfterViewInit() {
  //   this.subscription.add(
  //     this.people$.subscribe((people) => {
  //       this.peopleTableComponent.setPeople(people);
  //     })
  //   );
  // }

  onAddPerson() {
    this.store.dispatch(setPerson({ person: null }));

    this.personFormModal = this._modalService.open(this.personForm);
  }

  onClickPerson(person: Person) {
    this.store.dispatch(setPerson({ person }));

    this.personFormModal = this._modalService.open(this.personForm);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
