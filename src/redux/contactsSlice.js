import { createSlice } from '@reduxjs/toolkit';
import {
  getContactsThunk,
  deleteContactsThunk,
  addContactsThunk,
} from './contacts.thunk';

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,

  extraReducers: {
    [getContactsThunk.pending]: state => {
      state.isLoading = true;
    },
    [getContactsThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.items = payload;
    },
    [getContactsThunk.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [deleteContactsThunk.pending]: state => {
      state.isLoading = true;
    },
    [deleteContactsThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.items = state.items.filter(contact => contact.id !== payload.id);
    },
    [deleteContactsThunk.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [addContactsThunk.pending]: state => {
      state.isLoading = true;
    },
    [addContactsThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.items.push(payload);
    },
    [addContactsThunk.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { deleteContact, addContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

export const getContactsValue = state => state.contacts.items;
