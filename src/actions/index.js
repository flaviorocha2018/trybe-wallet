// Coloque aqui suas actions
export const ADD_USER = 'ADD_USER';
export const ADD_WALLET = 'ADD_WALLET';

export function addUserAction(email) {
  return {
    type: ADD_USER,
    payload: email,
  };
}

export function addWalletAction(state) {
  return {
    type: ADD_WALLET,
    payload: state,
  };
}
