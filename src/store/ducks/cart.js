export const Types = {
  GET: 'cart/GET',
  ADD_TO_CART: 'cart/ADD_TO_CART',
  REMOVE: 'cart/REMOVE',
  CHANGE_AMOUNT: 'cart/CHANGE_AMOUNT',
};

const INITIAL_STATE = {
  data: [],
  subTotal: null,
  loading: false,
  error: null,
};

function getIndex(state, id) {
  const itemIndex = state.data.findIndex(product => product.id === id);

  return itemIndex;
}

function updateSubTotal(state) {
  let result = null;
  state.data.forEach((element) => {
    result += parseFloat(element.subTotal);
  });

  return result;
}

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET:
      return { ...state, loading: false };

    case Types.ADD_TO_CART:
      const { product } = action.payload;
      const exists = getIndex(state, product.id);

      if (exists === -1) {
        state.subTotal = updateSubTotal(state);
        return {
          ...state,
          loading: false,
          error: false,
          subTotal: state.subTotal + product.price,
          data: [
            ...state.data,
            { ...product, amount: 1, subTotal: product.price },
          ],
        };
      }
      return { ...state, loading: false, error: false };


    case Types.REMOVE:
      const productIndex = getIndex(state, action.payload.productId)
      return {
        subTotal: state.subTotal -= state.data[productIndex].subTotal,
        data: state.data.filter(product => product.id !== action.payload.productId),
      };

    case Types.CHANGE_AMOUNT:
      const { newAmount, productId } = action.payload.changes;

      const itemIndex = getIndex(state, productId);
      state.data[itemIndex].amount = action.payload.changes.newAmount;

      const newSubTotal = (newAmount * state.data[itemIndex].price).toFixed(2);
      state.data[itemIndex].subTotal = newSubTotal;

      state.subTotal = updateSubTotal(state);

      return {
        ...state,
      };

    default:
      return state;
  }
}

export const Actions = {
  getCart: () => ({
    type: Types.GET,
  }),

  addToCart: product => ({
    type: Types.ADD_TO_CART,
    payload: { product },
  }),

  removeFromCart: productId => ({
    type: Types.REMOVE,
    payload: { productId },
  }),

  // data: { productID, newAmount }
  changeAmount: changes => ({
    type: Types.CHANGE_AMOUNT,
    payload: { changes },
  }),
};
