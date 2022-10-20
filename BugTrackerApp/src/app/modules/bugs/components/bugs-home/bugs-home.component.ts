import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BugForm } from '../../models/bug-form.model';
import { Bug } from '../../models/bug.model';
import { FormMode } from '../../../shared-forms/models/form-mode.model';
import {
  clearError,
  createBug,
  init,
  setBug,
  updateBug,
} from '../../store/bugs.actions';
import {
  selectBug,
  selectBugs,
  selectError,
  selectPeople,
} from '../../store/bugs.selectors';
import { FormResult } from 'src/app/modules/shared-forms/models/form-result.model';
import { Person } from 'src/app/modules/shared-people/models/person.model';

@Component({
  selector: 'bugs-home',
  templateUrl: './bugs-home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BugsHomeComponent implements OnInit {
  @ViewChild('bugForm') bugForm: TemplateRef<any>;
  bugFormModal: NgbModalRef;

  people$: Observable<Person[]>;
  bugs$: Observable<Bug[]>;
  bug$: Observable<Bug>;
  error$: Observable<string>;

  constructor(private store: Store, private _modalService: NgbModal) {
    this.people$ = this.store.select(selectPeople);
    this.bugs$ = this.store.select(selectBugs);
    this.bug$ = this.store.select(selectBug);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(init());
  }

  onAddBug() {
    this.store.dispatch(setBug({ bug: null }));
    this.bugFormModal = this._modalService.open(this.bugForm);
  }

  onClickBug(bug: Bug) {
    this.store.dispatch(setBug({ bug }));
    this.bugFormModal = this._modalService.open(this.bugForm);
  }

  onSubmitBugForm(result: FormResult<BugForm>) {
    if (result.mode == FormMode.Create) {
      this.store.dispatch(createBug({ bug: result.value }));
    } else {
      this.store.dispatch(updateBug({ bug: result.value }));
    }
    this.bugFormModal.close();
  }

  onCloseBugForm() {
    this.bugFormModal.close();
  }
}
