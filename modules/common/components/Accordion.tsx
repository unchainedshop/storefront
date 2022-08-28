import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { useState } from 'react';

const Accordion = ({
  data = [],
  containerCSS = '',
  headerCSS = '',
  bodyCSS = '',
  itemContainerCSS = '',
}) => {
  return (
    <div className={classNames('my-3', containerCSS)}>
      {data.map(({ header, body }, key) => (
        <AccordionItem
          header={header}
          body={body}
          // eslint-disable-next-line react/no-array-index-key
          key={key}
          headerCSS={headerCSS}
          bodyCSS={bodyCSS}
          itemContainerCSS={itemContainerCSS}
        />
      ))}
    </div>
  );
};

const AccordionItem = ({
  header,
  body,
  headerCSS,
  bodyCSS,
  itemContainerCSS,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className={classNames('mt-3', itemContainerCSS)}>
      <button
        type="button"
        onClick={() => setShow(!show)}
        className={classNames(
          'relative w-full cursor-pointer border bg-white text-slate-500 hover:bg-slate-50 dark:bg-slate-600 dark:text-white dark:hover:bg-slate-500',
          headerCSS,
        )}
      >
        <div className="w-full">{header}</div>
        <span className="px-2">
          {show ? (
            <ChevronUpIcon
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
            />
          ) : (
            <ChevronDownIcon
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
            />
          )}
        </span>
      </button>

      {show ? (
        <div
          className={classNames(
            'rounded-lg p-0 text-slate-400 dark:text-white ',
            bodyCSS,
          )}
        >
          {body}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Accordion;
