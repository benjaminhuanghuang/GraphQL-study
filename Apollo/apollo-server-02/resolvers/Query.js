/*
  use the data in the context
*/

exports.Query = {
  allProducts: (parent, args, { products }) => products,

  products: (parent, { filter }, { products }) => {
    let filteredProducts = products;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.onSale;
        });
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          db.reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          const avgProductRating = sumRating / numberOfReviews;

          return avgProductRating >= avgRating;
        });
      }
    }

    return filteredProducts;
  },

  product: (parent, args, context) => {
    const productId = args.id;
    const product = context.products.find((p) => p.id === productId);
    return product;
  },
  
  categories: (parent, args, context) => context.categories,

  category: (parent, {id}, {categories}) => {
    return  categories.find((c) => c.id === id);
  },  
};
  