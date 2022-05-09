import Link from 'next/link';
import { useIntl } from 'react-intl';

const AssortmentBreadcrumbs = ({ paths = [], currentAssortment }) => {
  const { formatMessage } = useIntl();
  return (
    <nav className="border-b dark:text-slate-300 border-color-grey-lightest mt-2 mb-6 pb-4">
      <Link href="/">
        <a className="text-sm after:content-['〉'] after:text-sm after:inline-block after:w-2.5 after:h-2.5 after:ml-4 after:last-of-type:content-[''] mr-2">
          {formatMessage({ id: 'home', defaultMessage: 'Home' })}
        </a>
      </Link>
      <Link href="/shop">
        <a className="text-sm after:content-['〉'] after:text-sm after:inline-block after:w-2.5 after:h-2.5 after:ml-4 after:last-of-type:content-[''] mr-2">
          {formatMessage({ id: 'shop', defaultMessage: 'Shop' })}
        </a>
      </Link>
      {paths?.map(({ id, slug, title }) => (
        <Link href={`/${slug}`} as={`/${slug}`} key={id}>
          <a className="text-sm after:content-['〉'] after:text-sm after:inline-block after:w-2.5 after:h-2.5 after:ml-4 after:last-of-type:content-[''] mr-2">{title}</a>
        </Link>
      ))}
      <a className="text-sm after:content-['〉'] after:text-sm after:inline-block after:w-2.5 after:h-2.5 after:ml-4 after:last-of-type:content-['']">
        <b>{currentAssortment?.title}</b>
      </a>
    </nav>
  );
};

export default AssortmentBreadcrumbs;
