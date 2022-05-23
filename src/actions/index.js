// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const ADD_WALLET = 'ADD_WALLET';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SEND_EXPENSES = 'SEND_EXPENSES';
export const GET_ACTUALQUOTATION = 'GET_ACTUALQUOTATION';
export const DELETE_EXPENSES = 'REMOVE_EXPENSES';

export function addUserAction(email) {
  return {
    type: ADD_USER,
    payload: email,
  };
}

export const deleteExpenses = (id) => ({
  type: DELETE_EXPENSES,
  id,
});

export function addWalletAction(state) {
  return {
    type: ADD_WALLET,
    payload: state,
  };
}

export const saveExpenses = (expenses) => ({
  type: SEND_EXPENSES,
  expenses,
});

export const actualQuotation = (currencies) => ({
  type: GET_ACTUALQUOTATION,
  currencies,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const REQUEST_API = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(REQUEST_API);
    const data = await response.json();
    dispatch(actualQuotation(data));
    const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
    dispatch(getCurrencies(currencies));
  } catch (error) {
    console.log(error);
  }
};
