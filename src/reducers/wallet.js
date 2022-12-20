const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  if (action.type === 'MOEDAS') {
    return {
      ...state,
      currencies: action.payload,
    };
  }
  if (action.type === 'EXPENSES') {
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  }
  if (action.type === 'EXCLUIR') {
    return {
      ...state,
      expenses: action.payload,
    };
  }
  return state;
};

export default wallet;
