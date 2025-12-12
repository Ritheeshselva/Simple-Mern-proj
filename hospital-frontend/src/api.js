import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://simple-mern-proj.onrender.com', // your Node/Express backend URL
});