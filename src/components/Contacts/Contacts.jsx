import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  getContactsValue } from 'redux/contactsSlice';
import PropTypes from 'prop-types';
import { getFilterValue } from 'redux/filterSlice';
import { getContactsThunk, deleteContactsThunk } from 'redux/contacts.thunk';
export const Contacts = () => {
  const contacts = useSelector(getContactsValue);
  const filter = useSelector(getFilterValue);
  const dispatch = useDispatch();
  const handleDelete = id => dispatch(deleteContactsThunk(id));
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);
  return (
    <>
      <ul>
        {filterContacts.map(({ name, id, phone }) => {
          return (
            <li key={id}>
              {name}: {phone}
              <button key={id} type="button" onClick={() => handleDelete(id)}>
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};
