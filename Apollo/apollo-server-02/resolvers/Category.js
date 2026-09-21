/*
  use the data in the context
*/

exports.Category = {
  allProducts: (parent, args, context) => {
    const products = context.products;

    const categoryId = parent.id;
    return products.filter((p) => p.categoryId === categoryId);
  },

  products: ({ id: categoryId }, { filter }, { products }) => {
    const categoryProducts = products.filter((product) => product.categoryId === categoryId);
    let filteredCategoryProducts = categoryProducts;

    if (filter) {
      if (filter.onSale === true) {
        filteredCategoryProducts = filteredCategoryProducts.filter((product) => {
          return product.onSale;
        });
      }
    }
    return filteredCategoryProducts;
  },
};
