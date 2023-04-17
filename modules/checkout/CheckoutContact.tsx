import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';

import ContactForm from './ContactForm';
import ContactPanel from './ContactPanel';

export const ADD_EMAIL_MUTATION = gql`
  mutation AddEmail($email: String!) {
    addEmail(email: $email) {
      _id
      name
      primaryEmail {
        address
        verified
      }
      emails {
        address
        verified
      }
    }
  }
`;

export const UPDATE_CART_CONTACT_MUTATION = gql`
  mutation UpdateCartContact($contact: ContactInput) {
    updateCart(contact: $contact) {
      _id
      contact {
        emailAddress
        telNumber
      }
    }
  }
`;

const CheckoutContact = ({ cart, isInitial }) => {
  const [updateCartContactMutation] = useMutation(UPDATE_CART_CONTACT_MUTATION);
  const [editMode, setEditMode] = useState(isInitial);
  const [addEmailMutation] = useMutation(ADD_EMAIL_MUTATION);
  const [showLogin, setShowLogin] = useState(false);

  const updateContact = async (contactInfo) => {
    try {
      await addEmailMutation({
        variables: {
          email: contactInfo.emailAddress,
        },
      });

      await updateCartContactMutation({
        variables: {
          contact: contactInfo,
        },
      });
      setShowLogin(false);
      setEditMode(false);
    } catch (error) {
      if ((error as any)?.message.includes('duplicate')) setShowLogin(true);
      throw error;
    }
  };

  const contact = { ...(cart.contact || {}) };
  delete contact?.__typename;

  const toggleEditMode = () => setEditMode(!editMode);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium ">Contact Data</h2>
      {showLogin && editMode && (
        <div className="text-red-500">
          E-Mail address is not available, please
          <Link href="/log-in" legacyBehavior>
            <a className="inline-flex  items-center justify-center text-center text-sm font-medium leading-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 text-red-700 hover:text-red-500">
              <span className="ml-2">sign in</span>
            </a>
          </Link>{' '}
          or choose another one
        </div>
      )}
      {editMode ? (
        <ContactForm
          contact={contact}
          onSubmit={updateContact}
          onCancel={toggleEditMode}
        />
      ) : (
        <ContactPanel contact={contact} onEdit={toggleEditMode} />
      )}
    </div>
  );
};

export default CheckoutContact;
