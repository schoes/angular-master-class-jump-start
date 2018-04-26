import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {UpdateContactAction} from '../state/contacts/contacts.actions';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../state/app.state';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  // we need to initialize since we can't use ?. operator with ngModel
  contact$: Observable<Contact>;

  constructor(private contactsService: ContactsService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.contact$ = this.store.select(state => {
      let id = state.contacts.selectedContactId;
      return state.contacts.list.find(contact => contact.id == id);
    }).pipe(map(contact => ({...contact})));

  }

  cancel(contact: Contact) {
    this.goToDetails(contact);
  }

  save(contact: Contact) {
    this.contactsService.updateContact(contact)
      .subscribe(() => {
        this.store.dispatch(new UpdateContactAction(contact));
        this.goToDetails(contact);
      });
  }

  private goToDetails(contact: Contact) {
    this.router.navigate(['/contact', contact.id]);
  }
}

