import { act } from "react";

const defaultState = {
  addresses: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "address/add":
      const addressExists = state.addresses.some(
        (address) => address.id === action.payload.id
      );
      if (addressExists) {
        return state;
      }
      /** TODO: Prevent duplicate addresses */
      return { ...state, addresses: [...state.addresses, action.payload] };
    case "address/remove":
      let temp = state.addresses.filter((item) => {
        return item.id !== action.payload
      })
      /** TODO: Write a state update which removes an address from the addresses array. */
      return { ...state, addresses: temp };
    case "addresses/add": {
      return { ...state, addresses: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
