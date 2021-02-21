import {ADD_TO_CART} from 'constants';

const initialState = {
  cartItems: [],
};

export default function UserReducer(state, action) {
 if (action.type == ADD_TO_CART) {
    return {
      ...state,
      cartItems: action.data,
    };
  } else {
    return initialState;
  }
}
