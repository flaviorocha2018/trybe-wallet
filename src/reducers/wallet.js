// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, SEND_EXPENSES, GET_ACTUALQUOTATION, DELETE_EXPENSES }
from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  exchangeRates: {},

};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state,
      currencies: action.payload };
  case SEND_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, {
        ...action.expenses,
        exchangeRates: { ...state.exchangeRates },
      }],

    };
  case GET_ACTUALQUOTATION:
    return {
      ...state,
      exchangeRates: action.currencies,
    };

  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  default:
    return state;
  }
}

export default walletReducer;
