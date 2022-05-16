import Image from 'next/image';
import Link from 'next/link';

import getMediaUrl from '../../common/utils/getMediaUrl';

const CategoryListItem = ({ category }) => {
  return (
    <Link href={`shop/${category.texts.slug}`}>
      <a className="group block">
        <div
          aria-hidden="true"
          className="aspect-w-3 aspect-h-2 relative overflow-hidden rounded-lg group-hover:opacity-75 lg:aspect-w-5 lg:aspect-h-6"
        >
          <Image
            src={
              getMediaUrl(category) ||
              'https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg'
            }
            alt={category?.texts.title}
            layout="fill"
            placeholder="blur"
            blurDataURL=""
            objectFit="cover"
            objectPosition="center"
            className="h-full w-full"
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
      </a>
    </Link>
  );
};

export default CategoryListItem;
