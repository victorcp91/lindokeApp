const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "@user/SET":
      return {...action.user};
    case "@user/LOGOUT":
        return null;
    default:
      return state;
  }
};

export default reducer;
