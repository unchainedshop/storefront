import { StarIcon, ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import useUser from '../../auth/hooks/useUser';
import useAddReview from '../hooks/useAddReview';
import useProductReviewVote from '../hooks/useProductReviewVote';

const ProductReview = ({ reviews, productId }) => {
  const { register, handleSubmit } = useForm();
  const { formatMessage, locale } = useIntl();
  const { addReview } = useAddReview();
  const [rating, setRating] = useState(0);
  const { addReviewVote } = useProductReviewVote();

  const { user } = useUser();

  // eslint-disable-next-line no-shadow
  const onSubmit = async ({ rating, review, title }) => {
    await addReview({
      productId,
      productReview: {
        rating: parseInt(rating, 10),
        review,
        title,
      },
    });
  };

  return (
    <section
      aria-labelledby="reviews-heading"
      className="mt-16 sm:mt-24 lg:col-span-12"
    >
      <div className="md:grid md:grid-cols-2">
        <h2 className="sr-only">
          {formatMessage({
            id: 'recent_reviews',
            defaultMessage: 'Recent Reviews',
          })}
        </h2>

        <form className="mt-10 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="flex justify-center gap-6 pt-10">
            <legend className="sr-only">
              {formatMessage({
                id: 'star_review',
                defaultMessage: 'Select a star review',
              })}
            </legend>
            {[0, 1, 2, 3, 4].map((star) => (
              <div key={star} className="relative">
                <input
                  type="radio"
                  id={`star-${star}`}
                  name="rating"
                  ref={register}
                  className="opacity-0"
                  onChange={() => setRating(star)}
                  required
                  value={star + 1}
                />
                <label htmlFor={`star-${star}`} className="text-slate-300">
                  <span
                    className={classNames(
                      "after:absolute after:top-0 after:left-0 after:content-['★']",
                      { 'after:text-yellow-400': star <= rating },
                    )}
                  />
                </label>
              </div>
            ))}
          </fieldset>

          <div className="mx-8 mt-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              {formatMessage({ id: 'title', defaultMessage: 'Title' })}
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                ref={register}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={formatMessage({
                  id: 'placeholder_title',
                  defaultMessage: 'Title',
                })}
                required
              />
            </div>
          </div>
          <div className="mx-8 mt-4">
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-700"
            >
              {formatMessage({
                id: 'add_review',
                defaultMessage: 'Add your comment',
              })}
            </label>
            <div className="mt-1">
              <textarea
                rows={4}
                name="review"
                id="review"
                className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue=""
                ref={register}
                placeholder={formatMessage({
                  id: 'placeholder',
                  defaultMessage: 'Share your thought about the product',
                })}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mx-8 mt-6 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            {formatMessage({
              id: 'write_review',
              defaultMessage: 'Write a review',
            })}
          </button>
        </form>
        <div className="my-10">
          {reviews.map((review, reviewIdx) => (
            <div
              key={review._id}
              className="flex space-x-4 text-sm text-gray-500"
            >
              <div className="flex-none py-10">
                {review?.author?.avatar?.url ? (
                  <img
                    src={review.author.avatar.url}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-100"
                  />
                ) : (
                  <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                )}
              </div>
              <div
                className={classNames('flex-1 py-10', {
                  'border-t border-gray-200': !(reviewIdx === 0),
                })}
              >
                <h3 className="font-medium text-gray-900">
                  {review.author.name}
                </h3>
                <p>
                  <time dateTime={review.created}>
                    {new Intl.DateTimeFormat(locale, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    }).format(new Date(review.created).getTime())}
                  </time>
                </p>

                <div className="mt-4 flex items-center text-gray-300">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <>
                      <StarIcon
                        key={star}
                        className={classNames('h-5 w-5 flex-shrink-0 ', {
                          'text-yellow-400': review.rating > star,
                        })}
                        aria-hidden="true"
                      />
                    </>
                  ))}
                </div>
                <p className="sr-only">
                  {review.rating}
                  {formatMessage({
                    id: 'rating_starts',
                    defaultMessage: ' out of 5 stars',
                  })}
                </p>

                <div
                  className="prose prose-sm mt-4 max-w-none text-gray-500"
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: review.review }}
                />

                <div className="mt-4 flex text-slate-400">
                  <button
                    type="button"
                    className="flex items-center p-2 hover:bg-yellow-100 hover:text-yellow-700 disabled:cursor-not-allowed disabled:bg-white disabled:text-slate-200"
                    onClick={() =>
                      addReviewVote({
                        productReviewId: review._id,
                        voteType: 'UPVOTE',
                      })
                    }
                    disabled={review?.author?._id === user?._id}
                  >
                    <ThumbUpIcon className="h-7 w-7" />
                  </button>
                  <span className="mx-2 p-2">{review?.upVote}</span>
                  <button
                    type="button"
                    className="flex items-center p-2 hover:bg-yellow-100 hover:text-yellow-700 disabled:cursor-not-allowed disabled:bg-white disabled:text-slate-200"
                    onClick={() =>
                      addReviewVote({
                        productReviewId: review._id,
                        voteType: 'DOWNVOTE',
                      })
                    }
                    disabled={review?.author?._id === user?._id}
                  >
                    <ThumbDownIcon className="h-7 w-7" />
                  </button>
                  <span className="mx-2 p-2">{review?.downVote}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductReview;
