import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {ApplicationState} from './state/app.state';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {AddContactAction, SelectContactAction} from './state/contacts/contacts.actions';
import {Contact} from './models/contact';
import 'rxjs/add/observable/of';
import {ContactsService} from './contacts.service';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ContactExistsGuard implements CanActivate {

  constructor(private store: Store<ApplicationState>, private contactService: ContactsService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const resolveOrAddContactToList = (loaded: boolean) => {

      let addContactToList = (contact: Contact) => {
        this.store.dispatch(new AddContactAction(contact));
      };

      return loaded ? of(true) : this.contactService
        .getContact(contactId).pipe(
          tap(addContactToList),
          map(contact => !!contact)
        );
    };

    let contactId = next.paramMap.get('id');
    this.store.dispatch(new SelectContactAction('' + contactId));

    return this.store.select(state => state.contacts.loaded)
      .pipe(
        take(1),
        switchMap(resolveOrAddContactToList)
      );
  }


}
