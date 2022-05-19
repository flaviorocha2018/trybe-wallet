// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],

};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_WALLET:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}

export default walletReducer;
