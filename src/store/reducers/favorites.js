const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "@favorites/SET":
      return [...action.favorites];
    case "@favorites/CLEAR":
      return [];
    default:
      return state;
  }
};

export default reducer;