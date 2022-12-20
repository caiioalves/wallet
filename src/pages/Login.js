import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userEmail from '../actions';
import { Box, Button, Container, CssBaseline, Paper, TextField, ThemeProvider, Typography } from '@mui/material';
import { Tema } from '../Componentes/Tema';

class Login extends React.Component {
  state = {
    disabled: true,
    email: '',
    senha: '',
  }

  handleChange = (e) => {
    const { email, senha } = this.state;

    this.setState({ [e.target.id]: e.target.value });

    const re = /\S+@\S+\.\S+/;
    const minimoSenha = 5;

    if (re.test(email) && senha.length >= minimoSenha) {
      this.setState({ disabled: false });
    } else { this.setState({ disabled: true }); }
  }

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(userEmail(email));
    history.push('/carteira');
  }

  render() {
    const { disabled, email, senha } = this.state;
    return (
      <ThemeProvider theme={Tema}>
      <Container
      sx={{
        mt: -8,
        display: "flex",
        width: "100vw",
        height: "109vh",
        alignItems: "center",
        justifyContent: "center",
      }}
      >
        <CssBaseline />
        <Paper
        elevation={3}
        sx={{
          backgroundColor: "#FFFFFF",
          minWidth: "40%",
          maxWidth: "90%",
          height: "60%",
          padding: "3%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        >
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 2, color: "#39E088" }}
        >
          Entrar
        </Typography>
        <Box
          className="formulario-inputs"
          sx={{
            mt: 1 ,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "90%", maxWidth: "90%"
          }}
        >
          <TextField
            sx={{ mt: 2, mb: 2, width: "90%" }}
            margin="normal"
            required
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
          <TextField
            sx={{ mt: 2, mb: 2, width: "90%"}}
            type="password"
            id="senha"
            variant="outlined"
            label="Password"
            // fullWidth
            data-testid="password-input"
            value={ senha }
            onChange={ this.handleChange }
          />
        </Box>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: "primary" }}
          type="button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar
        </Button>
        </Paper>
      </Container>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.email,
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
