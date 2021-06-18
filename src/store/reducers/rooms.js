const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "@rooms/SET":
      return [...action.rooms];
    default:
      return state;
  }
};

export default reducer;
