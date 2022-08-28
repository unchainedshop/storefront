import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import CategoriesList from '../../modules/assortment/components/CategoriesList';
import useAssortmentProducts from '../../modules/assortment/hooks/useAssortmentProducts';
import getAssortmentPath from '../../modules/assortment/utils/getAssortmentPath';
import AssortmentBreadcrumbs from '../../modules/assortment/components/AssortmentBreadcrumbs';
import ProductList from '../../modules/products/components/ProductList';
import MetaTags from '../../modules/common/components/MetaTags';
import useCategoriesTree from '../../modules/assortment/hooks/useCategoriesTree';
import LoadingItem from '../../modules/common/components/LoadingItem';
import getMediaUrl from '../../modules/common/utils/getMediaUrl';
import defaultNextImageLoader from '../../modules/common/utils/getDefaultNextImageLoader';

const CategoryDetail = () => {
  const router = useRouter();
  const { slug: slugs } = router.query;
  const slug: string | string[] = slugs?.length ? slugs[slugs?.length - 1] : '';
  const [currentUrl, setCurrentUrl] = useState('');

  const { assortmentTree, loading: categoryTreeLoading } = useCategoriesTree({
    slugs: slug,
    includeLeaves: true,
  });

  const {
    assortment: { texts, media } = {},
    products,
    paths,
    loadMore,
    filteredProducts,
    loading: productsLoading,
  } = useAssortmentProducts({
    slugs: slug,
    includeLeaves: true,
  });

  const assortmentPaths = getAssortmentPath(paths);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    localStorage.setItem('lastVisitedCategory', router.asPath);
  });

  let currentPath: string;
  if (typeof slugs === 'string') {
    currentPath = slugs;
  } else {
    currentPath = slugs?.join('/');
  }

  return (
    <>
      <MetaTags
        title={texts?.title}
        description={texts?.description}
        url={currentUrl}
        imageUrl={getMediaUrl({ media })}
      />
      <div className="flex flex-wrap px-4 sm:px-0">
        <div className="relative w-full flex-3 pl-1">
          <AssortmentBreadcrumbs
            paths={assortmentPaths}
            currentAssortment={texts}
          />
        </div>
        <div className="relative w-full p-4 pl-1 md:max-w-1/3 md:flex-4 lg:max-w-1/4 lg:flex-5">
          {categoryTreeLoading ? (
            <LoadingItem />
          ) : (
            <CategoriesList
              assortment={assortmentTree.children}
              currentPath={currentPath}
            />
          )}
        </div>
        <div className="relative w-full px-4 md:max-w-2/3 md:flex-6 lg:max-w-3/4 lg:flex-7">
          <div>
            <h1 className="mt-0 dark:text-slate-100">{texts?.title}</h1>
            <h2>{texts?.subtitle}</h2>
            {getMediaUrl({ media }) && (
              <Image
                src={getMediaUrl({ media })}
                alt={texts?.title}
                layout="responsive"
                objectFit="contain"
                quality={100}
                width="706px"
                height="235px"
                loader={defaultNextImageLoader}
              />
            )}

            <p>{texts?.description}</p>
          </div>
          {productsLoading ? (
            <LoadingItem />
          ) : (
            <ProductList
              onLoadMore={loadMore}
              totalProducts={filteredProducts}
              products={products}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryDetail;
