import axios from 'axios';

const marvel = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
});

export default marvel;