const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "@songbook/SET":
      return [...action.songbook];
    default:
      return state;
  }
};

export default reducer;
