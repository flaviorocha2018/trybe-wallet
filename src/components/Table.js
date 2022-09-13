import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses, editExpense } from '../actions';
import './Tables.css';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const actualQuotation = Object.entries(expense.exchangeRates)
                .find((currency) => currency[0] === expense.currency);
              const nameCurrency = actualQuotation[1].name.split('/');
              const actualValue = actualQuotation[1].ask;
              const totalExpenses = expense.value * actualValue;
              return (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>{nameCurrency[0]}</td>
                  <td>{Number(actualValue).toFixed(2)}</td>
                  <td>{totalExpenses.toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => dispatch(editExpense(expense.id)) }
                    >
                      Editar
                    </button>
                    /
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => dispatch(deleteExpenses(expense.id)) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,

};

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,

  };
}

// const mapDispatchToProps = (dispatch) => ({
//   deleteExpense: (expenses) => dispatch(deleteExpenses(expenses)),

// });

export default connect(mapStateToProps)(Table);
