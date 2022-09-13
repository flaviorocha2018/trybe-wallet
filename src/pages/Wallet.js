import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import { fetchCurrencies, editTrue, fetchCurrencyActual } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleEdit = () => {
    const { expenses, expenseId, actionEdit } = this.props;
    const edits = expenses.map((item) => {
      if (item.id === expenseId) {
        return { ...this.state, exchangeRates: item.exchangeRates };
      }
      return item;
    });
    actionEdit(edits);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { throwExpenses, getCurrencies } = this.props;
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      description: '',

    }));
    event.preventDefault();
    getCurrencies();
    throwExpenses(this.state);
  }

  handleInput = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencies, isEdit } = this.props;
    console.log('render l-15', currencies);
    const { value, description, currency, tag, method } = this.state;

    return (
      <div>
        <Header />
        <form>

          <label htmlFor="description">
            Description:
            <input
              id="description"
              name="description"
              type="text"
              value={ description }
              placeholder="description"
              data-testid="description-input"
              onChange={ this.handleInput }
            />
          </label>

          <label htmlFor="category">
            Category:
            <select
              id="category"
              name="tag"
              value={ tag }
              data-testid="tag-input"
              type="dropdown"
              onChange={ this.handleInput }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <label htmlFor="method">
            Payment:
            <select
              id="method"
              name="method"
              data-testid="method-input"
              placeholder="currency"
              value={ method }
              onChange={ this.handleInput }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="expenses">
            Expenses:
            <input
              id="expenses"
              name="value"
              type="number"
              value={ value }
              placeholder="expense"
              data-testid="value-input"
              onChange={ this.handleInput }
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              required
              name="currency"
              placeholder="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleInput }
            >
              {currencies.map((curr) => (
                <option key={ curr } value={ curr }>{ curr }</option>
              ))}
            </select>
          </label>
          {/* <button type="submit" onClick={ this.handleSubmit }>Adicionar despesa
          </button> */}
        </form>
        { !isEdit ? (
          <button
            type="button"
            name="expensesBtn"
            onClick={ this.handleSubmit }
          >
            Adicionar despesa
          </button>
        ) : (
          <button
            type="button"
            onClick={ this.handleEdit }
            data-testid="edit-btn"
          >
            Editar despesa
          </button>
        )}
        <section>
          <Table />
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isEdit: state.wallet.isEdit,
  expenseId: state.wallet.expenseId,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  throwExpenses: (expenses) => dispatch(fetchCurrencyActual(expenses)),
  actionEdit: (state) => dispatch(editTrue(state)),
  // Throw expenses to global state. Redux
}); // SaveExpenses -> action to dispatch to global state on Redux.

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf.isRequired,
  throwExpenses: PropTypes.func.isRequired,
  actionEdit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
  expenseId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
