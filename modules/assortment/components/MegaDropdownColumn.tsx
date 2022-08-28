import React from 'react';
import Link from 'next/link';
import getConfig from 'next/config';

import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { HomeIcon } from '@heroicons/react/solid';
import { useDesktopNavigationContext } from './DesktopNavigationContext';
import Thumbnail from '../../common/components/thumbnail';

export type Node = {
  slug: string;
  children: any[];
  path: string[];
  navigationTitle: string;
  type: 'default' | 'show_all';
  media: any[];
};

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const MegaDropdownItem = ({
  slug,
  children,
  navigationTitle,
  type,
  path,
  media = [],
}: Node) => {
  const intl = useIntl();
  const { setHoverPath, hoverPath, isTouching } = useDesktopNavigationContext();
  const handleClick = () => {
    if (type === 'default' && isTouching && children) {
      setHoverPath(path);
    } else {
      setHoverPath([]);
    }
  };

  const handleMouseEnter = () => {
    setHoverPath(path);
  };

  const handleTouchStart = () => {
    setHoverPath(path);
  };
  return (
    <Link href={`/${path.join('/')}`}>
      <a
        className={classNames('mega-link', {
          'has-arrow': type === 'default' && Object.keys(children || {}).length,
        })}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        data-in-hover-path={type === 'default' && hoverPath.includes(slug)}
      >
        <div className="flex items-baseline">
          {type === 'default' ? (
            <>
              <Thumbnail media={media} />
              {navigationTitle}
            </>
          ) : (
            <b>
              {navigationTitle}
              &nbsp;
            </b>
          )}

          {type === 'show_all' ? (
            <small className="ml-2">
              {intl.formatMessage({
                id: 'show_all',
                defaultMessage: 'Show all',
              })}
            </small>
          ) : (
            ''
          )}
        </div>
      </a>
    </Link>
  );
};

const MegaDropdownColumn = ({
  columnIndex = null,
  ...rest
}: Node & { columnIndex?: number }) => {
  const intl = useIntl();
  return (
    <div className="inline-block w-1/3 border-r border-color-grey-lightest">
      {columnIndex === 0 && (
        <a
          className="mb-1 block cursor-pointer py-1 pr-7 pl-6 text-base uppercase hover:underline lg:text-lg lg:font-medium lg:tracking-wider"
          href={theme.websiteUrl}
        >
          <HomeIcon className="mr-2 inline-flex h-8 w-8 items-center" />
          <span className="align-bottom">
            {intl.formatMessage({
              id: 'back_to_website',
              defaultMessage: 'Back to website',
            })}
          </span>
        </a>
      )}
      <MegaDropdownItem {...rest} type="show_all" />

      {rest.children &&
        Object.entries(rest.children)
          .sort(([, aNode], [, bNode]) => {
            return aNode.index - bNode.index;
          })
          .map(([, subnode]) => (
            <MegaDropdownItem key={subnode._id} {...subnode} type="default" />
          ))}
    </div>
  );
};

MegaDropdownColumn.defaultProps = {
  columnIndex: null,
};

export default MegaDropdownColumn;
