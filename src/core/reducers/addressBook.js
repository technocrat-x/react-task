// const defaultState = {
//   addresses: [],
// };

// const reducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case "address/add":
//       /** TODO: Prevent duplicate addresses */
//       return { ...state, addresses: [...state.addresses, action.payload] };
//     case "address/remove":
//       /** TODO: Write a state update which removes an address from the addresses array. */
//       return state;
//     case "addresses/add": {
//       return { ...state, addresses: action.payload };
//     }
//     default:
//       return state;
//   }
// };

// export default reducer;

const defaultState = {
  addresses: [], // Initialize the state with an empty array for addresses.
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "address/add":
      /** 
       * TODO: Prevent duplicate addresses 
       * - Check if the address already exists in the state before adding.
       */
      // Check if the address already exists
      if (state.addresses.some(address => address.id === action.payload.id)) {
        // If address already exists, return state without modification
        return state;
      }
      // If address doesn't exist, add it to the state
      return { ...state, addresses: [...state.addresses, action.payload] };
    case "address/remove":
      /** 
       * TODO: Write a state update which removes an address from the addresses array. 
       * - You need to find the index of the address to remove and update the state accordingly.
       */
      // Find the index of the address to remove
      const updatedAddresses = state.addresses.filter(address => address.id !== action.payload);
      // Return state with updated addresses array
      return { ...state, addresses: updatedAddresses };
    case "addresses/add": {
      /** 
       * This action is used to replace all existing addresses with new ones.
       * - It's typically used when fetching addresses from an external source or resetting the address list.
       */
      return { ...state, addresses: action.payload }; // Replace all addresses with the new payload.
    }
    default:
      return state;
  }
};

export default reducer;
