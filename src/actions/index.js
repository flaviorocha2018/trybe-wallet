// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const ADD_WALLET = 'ADD_WALLET';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const GET_ACTUALQUOTATION = 'GET_ACTUALQUOTATION';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const EDIT_TRUE = 'EDIT_TRUE';

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
export const editTrue = (state) => ({
  type: EDIT_TRUE,
  payload: state,
});

export const editExpense = (state) => ({
  type: EDIT_EXPENSES,
  payload: state,
});

export function addWalletAction(state) {
  return {
    type: ADD_WALLET,
    payload: state,
  };
}

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
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
export const fetchCurrencyActual = (expenses) => (
  async (dispatch) => {
    try {
      const request = await fetch('https://economia.awesomeapi.com.br/json/all');
      const response = await request.json();
      const newObject = {
        exchangeRates: response,
        ...expenses,
      };
      dispatch(saveExpenses(newObject));
    } catch (error) {
      console.log(error);
    }
  }
);
