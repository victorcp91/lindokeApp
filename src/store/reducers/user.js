const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "@user/SET":
      return {...action.user};
    default:
      return state;
  }
};

export default reducer;
