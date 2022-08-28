import Image from 'next/image';
import Link from 'next/link';
import defaultNextImageLoader from '../../common/utils/getDefaultNextImageLoader';

import getMediaUrl from '../../common/utils/getMediaUrl';

const CategoryListItem = ({ category }) => {
  return (
    <Link href={`shop/${category.texts.slug}`}>
      <a className="group block">
        {getMediaUrl(category) ? (
          <>
            <div
              aria-hidden="true"
              className="aspect-w-3 aspect-h-2 relative overflow-hidden rounded-lg  group-hover:opacity-75 lg:aspect-w-5 lg:aspect-h-6"
            >
              <Image
                src={getMediaUrl(category)}
                alt={category?.texts.title}
                layout="fill"
                placeholder="blur"
                blurDataURL="/placeholder.png"
                objectFit="cover"
                objectPosition="center"
                className="h-full w-full"
                loader={defaultNextImageLoader}
              />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
              {category.texts?.title}
            </h3>
            <p className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">
              {category.texts?.subtitle}
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              {category.texts?.description}
            </p>
          </>
        ) : (
          <div className="group relative m-2 rounded-tl-lg rounded-tr-lg  border-2  p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:rounded-tr-none ">
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
                    {category.texts?.title}
                  </h3>
                  <p className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">
                    {category.texts?.subtitle}
                  </p>
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {category.texts?.description}
              </p>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        )}
      </a>
    </Link>
  );
};

export default CategoryListItem;
