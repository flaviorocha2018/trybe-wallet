import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { currencies } = this.props;
    console.log('render l-15', currencies);
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="expenses">
            Expenses:
            <input
              name="expenses"
              type="number"
              placeholder="value"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Description:
            <input
              name="description"
              type="text"
              placeholder="description"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select required name="currency" placeholder="currency" id="currency">
              {currencies.map((currency, index) => (
                <option key={ index }>{ currency }</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Payment:
            <select
              name="method"
              data-testid="method-input"
              placeholder="currency"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Category:
            <select
              name="category"
              data-testid="tag-input"
              type="dropdown"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
