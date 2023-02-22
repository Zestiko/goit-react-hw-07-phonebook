import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setContactsValue,
  setIsLoading,
} from 'redux/contactsSlice';
import PropTypes from 'prop-types';
import { setFilterValue } from 'redux/filterSlice';
import { getContactsThunk, deleteContactsThunk } from 'redux/contacts.thunk';


import { BallTriangle } from 'react-loader-spinner';
export const Contacts = () => {
  const contacts = useSelector(setContactsValue);
  const filter = useSelector(setFilterValue);
  const contactLoading = useSelector(setIsLoading);
  const dispatch = useDispatch();
  // const filterContacts = setfilterContacts();
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
        {contactLoading ? (
          <div className="loader">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
          </div>
        ) : (
          filterContacts.map(({ name, id, phone }) => {
            return (
              <li key={id}>
                {name}: {phone}
                <button key={id} type="button" onClick={() => handleDelete(id)}>
                  delete
                </button>
              </li>
            );
          })
        )}
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
