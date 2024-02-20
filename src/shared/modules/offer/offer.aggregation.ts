const getUserFavoriteAggregation = (userId: string) => [
  {
    $lookup: {
      from: 'users',
      let: { userId: { $toObjectId: userId } },
      pipeline: [
        { $match: { $expr: { $eq: ['$_id', '$$userId'] } } },
        { $project: { _id: 0, favorites: 1 } },
      ],
      as: 'users',
    },
  },
  {
    $addFields: {
      user: { $arrayElemAt: ['$users', 0] },
    },
  },
  {
    $unset: ['users'],
  },
];

const commentRatingAndCountAggregation = [
  {
    $lookup: {
      from: 'comments',
      let: { offerId: '$_id' },
      pipeline: [
        { $match: { $expr: { $eq: ['$$offerId', '$offerId'] } } },
        { $project: { _id: 0, rating: 1 } },
      ],
      as: 'comments',
    },
  },
];

const userAuthorAggregation = [
  {
    $lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'users',
    },
  },
  {
    $addFields: {
      author: { $arrayElemAt: ['$users', 0] },
    },
  },
  {
    $unset: ['users'],
  },
];

const offerAggregation = [
  {
    $project: {
      _id: 0,
      id: { $toString: '$_id' },
      date: 1,
      title: 1,
      description: 1,
      city: 1,
      previewImage: 1,
      images: 1,
      premium: 1,
      favorite: { $in: ['$_id', { $ifNull: ['$user.favorites', []] }] },
      rating: { $ifNull: [{ $avg: '$comments.rating' }, 0] },
      type: 1,
      bedrooms: 1,
      maxAdults: 1,
      price: 1,
      goods: 1,
      author: 1,
      commentCount: { $size: '$comments' },
      location: 1,
    },
  },
];

export const getOfferAggregation = (userId?: string) => {
  const userFavoriteAggregation = userId ? getUserFavoriteAggregation(userId) : [];

  return [
    ...userFavoriteAggregation,
    ...userAuthorAggregation,
    ...commentRatingAndCountAggregation,
    ...offerAggregation,
  ];
};
