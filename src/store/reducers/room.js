const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "@room/SET":
      return {...action.room};
    default:
      return state;
  }
};

export default reducer;
