import {  createSelector, createSlice } from '@reduxjs/toolkit';

import {
  getContactsThunk,
  deleteContactsThunk,
  addContactsThunk,
} from './contacts.thunk';
import { setFilterValue } from './filterSlice';
// import { setFilterValue } from './filterSlice';

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,

  extraReducers: {
    [getContactsThunk.pending]: handlePending,
    [getContactsThunk.rejected]: handleRejected,
    [deleteContactsThunk.pending]: handlePending,
    [deleteContactsThunk.rejected]: handleRejected,
    [addContactsThunk.pending]: handlePending,
    [addContactsThunk.rejected]: handleRejected,

    [addContactsThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.items.push(payload);
    },

    [deleteContactsThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.items = state.items.filter(contact => contact.id !== payload.id);
    },

    [getContactsThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.items = payload;
    },
  },
});

export const { deleteContact, addContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

export const setContactsValue = state => state.contacts.items;
export const setIsLoading = state => state.contacts.isLoading;
export const setfilterContacts = createSelector(
  [setContactsValue, setFilterValue],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);



