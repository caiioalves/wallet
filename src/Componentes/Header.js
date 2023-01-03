import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppBar, Box, Stack } from '@mui/material';

class Header extends React.Component {
  render() {
    const { email, despesas } = this.props;
    return (
      <AppBar
        // color='secondary'
        position="static"
        sx={{
          background: 'linear-gradient(180deg, rgba(33,126,213,1) 23%, rgba(0,212,255,1) 100%)'
        }}
      >
        <Stack p={2} direction="row" spacing={2} justifyContent="space-between">
        <Box>{ email }</Box>
        <Box>
          {`R$ ${
            despesas.reduce((prevValor, valor) => (
              prevValor + valor.value * Number(valor.exchangeRates[valor.currency].ask)
            ), 0).toFixed(2)
          }`}
        </Box>
        </Stack>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  despesas: state.wallet.expenses,
  valorTotal: state.wallet.valorTotal,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  despesas: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
