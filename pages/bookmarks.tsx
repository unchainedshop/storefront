import { useIntl } from "react-intl";
import useUser from "../modules/auth/hooks/useUser";
import Loading from "../modules/common/components/Loading";

import MetaTags from "../modules/common/components/MetaTags";
import ProductList from "../modules/products/components/ProductList";

const Bookmarks = () => {
  const { formatMessage } = useIntl();
  const { user, loading } = useUser();
  const bookmarkedProducts = user?.bookmarks?.map((b) => b.product);

  return (
    <>
      <MetaTags
        title={formatMessage({ id: "bookmarks", defaultMessage: "Bookmarks" })}
      />
      <div className="flex flex-wrap justify-center">
        <div className="relative w-full px-4 md:max-w-2/3 md:flex-6 lg:max-w-3/4 lg:flex-7">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            {formatMessage({
              id: "bookmarks_title",
              defaultMessage: "Bookmarks",
            })}
          </h1>
          {loading ? (
            <Loading />
          ) : (
            <ProductList
              onLoadMore={undefined}
              totalProducts={bookmarkedProducts.length}
              products={bookmarkedProducts}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Bookmarks;
