import Link from 'next/link';
import { useIntl } from 'react-intl';

const AssortmentBreadcrumbs = ({ paths = [], currentAssortment }) => {
  const { formatMessage } = useIntl();
  return (
    <nav className="border-bottom mt-2 mb-6 pb-4">
      <Link href="/">
        <a className="breadcrumb-link mr-2">
          {formatMessage({ id: 'home', defaultMessage: 'Home' })}
        </a>
      </Link>
      <Link href="/shop">
        <a className="breadcrumb-link mr-2">
          {formatMessage({ id: 'shop', defaultMessage: 'Shop' })}
        </a>
      </Link>
      {paths?.map(({ id, slug, title }) => (
        <Link href={`/${slug}`} as={`/${slug}`} key={id}>
          <a className="breadcrumb-link marker:breadcrumb-link mr-2">{title}</a>
        </Link>
      ))}
      <a className="breadcrumb-link">
        <b>{currentAssortment?.title}</b>
      </a>
      <style jsx>
        {`
          .breadcrumb-link {
            font-size: 0.875rem;
          }
          .breadcrumb-link::after {
            content: '〉';
            font-size: 12px;
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-left: 1em;
          }
          .breadcrumb-link:last-of-type::after {
            content: '';
          }
        `}
      </style>
    </nav>
  );
};

export default AssortmentBreadcrumbs;
