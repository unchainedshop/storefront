import { useState } from 'react';
import Link from 'next/link';

import { useIntl } from 'react-intl';
import ContactForm from './ContactForm';
import ContactPanel from './ContactPanel';
import useAddEmail from '../cart/hooks/useAddEmail';
import useUpdateCartContact from '../cart/hooks/useUpdateCartContact';

const CheckoutContact = ({ cart, isInitial }) => {
  const { updateCartContact } = useUpdateCartContact();
  const [editMode, setEditMode] = useState(isInitial);
  const { addEmail } = useAddEmail();
  const [showLogin, setShowLogin] = useState(false);
  const { formatMessage } = useIntl();

  const updateContact = async (contactInfo) => {
    try {
      await addEmail({
        email: contactInfo.emailAddress,
      });

      await updateCartContact({
        contact: contactInfo,
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
      <h2 className="text-lg font-medium ">
        {formatMessage({
          id: 'contact-info',
          defaultMessage: 'Contact info',
        })}
      </h2>
      {showLogin && editMode && (
        <div className="text-red-500">
          {formatMessage({
            id: 'email-not-available',
            defaultMessage: 'E-Mail address is not available, please',
          })}
          <Link
            href="/login"
            className="inline-flex  items-center justify-center text-center text-sm font-medium leading-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 text-red-700 hover:text-red-500"
          >
            <span className="ml-2">
              {formatMessage({
                id: 'sign-in',
                defaultMessage: 'Sign in',
              })}
            </span>
          </Link>{' '}
          {formatMessage({
            id: 'or-choose-another',
            defaultMessage: 'or choose another one',
          })}
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
