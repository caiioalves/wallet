const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  if (action.type === 'LOGIN') {
    return {
      ...state,
      email: action.payload,
    };
  }
  return state;
};

export default user;
