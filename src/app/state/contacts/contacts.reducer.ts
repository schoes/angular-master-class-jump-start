import {Contact} from '../../models/contact';
import {ContactsActions, ContactsActionTypes} from './contacts.actions';

export interface ContactsState {
  list: Array<Contact>;
}

const INITIAL_STATE: ContactsState = {
  list: []
};

export function contactsReducer(state: ContactsState = INITIAL_STATE, action: ContactsActions) {
  switch (action.type) {
    case ContactsActionTypes.LOAD_CONTACTS_SUCCESS:
      return {...state, list: state.list.concat(action.payload)};
    default:
      return state;
  }
}
