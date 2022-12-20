import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppBar, Box, Typography } from '@mui/material';

class Header extends React.Component {
  render() {
    const { email, despesas } = this.props;
    return (
      <AppBar
        position="static"
        sx={{
          // marginLeft: -13,
          width: "100%",
          height: "10%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          // variant='h5'
          data-testid="email-field"
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: 1
          }}
        >
          { email }
        </Typography>
        <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          minWidth: "12%",
          maxWidth: "12%"
        }}>
        <Typography data-testid="total-field">
          {
            despesas.reduce((prevValor, valor) => (
              prevValor + valor.value * Number(valor.exchangeRates[valor.currency].ask)
            ), 0).toFixed(2)
          }
        </Typography>
        <Typography data-testid="header-currency-field">BRL</Typography>
        </Box>
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
// valorTotal: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
