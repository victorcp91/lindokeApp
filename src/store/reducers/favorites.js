const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "@favorites/SET":
      return [...action.favorites];
    default:
      return state;
  }
};

export default reducer;