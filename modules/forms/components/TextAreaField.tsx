import classnames from 'classnames';

import { useIntl } from 'react-intl';
import { EyeIcon, PencilIcon } from '@heroicons/react/24/solid';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { validateMaxLength } from '../lib/validators';
import useField, { FieldHookProps } from '../hooks/useField';
import FieldWrapper from './FieldWrapper';
import Tab from '../../common/components/Tab';

const GetCurrentTab = ({ selectedView = 'edit', ...field }) => {
  if (selectedView === 'preview') {
    return (
      <ReactMarkdown
        className=" prose  dark:prose-invert"
        // eslint-disable-next-line react/no-children-prop
        children={field.value}
        rehypePlugins={[rehypeRaw, remarkGfm, rehypeSanitize]}
      />
    );
  }
  return (
    <textarea
      className={classnames(
        'relative mt-1 block w-full dark:focus:autofill dark:hover:autofill dark:autofill dark:placeholder:text-white dark:bg-slate-900 dark:text-slate-200 appearance-none rounded-md border-2 border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400',
        field.className,
        {
          'border-2 border-red-300 placeholder:text-red-300': !!field.error,
        },
      )}
      disabled={field.disabled}
      id={field.name}
      name={field.name}
      rows={field.rows}
      onChange={field.onChange}
      onBlur={field.onBlur}
      placeholder={field.placeholder}
      autoComplete={field.autoComplete}
      value={field.value}
    />
  );
};
interface TextAreaFieldProps extends FieldHookProps {
  autoComplete?: 'on' | 'off';
  rows?: number;
}

const TextAreaField = ({
  maxLength,
  validators = [],

  ...props
}: TextAreaFieldProps) => {
  const { formatMessage } = useIntl();
  const field = useField({
    validators: [...validators, maxLength && validateMaxLength(maxLength)],
    ...props,
  });

  const TextAreaStates = [
    {
      id: 'editor',
      title: formatMessage({
        id: 'editor',
        defaultMessage: 'Editor',
      }),
      Icon: <PencilIcon className="h-4 w-5" />,
    },

    {
      id: 'preview',
      title: formatMessage({
        id: 'preview',
        defaultMessage: 'preview',
      }),
      Icon: <EyeIcon className="h-4 w-5" />,
    },
  ];

  return (
    <FieldWrapper {...field}>
      <Tab tabItems={TextAreaStates} defaultTab="editor">
        <GetCurrentTab {...field} />
      </Tab>
    </FieldWrapper>
  );
};

TextAreaField.defaultProps = {
  autoComplete: 'off',
  rows: 10,
};

export default TextAreaField;
