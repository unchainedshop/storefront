import Link from 'next/link';
import { useIntl } from 'react-intl';

const AssortmentBreadcrumbs = ({ paths = [], currentAssortment }) => {
  const { formatMessage } = useIntl();
  return (
    <nav className="mt-2 mb-6 border-b border-color-grey-lightest pb-4 dark:text-slate-300">
      <Link href="/">
        <a className="mr-2 text-sm after:ml-4 after:inline-block after:h-2.5 after:w-2.5 after:text-sm after:content-['〉'] after:last-of-type:content-['']">
          {formatMessage({ id: 'home', defaultMessage: 'Home' })}
        </a>
      </Link>
      <Link href="/shop">
        <a className="mr-2 text-sm after:ml-4 after:inline-block after:h-2.5 after:w-2.5 after:text-sm after:content-['〉'] after:last-of-type:content-['']">
          {formatMessage({ id: 'shop', defaultMessage: 'Shop' })}
        </a>
      </Link>
      {paths?.map(({ id, slug, title }) => (
        <Link href={`/${slug}`} as={`/${slug}`} key={id}>
          <a className="mr-2 text-sm after:ml-4 after:inline-block after:h-2.5 after:w-2.5 after:text-sm after:content-['〉'] after:last-of-type:content-['']">
            {title}
          </a>
        </Link>
      ))}
      <a className="text-sm after:ml-4 after:inline-block after:h-2.5 after:w-2.5 after:text-sm after:content-['〉'] after:last-of-type:content-['']">
        <b>{currentAssortment?.title}</b>
      </a>
    </nav>
  );
};

export default AssortmentBreadcrumbs;
