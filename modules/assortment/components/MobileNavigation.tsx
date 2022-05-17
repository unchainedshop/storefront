import React, { useState } from 'react';
import Link from 'next/link';
import getConfig from 'next/config';
import { useIntl } from 'react-intl';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  HomeIcon,
  XIcon,
} from '@heroicons/react/solid';
import useCategoriesTree from '../hooks/useCategoriesTree';
import Thumbnail from '../../common/components/thumbnail';
import changeLanguage from '../../common/utils/changeLanguage';

const createPathFromArray = (path = []) => {
  return `/${(path || []).join('/')}`;
};

const {
  publicRuntimeConfig: { theme },
} = getConfig();

const Subtree = ({
  pageId,
  children = {},
  navigationTitle,
  path,
  subtree,
  media = [],
}) => {
  const intl = useIntl();
  const [showSubtree, setShowSubtree] = useState(false);

  const level = path.length - 2;

  const levelClassMap = [
    'text-xl p-3',
    'pl-3 text-base py-3',
    'pl-4 text-base py-3',
    'pl-5 text-base py-3',
  ];
  return Object.keys(children).length ? (
    <div key={pageId} className="border-t border-color-grey-lightest">
      <button
        aria-label="Expand"
        type="button"
        className="flex w-full cursor-pointer appearance-none items-center justify-between border-0 bg-transparent p-0 text-left uppercase text-inherit"
        onClick={() => setShowSubtree(!showSubtree)}
      >
        <div className={levelClassMap[level]}>
          <Thumbnail media={media} />
          {navigationTitle}
        </div>
        {showSubtree ? (
          <ArrowUpIcon className="justify-canter items-align mr-3 inline-flex h-4 w-5 select-none align-middle" />
        ) : (
          <ArrowDownIcon className="justify-canter items-align mr-3 inline-flex h-4 w-5 select-none align-middle" />
        )}
      </button>
      {showSubtree ? (
        <div>
          <Link href={createPathFromArray(path)}>
            <a
              className={`link block border-t border-color-grey-lightest uppercase ${
                levelClassMap[level + 1]
              }`}
            >
              {intl.formatMessage({ id: 'show_all' })}
            </a>
          </Link>

          {Object.entries(children)
            .sort(([, aNode]: any, [, bNode]: any) => {
              return aNode?.index - bNode.index;
            })
            .map(([subPageId, node]: any) => (
              <Subtree
                path={node?.path}
                navigationTitle={node?.navigationTitle}
                subtree={subtree}
                key={subPageId}
                pageId={subPageId}
                {...node}
              />
            ))}
        </div>
      ) : (
        ''
      )}
    </div>
  ) : (
    <Link href={createPathFromArray(path)}>
      <a
        className={`block border-t border-color-grey-lightest uppercase ${levelClassMap[level]}`}
      >
        <Thumbnail media={media} />
        {navigationTitle}
      </a>
    </Link>
  );
};

const MobileNavigation = ({ doClose, isNavOpen }) => {
  const intl = useIntl();
  const { assortmentTree } = useCategoriesTree({ root: 'shop' });

  return (
    <div
      className="mobile-menu-holder dark:bg-slate-500 dark:text-slate-900"
      data-is-open={isNavOpen}
    >
      <button
        aria-label="close"
        type="button"
        className="mobile-menu-close cursor-pointer appearance-none border-0 bg-transparent p-0 text-left text-inherit"
        onClick={doClose}
      >
        <span className="hidden">{intl.formatMessage({ id: 'close' })}</span>
      </button>
      <nav id="menu" className="mobile-menu">
        <div>
          <button
            aria-label="close"
            type="button"
            className="flex w-full cursor-pointer appearance-none items-center border-0 bg-transparent p-3 text-left text-inherit"
            onClick={doClose}
          >
            <XIcon className="mr-3 inline-flex h-4 w-5 select-none items-center justify-center align-middle" />
            <small className="ml-2">
              {intl.formatMessage({ id: 'close' })}
            </small>
          </button>

          <a className="ml-3 mb-3 flex items-center" href={theme.websiteUrl}>
            <HomeIcon className="mr-3 inline-flex h-4 w-5 select-none items-center justify-center align-middle" />

            {intl.formatMessage({ id: 'back_to_website' })}
          </a>
          {Object.entries(assortmentTree.children).map(
            ([pageId, node]: any) => (
              <Subtree
                path={node?.path}
                navigationTitle={node?.navigationTitle}
                subtree={node?.children}
                key={pageId}
                pageId={pageId}
                {...node}
              />
            ),
          )}
        </div>

        <div className="my-3 ml-3 pt-3">
          {Object.entries(theme.locales)?.map(([lang]) => (
            <button
              key={lang}
              aria-label={intl.formatMessage({ id: `language_${lang}` })}
              type="button"
              className="mb-3 block cursor-pointer appearance-none border-0 bg-transparent p-0 text-left text-inherit"
              onClick={() => changeLanguage(lang)}
            >
              {intl.formatMessage({ id: `language_${lang}` })}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileNavigation;
