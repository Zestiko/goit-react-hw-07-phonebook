import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { addContact, getContactsValue } from 'redux/contactsSlice';
import { useSelector, useDispatch } from 'react-redux';

export const Form = () => {
  const [name, setName] = useState('');
  const [number, setnumber] = useState('');
  const contacts = useSelector(getContactsValue);

  const dispatch = useDispatch();
  const createContact = ({ name, number }) => ({
    id: nanoid(),
    name,
    number,
  });

  const addContactToState = contact => dispatch(addContact(contact));

  const handelChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setnumber(value);
        break;
      default:
        return;
    }
  };
  const reset = () => {
    setName('');
    setnumber('');
  };

  const handelSubmit = e => {
    e.preventDefault();
    const includeName = contacts.find(user => user.name === name);
    if (includeName) {
      alert(`${name} is already in contacs`);
    } else {
      addContactToState(createContact({ name, number }));
      reset();
    }
  };
  const inputNameId = nanoid();
  const inputTelId = nanoid();
  return (
    <form onSubmit={handelSubmit}>
      <label htmlFor={inputNameId}>
        Name
        <input
          id={inputNameId}
          onChange={handelChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label htmlFor={inputTelId}>
        Number
        <input
          id={inputTelId}
          onChange={handelChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add contac</button>
    </form>
  );
};

Form.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};
