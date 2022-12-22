import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Componentes/Header';
import { excluir, fetchApiCotaçaoThunk, fetchApiMoedasThunk } from '../actions';
import { Box, Button, Container, FormControl, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider } from '@mui/material';
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
    console.log(e.target.value);
    console.log(e.target);
    // console.log(e.target.getAttribute('name'));
    this.setState({ [e.target.id]: e.target.value });
  }

  handleChangeSelects = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
      <Box sx={{ height: "100vh" }}>
        <Header valorBrl={ valorBrl } />
        <FormControl
          sx={{
            mt:5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TextField
            sx={{minWidth: "10%", maxWidth: "20%"}}
            name="moeda"
            label="Valor"
            variant="outlined"
            value={ despesas }
            onChange={ this.handleChange }
            id="despesas"
            type="number"
            data-testid="value-input"
          />
          <TextField
            sx={{minWidth: "10%", maxWidth: "20%"}}
            value={ descricao }
            onChange={ this.handleChange }
            id="descricao"
            label="Descrição"
            data-testid="description-input"
            type="text"
          />
            <Select
              sx={{minWidth: "10%", maxWidth: "20%"}}
              value={ moeda }
              name="moeda"
              onChange={ this.handleChangeSelects }
              id="moeda"
            >
              { Array.isArray(currencies) ? (currencies.map((valor, index) => (
                <MenuItem value={valor} name="moeda" key={ index }>{valor}</MenuItem>
              ))) : undefined }
          </Select>
          <Select
            sx={{minWidth: "10%", maxWidth: "20%"}}
            value={ pagamento }
            onChange={ this.handleChangeSelects }
            name="pagamento"
            data-testid="method-input"
          >
            <MenuItem value="Dinheiro">Dinheiro</MenuItem>
            <MenuItem value="Cartão de crédito">Cartão de crédito</MenuItem>
            <MenuItem value="Cartão de débito">Cartão de débito</MenuItem>
          </Select>
          <Select
            sx={{minWidth: "10%", maxWidth: "20%"}}
            value={ categoria }
            onChange={ this.handleChangeSelects }
            name="categoria"
            data-testid="tag-input"
          >
            <MenuItem value="Alimentação">Alimentação</MenuItem>
            <MenuItem value="Lazer">Lazer</MenuItem>
            <MenuItem value="Trabalho">Trabalho</MenuItem>
            <MenuItem value="Transporte">Transporte</MenuItem>
            <MenuItem value="Saúde">Saúde</MenuItem>
          </Select>
        </FormControl>
        <Box 
          justifyContent="center"
          display="flex"
          mt={3}
        >
          <Button
            onClick={ this.handleClick }
            type="button"
            variant="contained"
          >
            Adicionar despesa
          </Button>
        </Box>
        <Container>
        <TableContainer
          component={Paper}
          sx={{
            mt: 3
          }}
        >
          <Table sx={{ minWidth: 200 }} size="small">
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
      </Box>
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
