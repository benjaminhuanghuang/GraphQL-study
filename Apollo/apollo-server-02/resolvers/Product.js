/*
  use the data in the context
*/
exports.Product = {
  category: (parent, args, context) => {
    const categories = context.categories;
    const categoryId = parent.categorId;  // parent is a parent

    const category = categories.find((c) => c.id ===categoryId);
    return category;
  },
  reviews: ({ id }, args, { reviews }) => {
    return reviews.filter((review) => review.productId === id);
  },
};
