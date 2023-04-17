/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useFormik, FormikValues, FormikErrors, FormikTouched } from 'formik';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import clean from '../lib/clean';

type OnSubmitSuccessType = (
  result: boolean,

  values: FormikValues,
) => Promise<boolean> | boolean;

/**
 * @param onSubmitSuccess Return `false` to skip redirect
 */

const useForm = ({
  submit,
  getSubmitErrorMessage = () => '',
  onSubmitSuccess = () => true,
  initialValues,
  initialErrors,
  initialTouched,
  successMessage,
  enableReinitialize,
  validate,
}: {
  submit: (
    variables: Record<string, any>,
  ) => Promise<{ success: boolean; data?: any; errors?: any }>;

  getSubmitErrorMessage?: (error?: Error | any) => Promise<string> | string;
  onSubmitSuccess?: OnSubmitSuccessType;
  initialValues: FormikValues;
  initialTouched?: FormikTouched<FormikValues>;
  initialErrors?: FormikErrors<FormikValues>;
  enableReinitialize?: boolean;
  successMessage?: string;
  validate?: (
    values: FormikValues,
  ) => void | object | Promise<FormikErrors<FormikValues>>;
}) => {
  const intl = useIntl();
  const [submitError, setSubmitError] = useState('');

  const parseError = (error) => {
    if (error) {
      if (
        error &&
        typeof error === 'string' &&
        error?.toLowerCase().includes('email already exists')
      )
        return intl.formatMessage({
          id: 'email_exists_error',
          defaultMessage: 'Email already exists',
        });

      if (
        error &&
        typeof error === 'string' &&
        error?.toLowerCase().includes('permission')
      ) {
        return intl.formatMessage({
          id: 'permission_missing',
          defaultMessage: "You don't have the required permission",
        });
      }

      if (
        error?.message &&
        error?.message?.toLowerCase().includes('email already exists')
      )
        return intl.formatMessage({
          id: 'email_exists_error',
          defaultMessage: 'Email already exists',
        });

      if (
        error?.message &&
        error?.message?.toLowerCase().includes('permission')
      ) {
        return intl.formatMessage({
          id: 'permission_missing',
          defaultMessage: "You don't have the required permission",
        });
      }
    }

    return intl.formatMessage(
      {
        id: 'error_server',
        defaultMessage: '{details}',
      },
      { details: error?.message || '' },
    );
  };

  const onSubmit = async (values) => {
    setSubmitError('');
    try {
      const result = await submit(clean(values));

      const success =
        (typeof result === 'boolean' ? result : result?.success) ??
        !result?.errors?.length;
      if (success) {
        if (successMessage) toast.success(successMessage);
        await onSubmitSuccess(success, result?.data || values);
      } else {
        const errors = typeof result === 'boolean' ? !result : result?.errors;

        if (Array.isArray(errors)) {
          errors.forEach(async (error) => {
            setSubmitError(
              (await getSubmitErrorMessage(error)) || parseError(error),
            );
          });
        } else if (typeof errors === 'string') {
          setSubmitError(
            (await getSubmitErrorMessage(errors)) || parseError(errors),
          );
        } else {
          setSubmitError(
            (await getSubmitErrorMessage(!!errors)) || parseError(!!errors),
          );
        }
      }
    } catch (error) {
      setSubmitError((await getSubmitErrorMessage(error)) || parseError(error));
    }
  };

  const formik = useFormik({
    initialValues,
    initialErrors,
    initialTouched,
    enableReinitialize,
    onSubmit,
    validate,
  });

  return {
    submitError,
    formik,
    setSubmitError,
    disabled: false,
  };
};
export default useForm;
