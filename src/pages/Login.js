import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userEmail from '../actions';
import { Box, Button, Container, Paper, Stack, TextField, ThemeProvider, Typography } from '@mui/material';
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
      <Stack alignItems="center" height="100vh" justifyContent="center"
      // sx={{
      //   mt: -8,
      //   display: "flex",
      //   width: "100vw",
      //   height: "109vh",
      //   alignItems: "center",
      //   justifyContent: "center",
      // }}
      >
        <Paper
        elevation={3}
        sx={{
          padding: "5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "5%"
        }}
        >
        <Typography
          component="h1"
          variant="h5"
          color="primary"
          fontWeight="bold"
          sx={{ textDecoration: "underline", mb: 6 }}
        >
          Sign-In
        </Typography>
        <Box
          className="formulario-inputs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ mb: 2}}
            margin="normal"
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
          <TextField
            // sx={{ mt: 2, mb: 2, width: "90%"}}
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
          color="secondary"
          variant="contained"
          sx={{ mt: 4, fontWeight: "bold" }}
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar
        </Button>
        </Paper>
      </Stack>
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
