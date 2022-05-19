import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUserAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      psswd: '',
      email: '',
      btnLogin: true,

    };
  }

  handleClick = () => {
    const { email } = this.state;
    const { setEmail, history } = this.props;
    setEmail(email);
    history.push('/carteira');
  }

  // Stack Over Flow https://stackoverflow.com/a/48800/4832311  (slack Caio Galvão)
    validateTypeEmail = (email) => {
      const emailValid = /\S+@\S+\.\S+/;
      return emailValid.test(email);
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value }, () => this.validateEmail());
    }

    validateEmail = () => {
      const characters = 5;
      const { email, psswd } = this.state;
      if (psswd.length > characters && this.validateTypeEmail(email)) {
        return this.setState({ btnLogin: false });
      }
      this.setState({
        btnLogin: true,
      });
    }

    render() {
      const { email, psswd, btnLogin } = this.state;
      return (
        <div className="header">
          <label htmlFor="enterEmail">
            Email
            <input
              id="enterEmail"
              type="email"
              name="email"
              onChange={ this.handleChange }
              value={ email }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="enterPsswd">
            password
            <input
              id="enterPsswd"
              type="text"
              name="psswd"
              onChange={ this.handleChange }
              value={ psswd }
              data-testid="password-input"
            />
          </label>
          <span>  </span>
          <button
            type="button"
            onClick={ () => this.handleClick() }
            disabled={ btnLogin }
          >
            Entrar
          </button>
        </div>
      );
    }
}
const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(addUserAction(email)),
});

Login.propTypes = {
  setEmail: PropTypes.string.isRequired,
  history: PropTypes.objectOf.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
