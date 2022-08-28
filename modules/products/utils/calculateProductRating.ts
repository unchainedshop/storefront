const calculateProductRating = (reviews) => {
  const total = (reviews || [])?.reduce((prev, next) => prev + next.rating, 0);
  return reviews?.length ? total / reviews?.length : 0;
};

export default calculateProductRating;
