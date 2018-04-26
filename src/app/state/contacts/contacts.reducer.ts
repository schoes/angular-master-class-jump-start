import {Contact} from '../../models/contact';
import {ContactsActions, ContactsActionTypes} from './contacts.actions';
import {ApplicationState} from '../app.state';
import {createSelector} from '@ngrx/store';

export interface ContactsState {
  list: Array<Contact>;
  selectedContactId: string;
  loaded: boolean;
}

const INITIAL_STATE: ContactsState = {
  list: [],
  selectedContactId: '',
  loaded: false
};

export function contactsReducer(state: ContactsState = INITIAL_STATE, action: ContactsActions): ContactsState {
  switch (action.type) {
    case ContactsActionTypes.LOAD_CONTACTS_SUCCESS:
      return {...state, loaded: true, list: action.payload};
    case ContactsActionTypes.SELECT_CONTACT:
      return {...state, selectedContactId: action.payload};
    case ContactsActionTypes.UPDATE_CONTACT:
      let updatedList = state.list.map(contact => {
        return contact.id == action.payload.id
          ? {...contact, ...action.payload}
          : contact;
      });
      return {...state, list: updatedList};
    case ContactsActionTypes.ADD_CONTACT:
      let inStore = state.list.find(contact => contact.id == action.payload.id);
      return {
        ...state,
        list: !inStore ? [...state.list, action.payload] :
          state.list
      };

    default:
      return state;
  }
}

export namespace ContactsQuery {
  export const getContacts = (state: ApplicationState): Array<Contact> => state.contacts.list;
  export const getLoaded = (state: ApplicationState): boolean => state.contacts.loaded;
  export const getSelectedContactId = (state: ApplicationState): string => state.contacts.selectedContactId;
  export const getSelectedContact = createSelector(
    getContacts,
    getSelectedContactId,
    (contacts, id) => {
      let contact = contacts.find(contact => contact.id == id);
      return contact ? contact : undefined;
    }
  );
}
