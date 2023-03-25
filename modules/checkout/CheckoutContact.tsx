import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

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
  mutation UpdateCartContact(
    $contact: ContactInput
    $billingAddress: AddressInput
  ) {
    updateCart(contact: $contact, billingAddress: $billingAddress) {
      _id
      contact {
        emailAddress
        telNumber
      }
      billingAddress {
        firstName
        lastName
        addressLine
        addressLine2
        postalCode
        city
        regionCode
        countryCode
      }
    }
  }
`;

const CheckoutContact = ({ cart }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const intl = useIntl();
  const [contactEditMode, setContactEditMode] = useState(false);
  const [updateCartContactMutation] = useMutation(UPDATE_CART_CONTACT_MUTATION);
  const [addEmailMutation] = useMutation(ADD_EMAIL_MUTATION);
  const [showLogin, setShowLogin] = useState(false);

  const { formatMessage } = intl;

  useEffect(() => {
    if (!cart.contact?.emailAddress) {
      setContactEditMode(true);
    }
  }, [cart]);

  const contact = { ...(cart.contact || {}) };
  delete contact?.__typename;

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
          billingAddress: {}, // TODO: This repo should support both physical and virtual
        },
      });
      setContactEditMode(false);
      setShowLogin(false);
    } catch (error) {
      if (error.message.includes('duplicate')) setShowLogin(true);
    }
  };

  const enableContactEditMode = () => setContactEditMode(true);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium ">Kontaktdaten</h2>
      {showLogin && (
        <div className="text-red-500">
          E-Mail gehört bereits jemandem, bitte
          <Link href="/log-in" legacyBehavior>
            <a className="inline-flex  items-center justify-center text-center text-sm font-medium leading-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 text-red-700 hover:text-red-500">
              <span className="ml-2">melde dich an</span>
            </a>
          </Link>{' '}
          oder verwende eine andere E-Mail Adresse
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit(updateContact)}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {formatMessage({ id: 'email', defaultMessage: 'E-Mail Address' })}
          </label>
          <div className="mt-1">
            <input
              type="email"
              autoComplete="emailAddress"
              {...register('emailAddress', { required: true })}
              className={classNames(
                'block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-slate-900 dark:bg-slate-300 sm:text-sm',
                {
                  'border-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500':
                    errors.email,
                },
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-600">
                {formatMessage({
                  id: 'error_email',
                  defaultMessage: 'Email is required',
                })}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="telNumber"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {formatMessage({
              id: 'telNumber',
              defaultMessage: 'Mobile Phone',
            })}
          </label>
          <div className="mt-1">
            <input
              type="text"
              autoComplete="telNumber"
              {...register('telNumber', { required: true })}
              className={classNames(
                'block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-slate-900 dark:bg-slate-300 sm:text-sm',
                {
                  'border-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500':
                    errors.telNumber,
                },
              )}
            />
            {errors.telNumber && (
              <p className="text-sm text-red-600">
                {formatMessage({
                  id: 'error_phone_mobile_required',
                  defaultMessage: 'Mobile phone number is required',
                })}
              </p>
            )}
          </div>
        </div>

        {errors.root?.message && (
          <div className="text-red-600">{errors.root.message as string}</div>
        )}

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-slate-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            {formatMessage({ id: 'next', defaultMessage: 'Next' })}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutContact;
