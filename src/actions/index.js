// Coloque aqui suas actions

const userEmail = (userE) => ({
  type: 'LOGIN',
  payload: userE,
});

export default userEmail;

export const apiMoedas = (moedas) => ({
  type: 'MOEDAS',
  payload: moedas,
});

export const expenses = (gastos) => ({
  type: 'EXPENSES',
  payload: gastos,
});

export const excluir = (novoArray) => ({
  type: 'EXCLUIR',
  payload: novoArray,
});

export const fetchApiMoedasThunk = () => async (dispatch) => {
  const api = await fetch('https://economia.awesomeapi.com.br/json/all');
  const apiJson = Object.keys(await api.json());
  const apiFiltro = await apiJson.filter((valor) => valor !== 'USDT');
  dispatch(apiMoedas(apiFiltro));
};

export const fetchApiCotaçaoThunk = (dados) => async (dispatch) => {
  const api = await fetch('https://economia.awesomeapi.com.br/json/all');
  const apiJson = await api.json();
  const estadoGlobal = {
    id: dados.id,
    value: dados.value,
    description: dados.description,
    currency: dados.currency,
    method: dados.method,
    tag: dados.tag,
    exchangeRates: await apiJson,
  };
  dispatch(expenses(estadoGlobal));
};
