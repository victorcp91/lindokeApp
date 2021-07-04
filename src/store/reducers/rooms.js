const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "@rooms/SET":
      return [...action.rooms];
    case "@rooms/CLEAR":
      return [];
    default:
      return state;
  }
};

export default reducer;
