import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { TrashIcon } from '@heroicons/react/solid';
import { useIntl } from 'react-intl';
import getMediaUrl from '../../common/utils/getMediaUrl';
import Icon from '../../common/components/Icon';
import renderPrice from '../../common/utils/renderPrice';
import useRemoveCartItem from '../hooks/useRemoveCartItem';
import useUpdateCartItemMutation from '../hooks/useUpdateCartItem';

const CartItem = ({ _id, quantity, product, total }) => {
  const { updateCartItem } = useUpdateCartItemMutation();
  const { removeCartItem } = useRemoveCartItem();
  const [previousQuantity, setPreviousQuantity] = useState(quantity);
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const { formatMessage } = useIntl();

  const handleChange = (e) => {
    const amount = e.target.value;
    setCurrentQuantity(amount);
  };
  useEffect(() => {
    setCurrentQuantity(quantity);
  }, [quantity]);

  const handleBlur = (e) => {
    const amount = parseFloat(currentQuantity);
    let newValue = 0;
    if (Number.isNaN(amount) || amount < 0 || e.target.value === '0') {
      newValue = 1;
      setCurrentQuantity(1);
    } else {
      newValue = 0;
      const difference = Math.abs(amount - previousQuantity);
      if (previousQuantity < amount) {
        newValue = previousQuantity + difference;
      } else {
        newValue = previousQuantity - difference;
      }
    }
    if (previousQuantity !== newValue) {
      updateCartItem({
        itemId: _id,
        quantity: newValue,
      });

      setPreviousQuantity(amount);
    }
  };

  return (
    <li className="flex py-6 px-4 sm:px-6" key={_id}>
      <div className="flex-shrink-0 bg-yellow-500">
        <Image
          src={`${
            getMediaUrl(product) || '/static/img/sun-glass-placeholder.jpeg'
          }`}
          alt={product?.texts?.title}
          layout="responsive"
          objectFit="contain"
          quality={100}
          width="350px"
          height="350px"
        />
      </div>

      <div className="ml-6 flex flex-1 flex-col">
        <div className="flex">
          <div className="min-w-0 flex-1">
            <h4 className="text-sm">
              <Link href={`/product/${product?.texts?.slug}`}>
                <a className="font-medium text-gray-700 hover:text-gray-800">
                  {product?.texts && product?.texts.title}
                </a>
              </Link>
            </h4>
            {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p>
            <p className="mt-1 text-sm text-gray-500">{product.size}</p> */}
          </div>

          <div className="ml-4 flow-root flex-shrink-0">
            <button
              type="button"
              className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
              onClick={() => removeCartItem({ itemId: _id })}
            >
              <span className="sr-only">
                {formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
              </span>
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 items-end justify-between pt-2">
          <p className="mt-1 text-sm font-medium text-gray-900">
            {renderPrice(total)}
          </p>

          <div className="ml-4">
            <label htmlFor="quantity" className="sr-only">
              {formatMessage({ id: 'quantity', defaultMessage: 'Quantity' })}
            </label>
            <div className="flex flex-wrap items-center justify-between">
              <div className="item-quantity flex items-center justify-center">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  aria-label="Increase cart item"
                  disabled={currentQuantity === 1}
                  onClick={() =>
                    updateCartItem({
                      itemId: _id,
                      quantity: Math.max(quantity - 1, 1),
                    })
                  }
                >
                  -
                </button>
                <input
                  type="text"
                  pattern="\d+"
                  className="form-field"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={currentQuantity}
                />
                <button
                  className="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  aria-label="Decrease cart item"
                  type="button"
                  onClick={() =>
                    updateCartItem({
                      itemId: _id,
                      quantity: quantity + 1,
                    })
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
