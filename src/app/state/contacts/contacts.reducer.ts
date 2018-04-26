import {Contact} from '../../models/contact';
import {ContactsActions, ContactsActionTypes} from './contacts.actions';

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
      return {...state, list: action.payload};
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
