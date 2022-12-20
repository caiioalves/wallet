import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Componentes/Header';
import { excluir, fetchApiCotaçaoThunk, fetchApiMoedasThunk } from '../actions';
import { Box, Button, Container, FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider } from '@mui/material';
import { Tema } from '../Componentes/Tema';

class Wallet extends React.Component {
  state = {
    despesas: 0,
    descricao: '',
    moeda: 'USD',
    pagamento: 'Dinheiro',
    categoria: 'Alimentaçao',
    valorBrl: 0,
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(fetchApiMoedasThunk());
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleClick = async () => {
    const { dispatch, expensesValue } = this.props;
    const { despesas, descricao, moeda, pagamento, categoria } = this.state;
    const formularios = {
      id: expensesValue.length,
      value: despesas,
      description: descricao,
      currency: moeda,
      method: pagamento,
      tag: categoria,
    };

    await dispatch(fetchApiCotaçaoThunk(formularios));
    this.setState({ despesas: 0,
      descricao: '',
      moeda: 'USD',
      pagamento: 'Dinheiro',
      categoria: 'Alimentaçao' });
  }

  render() {
    const { currencies, expensesValue, dispatch } = this.props;
    const { despesas, descricao, moeda, pagamento, categoria, valorBrl } = this.state;
    return (
      <ThemeProvider theme={Tema}>
      <Container sx={{ height: "100vh" }}>
        <Header valorBrl={ valorBrl } />
        <FormControl
          sx={{
            width:"100%",
            mt: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TextField
            sx={{
              width:"10%",
              ml: 2,
              mr: 2,
            }}
            label="Valor"
            variant="outlined"
            value={ despesas }
            onChange={ this.handleChange }
            id="despesas"
            type="number"
            data-testid="value-input"
          />
          <TextField
            sx={{
              ml: 2,
              mr: 2,
              width:"10%",
            }}
            value={ descricao }
            onChange={ this.handleChange }
            id="descricao"
            label="Descrição"
            data-testid="description-input"
            type="text"
          />
          {/* <label
            htmlFor="moeda"
          >
            Moedas */}
            <Box sx={{ ml: 2, mr: 2, }}>
            <select
              width="10%"
              value={ moeda }
              onChange={ this.handleChange }
              id="moeda"
            >
              { Array.isArray(currencies) ? (currencies.map((valor, index) => (
                <option key={ index }>{valor}</option>
              ))) : undefined }
          </select>
          </Box>
          <Box sx={{ ml: 2, mr: 2, }}>
          <select
            width="10%"
            value={ pagamento }
            onChange={ this.handleChange }
            id="pagamento"
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          </Box>
          <Box sx={{ ml: 2, mr: 2, }}>
          <select
            value={ categoria }
            onChange={ this.handleChange }
            id="categoria"
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          </Box>
          <Button
            sx={{ ml: 2, mr: 2, }}
            onClick={ this.handleClick }
            type="button"
            variant="contained"
          >
            Adicionar despesa
          </Button>
        </FormControl>
        <TableContainer
          component={Paper}
          sx={{
            mt: 3
          }}
        >
          <Table>
          <TableHead>
            <TableRow >
              <TableCell>Descrição</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Método de pagamento</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Moeda</TableCell>
              <TableCell>Câmbio utilizado</TableCell>
              <TableCell>Valor convertido</TableCell>
              <TableCell>Moeda de conversão</TableCell>
              <TableCell>Editar/Excluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { expensesValue.map((valor, indice) => (
              <TableRow key={ valor.id }>
                <TableCell >{valor.description}</TableCell>
                <TableCell >{valor.tag}</TableCell>
                <TableCell >{valor.method}</TableCell>
                <TableCell >{ Number(valor.value).toFixed(2)}</TableCell>
                <TableCell >{valor.exchangeRates[valor.currency].name}</TableCell>
                <TableCell >
                  {Number(valor.exchangeRates[valor.currency].ask).toFixed(2)}
                </TableCell>
                <TableCell >
                  {
                    (Number(valor.exchangeRates[valor.currency].ask)
                    * Number(valor.value)).toFixed(2)
                  }
                </TableCell>
                <TableCell >Real</TableCell>
                <TableCell >
                  <Button
                    variant="contained"
                    color="secondary"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ async () => {
                      const novoArray = expensesValue.slice();
                      novoArray.splice(indice, 1);
                      await dispatch(excluir(novoArray));
                    } }
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
          </Table>
        </TableContainer>
      </Container>
      </ThemeProvider>
      );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expensesValue: state.wallet.expenses,
});

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
  expensesValue: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Wallet);
