import {ADD_TO_CART} from 'constants';

function AddItemsToCart(items) {
  return {
    type: ADD_TO_CART,
    data: items,
  };
}

module.exports = {
  AddItemsToCart,
};
