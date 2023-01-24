import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../componentes/Header';
import { excluir, fetchApiCotaçaoThunk, fetchApiMoedasThunk } from '../actions';
import { Box, Button, Container, FormControl, MenuItem, Paper, Select, Table, TableBody, TableCell, 
TableContainer, TableHead, TableRow, TextField, ThemeProvider } from '@mui/material';
import { Tema } from '../componentes/Tema';


class Wallet extends React.Component {
  state = {
    despesas: 0,
    descricao: '',
    moeda: 'USD',
    pagamento: 'Dinheiro',
    categoria: 'Alimentação',
    valorBrl: 0,
    disabled: true
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    dispatch(fetchApiMoedasThunk());
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleChangeValor =(e) => {
    this.setState({ [e.target.id]: e.target.value });

    if( e.target.value <= 0) {
      this.setState({disabled: true})
    } else {this.setState({disabled: false})}
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
      disabled: true,
      pagamento: 'Dinheiro',
      categoria: 'Alimentação' });
  }

  render() {
    const { currencies, expensesValue, dispatch } = this.props;
    const { despesas, descricao, moeda, pagamento, categoria, valorBrl, disabled } = this.state;
    return (
      <ThemeProvider theme={Tema}>
      <Box
        height="100%"
        sx={{
          backgroundColor: 'whitesmoke',
          backgroundAttachment: 'fixed'
        }}
        // bgcolor="red"
      >
        <Header valorBrl={ valorBrl } />
        <FormControl
          sx={{
            mt:5,
            display: "flex",
            alignItems: "center",
          }}
        > 
        <Box 
        sx={{width: "90%", display: "flex", justifyContent: "center", flexWrap: 'wrap', gap: 3}}
        >
          <TextField
            sx={{width:  {xs: '30%', md: '10%'}}}
            name="moeda"
            label="Valor"
            variant="outlined"
            value={ despesas }
            onChange={ this.handleChangeValor }
            id="despesas"
            type="number"
          />
          <TextField
            sx={{width:  {xs: '30%', md: '10%'}}}
            // sx={{width: "10%"}}
            value={ descricao }
            onChange={ this.handleChange }
            id="descricao"
            label="Descrição"
            data-testid="description-input"
            type="text"
          />
          {/* </Box> */}
          {/* <Box sx={{width: "90%", display: "flex", justifyContent: "center"}}> */}
            <Select
              // sx={{width: "30%"}}
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
          // sx={{width: "30%"}}
            value={ pagamento }
            onChange={ this.handleChangeSelects }
            name="pagamento"
          >
            <MenuItem value="Dinheiro">Dinheiro</MenuItem>
            <MenuItem value="Cartão de crédito">Cartão de crédito</MenuItem>
            <MenuItem value="Cartão de débito">Cartão de débito</MenuItem>
          </Select>
          <Select
          // sx={{width: "30%"}}
            value={ categoria }
            onChange={ this.handleChangeSelects }
            name="categoria"
          >
            <MenuItem value="Alimentação">Alimentação</MenuItem>
            <MenuItem value="Lazer">Lazer</MenuItem>
            <MenuItem value="Trabalho">Trabalho</MenuItem>
            <MenuItem value="Transporte">Transporte</MenuItem>
            <MenuItem value="Saúde">Saúde</MenuItem>
          </Select>
          </Box>
        </FormControl>
        <Box 
          justifyContent="center"
          display="flex"
          mt={3}
        >
          <Button
            disabled={disabled}
            sx={{ fontWeight: "bold" }}
            onClick={ this.handleClick }
            type="button"
            color="secondary"
            variant="contained"
          >
            Adicionar despesa
          </Button>
        </Box>
        <Container sx={{ mb: 5 }}>
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
              <TableCell>Excluir</TableCell>
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
                    sx={{ fontWeight: "bold" }}
                    variant="contained"
                    color="others"
                    type="button"
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
