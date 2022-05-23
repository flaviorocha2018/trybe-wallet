import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = expenses.reduce((acc, expense) => {
      const actualQuotation = Object.entries(expense.exchangeRates)
        .find((currency) => currency[0] === expense.currency);
      return acc + (expense.value * actualQuotation[1].ask);
    }, 0);

    return (
      <div>
        <header>
          <div className="email">
            <p>E-mail: </p>
            <p data-testid="email-field">{ email }</p>
          </div>
          <div className="totalField">
            <p>Total Expenses: </p>
            <p data-testid="total-field">{ totalExpenses.toFixed(2) }</p>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses, // get the expenses from state at Wallet
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
