const defaultState = {
  addresses: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "address/add":
      /** TODO: Prevent duplicate addresses */
      if (state.addresses.some((address) => address.id === action.payload.id)) {
        return state;
      }
      return { ...state, addresses: [...state.addresses, action.payload] };
    case "address/remove":
      /** TODO: Write a state update which removes an address from the addresses array. */

      return {
        ...state,
        addresses: state.addresses.filter(
          (address) => address.id !== action.payload
        ),
      };
    case "addresses/add": {
      return { ...state, addresses: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
