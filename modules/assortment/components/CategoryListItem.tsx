import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import getMediaUrl from '../../common/utils/getMediaUrl';
import ThemeContext from '../../common/ThemeContext';

const CategoryListItem = ({ category, className = '' }) => {
  const [theme] = useContext(ThemeContext);

  return (
    <div className={className}>
      <div className="group relative">
        <Link href={`shop/${category.texts.slug}`}>
          <a>
            <div className="sm:aspect-w-2 sm:aspect-h-3 h-auto w-full overflow-hidden rounded-lg group-hover:opacity-75 sm:h-auto">
              <Image
                src={
                  getMediaUrl(category) ||
                  '/static/img/sun-glass-placeholder.jpeg'
                }
                alt={category?.texts.title}
                layout="responsive"
                objectFit="contain"
                quality={100}
                width="706px"
                height="235px"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <h3
              className={`"mt-4 text-center text-base font-semibold ${theme.headingText}`}
            >
              {/* <span className="absolute inset-0" /> */}
              {category.texts?.title}
            </h3>
            <p className="mt-1 text-center text-sm text-gray-500">
              {category.texts?.subtitle}
            </p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CategoryListItem;
